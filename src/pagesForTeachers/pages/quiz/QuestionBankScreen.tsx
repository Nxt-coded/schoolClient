import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LittleHeader from "../../components/layout/LittleHeader";
import {
  createAssessmentFromQuestionBank,
  readQuestionBank,
  rescheduleAssessment,
} from "../../api/teachersAPI";
import { useSujectQuiz } from "../../hooks/useTeacher";
import { useExaminationQuiz, useMidTest } from "../../hooks/useMidTest";

type AssessmentType = "examination" | "midTest";
interface BankQuestion {
  _id: string;
  questionKind: "objective" | "theory";
  question: {
    question?: string;
    options?: string[];
  };
}

const QuestionBankScreen = () => {
  const { subjectID = "" } = useParams();
  const navigate = useNavigate();
  const { subjectQuiz } = useSujectQuiz(subjectID);
  const { data: examinationData, mutate: mutateExamination } =
    useExaminationQuiz(subjectID);
  const { midTest, mutate: mutateMidTest } = useMidTest(subjectID);
  const [assessmentType, setAssessmentType] =
    useState<AssessmentType>("examination");
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [saving, setSaving] = useState(false);
  const [scheduleTarget, setScheduleTarget] = useState("");
  const [opensAt, setOpensAt] = useState("");
  const [closesAt, setClosesAt] = useState("");
  const [duration, setDuration] = useState("0.500");
  const [mark, setMark] = useState("1");

  const currentExam = examinationData?.exam;
  const assessments = useMemo(
    () =>
      [
        currentExam?._id
          ? {
              type: "examination" as const,
              id: currentExam._id,
              label: `${currentExam.subjectTitle} examination (${currentExam.term || "current term"})`,
            }
          : null,
        midTest?._id
          ? {
              type: "midTest" as const,
              id: midTest._id,
              label: `${midTest.subjectTitle} mid-test (${midTest.term || "current term"})`,
            }
          : null,
      ].filter((assessment) => assessment !== null),
    [currentExam, midTest]
  );

  useEffect(() => {
    let active = true;
    setLoadingQuestions(true);
    setSelectedIDs([]);
    readQuestionBank(subjectID, assessmentType)
      .then((response: any) => {
        if (!active) return;
        if (response?.status !== 200 || !Array.isArray(response.data)) {
          toast.error(
            response?.response?.data?.message ||
              response?.message ||
              (response?.response?.status
                ? `Question bank request failed (${response.response.status})`
                : "Unable to load question bank")
          );
          setQuestions([]);
          return;
        }
        setQuestions(response.data);
      })
      .catch((error: unknown) => {
        if (active) {
          toast.error(
            error instanceof Error
              ? `Unable to load question bank: ${error.message}`
              : "Unable to load question bank"
          );
        }
      })
      .finally(() => {
        if (active) setLoadingQuestions(false);
      });
    return () => {
      active = false;
    };
  }, [subjectID, assessmentType]);

  const schedule = async (type: AssessmentType, id: string) => {
    if (!opensAt || !closesAt || new Date(opensAt) >= new Date(closesAt)) {
      toast.error("Choose an opening time before the closing time");
      return;
    }
    setSaving(true);
    try {
      const response: any = await rescheduleAssessment(
        type,
        id,
        new Date(opensAt).toISOString(),
        new Date(closesAt).toISOString()
      );
      if (response?.status !== 200) {
        toast.error(
          response?.response?.data?.message || "Unable to reschedule assessment"
        );
        return;
      }
      toast.success("New attempt window scheduled; previous results are retained");
      await Promise.all([mutateExamination(), mutateMidTest()]);
      setScheduleTarget("");
      setOpensAt("");
      setClosesAt("");
    } finally {
      setSaving(false);
    }
  };

  const createFromBank = async () => {
    const classID =
      subjectQuiz?.subjectClassID ||
      subjectQuiz?.subjectClassIDs ||
      subjectQuiz?.classID;
    if (!classID) {
      toast.error("Unable to identify this subject's class");
      return;
    }
    if (!selectedIDs.length || !opensAt || !closesAt) {
      toast.error("Select questions and set the opening and closing times");
      return;
    }
    if (new Date(opensAt) >= new Date(closesAt)) {
      toast.error("Choose an opening time before the closing time");
      return;
    }

    setSaving(true);
    try {
      const response: any = await createAssessmentFromQuestionBank(
        classID,
        subjectID,
        {
          assessmentType,
          questionBankIDs: selectedIDs,
          instruction: {
            duration,
            mark,
            instruction: "Answer all questions.",
          },
          opensAt: new Date(opensAt).toISOString(),
          closesAt: new Date(closesAt).toISOString(),
        }
      );
      if (response?.status !== 201) {
        toast.error(
          response?.response?.data?.message ||
            "Unable to create assessment from question bank"
        );
        return;
      }
      toast.success("Assessment scheduled from selected bank questions");
      await Promise.all([mutateExamination(), mutateMidTest()]);
      navigate(`/subjects/${subjectID}`);
    } finally {
      setSaving(false);
    }
  };

  const toggleQuestion = (id: string) => {
    setSelectedIDs((selected) =>
      selected.includes(id)
        ? selected.filter((selectedID) => selectedID !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="p-4 text-blue-950">
      <LittleHeader name="Assessment Question Bank" />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">
          {subjectQuiz?.subjectTitle || "Subject"} — questions are private to
          your school.
        </p>
        <Link
          to={`/subjects/${subjectID}`}
          className="rounded bg-blue-950 px-4 py-2 text-sm text-white"
        >
          Back to assessments
        </Link>
      </div>

      <section className="mb-6 rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Schedule a new attempt</h2>
        <p className="mb-3 text-sm text-gray-600">
          Previous scores are kept. Each reschedule opens a new attempt round.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm">
            Assessment type
            <select
              value={assessmentType}
              onChange={(event) =>
                setAssessmentType(event.target.value as AssessmentType)
              }
              className="mt-1 block w-full rounded border p-2"
            >
              <option value="examination">Examination</option>
              <option value="midTest">Mid-test</option>
            </select>
          </label>
          <label className="text-sm">
            Opens
            <input
              type="datetime-local"
              value={opensAt}
              onChange={(event) => setOpensAt(event.target.value)}
              className="mt-1 block w-full rounded border p-2"
            />
          </label>
          <label className="text-sm">
            Closes
            <input
              type="datetime-local"
              value={closesAt}
              onChange={(event) => setClosesAt(event.target.value)}
              className="mt-1 block w-full rounded border p-2"
            />
          </label>
          <label className="text-sm">
            Duration (hours)
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="mt-1 block w-full rounded border p-2"
            />
          </label>
          <label className="text-sm">
            Mark per question
            <input
              type="number"
              min="1"
              value={mark}
              onChange={(event) => setMark(event.target.value)}
              className="mt-1 block w-full rounded border p-2"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={createFromBank}
          disabled={saving || selectedIDs.length === 0}
          className="mt-4 rounded bg-blue-950 px-5 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : `Create from ${selectedIDs.length} selected`}
        </button>
      </section>

      <section className="mb-6 rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Reschedule an existing test</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <select
            value={scheduleTarget}
            onChange={(event) => setScheduleTarget(event.target.value)}
            className="rounded border p-2"
          >
            <option value="">Choose an assessment</option>
            {assessments.map((assessment) => (
              <option
                key={`${assessment.type}-${assessment.id}`}
                value={`${assessment.type}:${assessment.id}`}
              >
                {assessment.label}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            aria-label="New attempt opens"
            value={opensAt}
            onChange={(event) => setOpensAt(event.target.value)}
            className="rounded border p-2"
          />
          <input
            type="datetime-local"
            aria-label="New attempt closes"
            value={closesAt}
            onChange={(event) => setClosesAt(event.target.value)}
            className="rounded border p-2"
          />
        </div>
        <button
          type="button"
          disabled={saving || !scheduleTarget}
          onClick={() => {
            const [type, id] = scheduleTarget.split(":");
            if (isAssessmentTypeValue(type)) void schedule(type, id);
          }}
          className="mt-4 rounded bg-orange-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Scheduling..." : "Reschedule selected test"}
        </button>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Saved questions</h2>
          <span className="text-sm">{questions.length} available</span>
        </div>
        {loadingQuestions ? (
          <p>Loading question bank...</p>
        ) : questions.length === 0 ? (
          <p className="rounded border bg-white p-4 text-sm">
            No saved questions for this assessment type yet. Questions are
            automatically added when staff publish an exam or mid-test.
          </p>
        ) : (
          <div className="space-y-3">
            {questions.map((item) => (
              <label
                key={item._id}
                className="flex cursor-pointer gap-3 rounded-lg border bg-white p-4"
              >
                <input
                  type="checkbox"
                  checked={selectedIDs.includes(item._id)}
                  onChange={() => toggleQuestion(item._id)}
                  className="mt-1"
                />
                <span>
                  <span className="block font-medium">
                    {item.questionKind === "theory" ? "Theory: " : ""}
                    {String(
                      item.question?.question || "Question text unavailable"
                    ).replace(/<[^>]*>/g, " ")}
                  </span>
                  {item.question?.options?.map((option, index) => (
                    <span key={index} className="block text-sm text-gray-600">
                      {option}
                    </span>
                  ))}
                </span>
              </label>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const isAssessmentTypeValue = (
  value: string
): value is AssessmentType => value === "examination" || value === "midTest";

export default QuestionBankScreen;
