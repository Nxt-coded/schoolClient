import { FC } from "react";
import { Link } from "react-router-dom";
import {
  useExamination,
  useMidTest,
  useSchoolAnnouncement,
  useSujectInfo,
  useTeacherInfo,
} from "../../hooks/useTeacher";
import LittleHeader from "../../components/layout/LittleHeader";
import {
  useClassSubjects,
  useSchoolData,
  useSchoolSessionData,
  useViewSchoolClassRM,
} from "../../../pages/hook/useSchoolAuth";
import pix from "../../../assets/pix.jpg";
import { matchesCurrentAssessmentPeriod } from "../../../lib/assessmentPeriod";

document.title = "View teacher subjects";

interface ClassAssignment {
  _id?: string;
  classID?: string;
  className?: string;
}

interface SubjectReadinessProps {
  subjectID: string;
  term?: string;
  session?: string;
}

const Status: FC<{ label: string; ready: boolean | undefined }> = ({
  label,
  ready,
}) => (
  <div className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2">
    <span className="text-sm text-slate-600">{label}</span>
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        ready === undefined
          ? "bg-slate-100 text-slate-500"
          : ready
          ? "bg-green-50 text-green-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      {ready === undefined ? "Loading" : ready ? "Ready" : "Not ready"}
    </span>
  </div>
);

const SubjectReadiness: FC<SubjectReadinessProps> = ({
  subjectID,
  term,
  session,
}) => {
  const { subjectInfo } = useSujectInfo(subjectID);
  const { examination } = useExamination(subjectID);
  const { midTest } = useMidTest(subjectID);
  const assessmentsLoaded = Boolean(subjectInfo);

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <Status
        label="Quiz"
        ready={
          assessmentsLoaded ? Boolean(subjectInfo?.quiz?.length) : undefined
        }
      />
      <Status
        label="Mid-test"
        ready={
          assessmentsLoaded
            ? matchesCurrentAssessmentPeriod(
                subjectInfo?.midTest,
                term,
                session
              ) ||
              matchesCurrentAssessmentPeriod(midTest, term, session)
            : undefined
        }
      />
      <Status
        label="Examination"
        ready={
          assessmentsLoaded
            ? matchesCurrentAssessmentPeriod(
                subjectInfo?.examination,
                term,
                session
              ) ||
              matchesCurrentAssessmentPeriod(examination, term, session)
            : undefined
        }
      />
    </div>
  );
};

interface ClassSubject {
  _id?: string;
  subjectTitle?: string;
  subjectTeacherName?: string;
  teacherID?: string;
}

interface ClassSubjectCardProps {
  subject: ClassSubject;
  className?: string;
  term?: string;
  session?: string;
}

const ClassSubjectCard: FC<ClassSubjectCardProps> = ({
  subject,
  className,
  term,
  session,
}) => {
  const subjectID = subject._id;

  if (!subjectID) return null;

  return (
    <article className="min-w-0 rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="break-words text-lg font-semibold text-blue-950">
            {subject.subjectTitle || "Assigned subject"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Class: {className || "Assigned class"}
          </p>
        </div>
        <Link
          to={`/subjects/${subjectID}`}
          className="shrink-0 rounded-lg bg-blue-950 px-4 py-2 text-sm font-medium capitalize text-white transition-colors hover:bg-blue-900"
        >
          View Subject
        </Link>
      </div>
      {subject.subjectTeacherName && (
        <p className="mb-3 text-sm text-slate-600">
          Teacher: {subject.subjectTeacherName}
        </p>
      )}
      <SubjectReadiness subjectID={subjectID} term={term} session={session} />
    </article>
  );
};

interface AssignedClassSubjectsProps {
  classroom: ClassAssignment;
  teacherID: string;
  term?: string;
  session?: string;
}

const AssignedClassSubjects: FC<AssignedClassSubjectsProps> = ({
  classroom,
  teacherID,
  term,
  session,
}) => {
  const classID = classroom._id || classroom.classID || "";
  const { readSubject } = useClassSubjects(classID);

  if (!readSubject) {
    return (
      <p className="rounded-xl border bg-white p-4 text-sm text-slate-500">
        Loading {classroom.className || "classroom"} subjects…
      </p>
    );
  }

  const teacherSubjects = readSubject.filter(
    (subject: ClassSubject) =>
      subject.teacherID && String(subject.teacherID) === teacherID
  );

  return (
    <>
      {teacherSubjects.map((subject: ClassSubject) => (
        <ClassSubjectCard
          key={subject._id}
          subject={subject}
          className={classroom.className}
          term={term}
          session={session}
        />
      ))}
    </>
  );
};

const TeacherSubject: FC = () => {
  const { teacherInfo } = useTeacherInfo();
  const { schoolInfo } = useSchoolSessionData(teacherInfo?.schoolIDs);
  const { data: schoolData } = useSchoolData();
  const { schoolAnnouncement } = useSchoolAnnouncement(teacherInfo?.schoolIDs);
  const { viewClasses } = useViewSchoolClassRM(teacherInfo?.schoolIDs || "");
  const currentTerm =
    schoolData?.presentTerm ||
    schoolAnnouncement?.presentTerm ||
    schoolInfo?.presentTerm;
  const currentSession =
    schoolData?.presentSession ||
    schoolAnnouncement?.presentSession ||
    schoolInfo?.presentSession;
  const schoolClassrooms: ClassAssignment[] = Array.isArray(
    viewClasses?.classRooms
  )
    ? viewClasses.classRooms
    : [];
  const teacherID = String(teacherInfo?._id || "");
  const teacherSubjectsLoaded = Boolean(teacherInfo && viewClasses);

  return (
    <div className="w-full min-w-0">
      <LittleHeader name="Teacher Subjects" />

      <section className="mt-5 flex min-w-0 items-center gap-3">
        <img
          src={teacherInfo?.avatar || pix}
          alt={`${teacherInfo?.staffName || "Teacher"} avatar`}
          className="h-12 w-12 rounded-full border object-cover"
        />
        <div className="min-w-0">
          <h1 className="font-bold text-blue-950">Assigned subjects</h1>
          <p className="text-sm text-slate-500">
            Subjects and assessment readiness for the current school period
          </p>
        </div>
      </section>

      {currentTerm || currentSession ? (
        <p className="mt-4 text-sm text-slate-600">
          Current period:{" "}
          <span className="font-medium text-blue-950">
            {[currentSession, currentTerm]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </p>
      ) : null}

      <section className="mt-5 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {teacherSubjectsLoaded &&
          schoolClassrooms
            .filter((classroom) => classroom._id || classroom.classID)
            .map((classroom) => (
              <AssignedClassSubjects
                key={classroom._id || classroom.classID}
                classroom={classroom}
                teacherID={teacherID}
                term={currentTerm}
                session={currentSession}
              />
            ))}
      </section>

      {teacherSubjectsLoaded &&
        schoolClassrooms.length > 0 &&
        schoolClassrooms.every((classroom) => !(classroom._id || classroom.classID)) && (
          <div className="mt-5 rounded-xl border border-dashed p-8 text-center text-slate-600">
            No classroom subjects are available yet.
          </div>
        )}
      {teacherSubjectsLoaded && schoolClassrooms.length === 0 && (
        <div className="mt-5 rounded-xl border border-dashed p-8 text-center text-slate-600">
          No classroom subjects are assigned to your account yet.
        </div>
      )}
    </div>
  );
};

export default TeacherSubject;
