import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Maximize,
  CheckCircle,
  Clock,
  BookOpen
} from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";
import { useParams } from "react-router-dom";
import {
  useOneReadTeachSubjectsTopic,
  useOneReadTeachSubjectsTopicQuiz,
  useReadTeachSubjectsTopic,
} from "../hooks/subjectHooks";
import _ from "lodash";

interface Topic {
  id: string;
  title: string;
  duration: string;
  video?: string;
  completed: boolean;
  videoUrl?: string;
  description: string;
  keyPoints: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  topics: Topic[];
}

interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TestResult {
  id: string;
  topicId: string;
  topicTitle: string;
  date: string;
  video?: string;
  score: number;
  grade: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: string;
}

const CoursePlayer = () => {
  const { courseID } = useParams();
  const { data } = useReadTeachSubjectsTopic(courseID!);

  const [selectedTopic, setSelectedTopic] = useState<string>(
    data?.topics[0]?._id
  );
  const { data: topicData } = useOneReadTeachSubjectsTopic(selectedTopic);
  const { data: quizData } = useOneReadTeachSubjectsTopicQuiz(selectedTopic);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const course: Course = {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description:
      "Master the essentials of React development from components to state management",
    instructor: "Sarah Johnson",
    totalLessons: 12,
    completedLessons: 7,
    topics: [
      {
        id: "1",
        title: "Introduction to React",
        duration: "15:30",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: true,
        description:
          "Learn the basics of React library, its history, and why it's used for building user interfaces. Understand the virtual DOM and React's component-based architecture.",
        keyPoints: [
          "What is React?",
          "Virtual DOM concept",
          "Component-based architecture",
          "Setting up React environment",
        ],
      },
      {
        id: "2",
        title: "Components and JSX",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        duration: "22:45",
        completed: true,
        description:
          "Dive deep into React components and JSX syntax. Learn how to create functional and class components, and understand JSX rules and best practices.",
        keyPoints: [
          "Functional vs Class Components",
          "JSX syntax and rules",
          "Component composition",
          "Props basics",
        ],
      },
      {
        id: "3",
        title: "Props and State",
        duration: "18:20",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: true,
        description:
          "Master the fundamental concepts of props for passing data between components and state for managing component data that changes over time.",
        keyPoints: [
          "Understanding Props",
          "State management",
          "Props vs State",
          "Data flow in React",
        ],
      },
      {
        id: "4",
        title: "Event Handling",
        duration: "16:10",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: true,
        description:
          "Learn how to handle user interactions in React applications. Understand event objects, event binding, and best practices for event handling.",
        keyPoints: [
          "Event handling in React",
          "Event binding",
          "Synthetic events",
          "Event delegation",
        ],
      },
      {
        id: "5",
        title: "Conditional Rendering",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        duration: "12:30",
        completed: true,
        description:
          "Explore different techniques for conditionally rendering components and elements based on application state and user interactions.",
        keyPoints: [
          "if/else in JSX",
          "Ternary operators",
          "Logical && operator",
          "Switch statements in render",
        ],
      },
      {
        id: "6",
        title: "Lists and Keys",
        duration: "14:45",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: true,
        description:
          "Understand how to render lists of data efficiently in React and the importance of keys for optimal performance and avoiding common pitfalls.",
        keyPoints: [
          "Rendering lists with map()",
          "Importance of keys",
          "Key selection strategies",
          "List performance optimization",
        ],
      },
      {
        id: "7",
        title: "Forms in React",
        duration: "20:15",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: true,
        description:
          "Master form handling in React including controlled components, form validation, and managing form state effectively.",
        keyPoints: [
          "Controlled vs Uncontrolled components",
          "Form validation",
          "Handling multiple inputs",
          "Form submission",
        ],
      },
      {
        id: "8",
        title: "React Hooks - useState",
        duration: "25:00",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: false,
        description:
          "Deep dive into the useState hook, React's primary tool for managing state in functional components. Learn patterns and best practices.",
        keyPoints: [
          "useState hook basics",
          "State updates",
          "Functional updates",
          "Multiple state variables",
        ],
      },
      {
        id: "9",
        title: "React Hooks - useEffect",
        duration: "28:30",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: false,
        description:
          "Master the useEffect hook for handling side effects, API calls, subscriptions, and cleanup in functional components.",
        keyPoints: [
          "useEffect basics",
          "Dependency arrays",
          "Cleanup functions",
          "Effect patterns",
        ],
      },
      {
        id: "10",
        title: "Custom Hooks",
        duration: "19:45",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: false,
        description:
          "Learn to create reusable custom hooks to extract component logic and share stateful logic between components.",
        keyPoints: [
          "Creating custom hooks",
          "Hook composition",
          "Reusable logic patterns",
          "Testing custom hooks",
        ],
      },
      {
        id: "11",
        title: "Context API",
        duration: "24:20",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: false,
        description:
          "Understand React's Context API for prop drilling solutions and global state management in React applications.",
        keyPoints: [
          "Context creation",
          "Provider and Consumer",
          "useContext hook",
          "Context best practices",
        ],
      },
      {
        id: "12",
        title: "Performance Optimization",
        duration: "26:15",
        video:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: false,
        description:
          "Learn techniques to optimize React application performance including memoization, code splitting, and profiling tools.",
        keyPoints: [
          "React.memo",
          "useMemo and useCallback",
          "Code splitting",
          "Performance profiling",
        ],
      },
    ],
  };

  const currentTopic = data?.topics?.find(
    (topic: { _id: string }) => topic._id === selectedTopic
  );
  const progressPercentage =
    (course.completedLessons / course.totalLessons) * 100;

  // MCQ questions for each topic
  // const getMCQQuestions = (topicId: string): MCQQuestion[] => {
  //   const questionsByTopic: Record<string, MCQQuestion[]> = {
  //     "1": [
  //       {
  //         id: "1-1",
  //         question: "What is React primarily used for?",
  //         options: [
  //           "Backend development",
  //           "Building user interfaces",
  //           "Database management",
  //           "Server configuration",
  //         ],
  //         correctAnswer: 1,
  //         explanation:
  //           "React is a JavaScript library primarily used for building user interfaces, especially for web applications.",
  //       },
  //       {
  //         id: "1-2",
  //         question: "What is the Virtual DOM in React?",
  //         options: [
  //           "A real DOM element",
  //           "A JavaScript representation of the real DOM",
  //           "A database",
  //           "A server component",
  //         ],
  //         correctAnswer: 1,
  //         explanation:
  //           "The Virtual DOM is a JavaScript representation of the real DOM that React uses to optimize rendering performance.",
  //       },
  //     ],
  //     "2": [
  //       {
  //         id: "2-1",
  //         question: "What does JSX stand for?",
  //         options: [
  //           "JavaScript XML",
  //           "JavaScript Extension",
  //           "Java Syntax Extension",
  //           "JavaScript Execute",
  //         ],
  //         correctAnswer: 0,
  //         explanation:
  //           "JSX stands for JavaScript XML, allowing you to write HTML-like syntax in JavaScript.",
  //       },
  //       {
  //         id: "2-2",
  //         question: "Which is correct JSX syntax?",
  //         options: [
  //           "<div class='container'>",
  //           "<div className='container'>",
  //           "<div Class='container'>",
  //           "<div classname='container'>",
  //         ],
  //         correctAnswer: 1,
  //         explanation:
  //           "In JSX, you use 'className' instead of 'class' because 'class' is a reserved keyword in JavaScript.",
  //       },
  //     ],
  //     "3": [
  //       {
  //         id: "3-1",
  //         question: "How do you pass data to a child component?",
  //         options: [
  //           "Through state",
  //           "Through props",
  //           "Through methods",
  //           "Through refs",
  //         ],
  //         correctAnswer: 1,
  //         explanation:
  //           "Props (properties) are used to pass data from parent components to child components in React.",
  //       },
  //       {
  //         id: "3-2",
  //         question: "What is state in React?",
  //         options: [
  //           "Static data",
  //           "Data that can change over time",
  //           "External API data",
  //           "CSS styling",
  //         ],
  //         correctAnswer: 1,
  //         explanation:
  //           "State is data that can change over time and causes the component to re-render when updated.",
  //       },
  //     ],
  //   };

  //   return (
  //     questionsByTopic[topicId] || [
  //       {
  //         id: `${topicId}-1`,
  //         question: `Sample question for ${currentTopic?.title}`,
  //         options: ["Option A", "Option B", "Option C", "Option D"],
  //         correctAnswer: 0,
  //         explanation: "This is a sample question for this topic.",
  //       },
  //     ]
  //   );
  // };

  const [getMCQQuestions, setGetMCQQuestions] = useState(quizData);
  const [timeRemaining, setTimeRemaining] = useState(4 * 60); // 4 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  // Update MCQ questions when topic changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTestStarted(false);
    setTimerActive(false);
    setTimeRemaining(4 * 60);
  }, [selectedTopic]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeRemaining]);

  // Format time remaining
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Get topic-specific test results
  const getTopicTestResults = (): TestResult[] => {
    const allResults = JSON.parse(
      localStorage.getItem("courseTestResults") || "[]"
    ) as TestResult[];
    return allResults.filter((result) => result.topicId === selectedTopic);
  };

  const startTest = () => {
    // Randomly select 20 questions
    const randomQuestions = _.shuffle(quizData)?.slice(0, 20);
    setGetMCQQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTestStarted(true);
    setTimerActive(true);
    setTimeRemaining(4 * 60);
  };

  const finishTest = () => {
    setTimerActive(false);
    const questions = getMCQQuestions;
    const correctAnswers = questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const wrongAnswers = questions.length - correctAnswers;
    const score = Math.round((correctAnswers / questions.length) * 100);

    let grade = "F";
    if (score >= 90) grade = "A";
    else if (score >= 80) grade = "B";
    else if (score >= 70) grade = "C";
    else if (score >= 60) grade = "D";

    const timeSpent = `${Math.floor((4 * 60 - timeRemaining) / 60)}:${(
      (4 * 60 - timeRemaining) %
      60
    )
      .toString()
      .padStart(2, "0")}`;

    const result: TestResult = {
      id: Date.now().toString(),
      topicId: selectedTopic,
      topicTitle: currentTopic?.title || "",
      date: new Date().toISOString(),
      score,
      grade,
      totalQuestions: questions.length,
      correctAnswers,
      wrongAnswers,
      timeSpent: timeSpent, // Actual time spent on the test
    };

    const existingResults = JSON.parse(
      localStorage.getItem("courseTestResults") || "[]"
    ) as TestResult[];
    existingResults.push(result);
    localStorage.setItem("courseTestResults", JSON.stringify(existingResults));

    setShowResults(true);
  };

  // const handleVideoEnd = () => {
  //   if (!currentTopic.completed) {
  //     onTopicComplete(currentTopicId);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx- p-6 max-w-7xl">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <Badge variant="secondary">Subject Details</Badge>
          </div>
          <h1 className="text-3xl font-medium mt-8 mb-2 uppercase text-left">
            {topicData?.title}
          </h1>
          <p className="text-muted-foreground mb-4 text-[18px]">
            {topicData?.description}
          </p>
          <div className="flex items-center text-[20px] text-muted-foreground">
            <span className="mr-2 font-semibold">
              {course.completedLessons}/{course.totalLessons}
            </span>
            <span className="capitalize">lessons completed</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm text-muted-foreground  ">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-medium">
              <div className="mb-8">
                <VideoPlayer
                  videoUrl={currentTopic?.video}
                  title={currentTopic?.title || ""}
                />
              </div>

              {/* Current Topic Info */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {currentTopic?.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{currentTopic?.duration}</span>
                      </div>
                      {currentTopic?.completed && (
                        <div className="flex items-center gap-1 text-success">
                          <CheckCircle className="h-4 w-4" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={currentTopic?.completed ? "secondary" : "default"}
                    className="min-w-[120px]"
                  >
                    {currentTopic?.completed ? "Review" : "Mark Complete"}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tabs for Course Info, MCQ Test, and Performance */}
            <Card className="mt-6 shadow-medium">
              <div className="p-6">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Topic Info</TabsTrigger>
                    <TabsTrigger value="test">MCQ Test</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          About This Topic
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {currentTopic?.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">
                          Key Learning Points
                        </h4>
                        <ul className="space-y-2">
                          {currentTopic?.keyPoints?.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {currentTopic?.duration}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Duration
                          </div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {currentTopic?.completed ? "✓" : "○"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {currentTopic?.completed
                              ? "Completed"
                              : "In Progress"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="test" className="mt-6">
                    {!testStarted ? (
                      <div className="text-center py-8">
                        <h3 className="text-lg font-semibold mb-4">
                          Test Your Knowledge: {currentTopic?.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Take a quick quiz to test your understanding of this
                          topic
                        </p>
                        <Button onClick={startTest} size="lg">
                          Test your learnings ({20} Questions)
                        </Button>
                      </div>
                    ) : !showResults ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            Question {currentQuestionIndex + 1} of {20}
                          </h3>
                          <div className="flex items-center gap-4">
                            <div
                              className={`font-bold ${
                                timeRemaining <= 60
                                  ? "text-red-500 animate-pulse"
                                  : ""
                              }`}
                            >
                              Time Remaining:{" "}
                              {formatTimeRemaining(timeRemaining)}
                            </div>
                            <Badge variant="outline">
                              {currentTopic?.title}
                            </Badge>
                          </div>
                        </div>

                        <Progress
                          value={
                            ((currentQuestionIndex + 1) /
                              getMCQQuestions.length) *
                            100
                          }
                          className="h-2"
                        />

                        <div className="space-y-4">
                          <h4 className="text-base font-medium">
                            {getMCQQuestions[currentQuestionIndex]?.question}
                          </h4>

                          <div className="space-y-2">
                            {getMCQQuestions[currentQuestionIndex]?.options.map(
                              (option, index) => (
                                <button
                                  key={index}
                                  onClick={() =>
                                    setSelectedAnswers((prev) => ({
                                      ...prev,
                                      [getMCQQuestions[currentQuestionIndex]
                                        .id]: index,
                                    }))
                                  }
                                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                    selectedAnswers[
                                      getMCQQuestions[currentQuestionIndex].id
                                    ] === index
                                      ? "border-primary bg-primary-soft"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <span className="font-medium mr-3">
                                    {String.fromCharCode(65 + index)}.
                                  </span>
                                  {option}
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button
                            variant="outline"
                            onClick={() =>
                              setCurrentQuestionIndex((prev) =>
                                Math.max(0, prev - 1)
                              )
                            }
                            disabled={currentQuestionIndex === 0}
                          >
                            Previous
                          </Button>

                          {currentQuestionIndex ===
                          getMCQQuestions.length - 1 ? (
                            <Button onClick={finishTest}>Finish Test</Button>
                          ) : (
                            <Button
                              onClick={() =>
                                setCurrentQuestionIndex((prev) => prev + 1)
                              }
                              disabled={
                                selectedAnswers[
                                  getMCQQuestions[currentQuestionIndex].id
                                ] === undefined
                              }
                            >
                              Next
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center flex flex-col py-8 space-y-6">
                        <h3 className="text-2xl font-bold">Test Completed!</h3>
                        <div className="inline-flex items-center gap-4 p-6 bg-muted rounded-lg">
                          <div className="text-center flex flex-col ">
                            <div className="text-3xl font-bold text-primary">
                              {Math.round(
                                (getMCQQuestions.filter(
                                  (q) =>
                                    selectedAnswers[q.id] === q.correctAnswer
                                ).length /
                                  getMCQQuestions.length) *
                                  100
                              )}
                              %
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Score
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            setTestStarted(false);
                            setShowResults(false);
                            setCurrentQuestionIndex(0);
                            setSelectedAnswers({});
                          }}
                        >
                          Take Test Again
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="performance" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Performance Analytics: {currentTopic?.title}
                        </h3>

                        {getTopicTestResults().length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No test results available for this topic yet.</p>
                            <p className="text-sm mt-2">
                              Take the MCQ test to see your performance
                              analytics.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {/* Performance Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center p-4 bg-muted rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                  {getTopicTestResults().length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Tests Taken
                                </div>
                              </div>
                              <div className="text-center p-4 bg-muted rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                  {Math.round(
                                    getTopicTestResults().reduce(
                                      (acc, result) => acc + result.score,
                                      0
                                    ) / getTopicTestResults().length
                                  )}
                                  %
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Avg Score
                                </div>
                              </div>
                              <div className="text-center p-4 bg-muted rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                  {Math.max(
                                    ...getTopicTestResults().map((r) => r.score)
                                  )}
                                  %
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Best Score
                                </div>
                              </div>
                              <div className="text-center p-4 bg-muted rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                  {getTopicTestResults()[
                                    getTopicTestResults().length - 1
                                  ]?.grade || "N/A"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Latest Grade
                                </div>
                              </div>
                            </div>

                            {/* Recent Test Results */}
                            <div>
                              <h4 className="font-medium mb-3">
                                Recent Test Results
                              </h4>
                              <div className="space-y-3">
                                {getTopicTestResults()
                                  .slice(-5)
                                  .reverse()
                                  .map((result) => (
                                    <div
                                      key={result.id}
                                      className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                      <div className="flex items-center gap-4">
                                        <div
                                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                                            result.score >= 80
                                              ? "bg-green-500"
                                              : result.score >= 60
                                              ? "bg-yellow-500"
                                              : "bg-red-500"
                                          }`}
                                        >
                                          {result.grade}
                                        </div>
                                        <div>
                                          <div className="font-medium">
                                            {result.score}% Score
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            {new Date(
                                              result.date
                                            ).toLocaleDateString()}{" "}
                                            at{" "}
                                            {new Date(
                                              result.date
                                            ).toLocaleTimeString()}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-right text-sm text-muted-foreground">
                                        <div>
                                          {result.correctAnswers}/
                                          {result.totalQuestions} correct
                                        </div>
                                        <div>{result.wrongAnswers} wrong</div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>

                            {/* Performance Insights */}
                            <div>
                              <h4 className="font-medium mb-3">
                                Performance Insights
                              </h4>
                              <div className="space-y-3 p-4 bg-muted rounded-lg">
                                {(() => {
                                  const results = getTopicTestResults();
                                  const latestScore =
                                    results[results.length - 1]?.score || 0;
                                  const avgScore = Math.round(
                                    results.reduce(
                                      (acc, r) => acc + r.score,
                                      0
                                    ) / results.length
                                  );
                                  const isImproving =
                                    results.length > 1 &&
                                    latestScore >
                                      results[results.length - 2].score;

                                  return (
                                    <>
                                      <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                                        <div>
                                          <span className="font-medium">
                                            Current Performance:{" "}
                                          </span>
                                          <span
                                            className={
                                              latestScore >= 80
                                                ? "text-green-600"
                                                : latestScore >= 60
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                            }
                                          >
                                            {latestScore >= 80
                                              ? "Excellent"
                                              : latestScore >= 60
                                              ? "Good"
                                              : "Needs Improvement"}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                                        <div>
                                          <span className="font-medium">
                                            Trend:{" "}
                                          </span>
                                          <span
                                            className={
                                              isImproving
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                            }
                                          >
                                            {isImproving
                                              ? "Improving"
                                              : "Consistent performance"}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                                        <div>
                                          <span className="font-medium">
                                            Recommendation:{" "}
                                          </span>
                                          {latestScore < 70
                                            ? "Review the topic material and retake the test to improve understanding."
                                            : latestScore < 85
                                            ? "Good progress! Practice more to achieve mastery."
                                            : "Excellent work! You have mastered this topic."}
                                        </div>
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>

          {/* Topics Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-medium">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Subject Topics</h3>
                <div className="space-y-2">
                  {data?.topics.map((topic: any, index: any) => (
                    <button
                      key={topic._id}
                      onClick={() => setSelectedTopic(topic._id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:shadow-soft ${
                        selectedTopic === topic._id
                          ? "border-primary bg-primary-soft"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-muted-foreground">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {topic.completed && (
                              <CheckCircle className="h-4 w-4 text-success" />
                            )}
                          </div>
                          <h4 className="font-medium text-sm leading-tight mb-1">
                            {topic.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {topic.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;