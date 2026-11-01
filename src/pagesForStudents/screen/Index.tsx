import { useState } from "react";

import SearchBar from "../components/SearchBar";
import CourseCard from "../components/CourseCard";

import heroImage from "../assets/hero-education.jpg";
import reactCourse from "../assets/course-react.jpg";
import jsCourse from "../assets/course-javascript.jpg";
import cssCourse from "../assets/course-css.jpg";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [
    {
      id: "react-fundamentals",
      title: "React Fundamentals",
      instructor: "Sarah Johnson",
      duration: "6 hours",
      students: 12459,
      rating: 4.8,
      progress: 75,
      image: reactCourse,
      level: "Intermediate" as const,
    },
    {
      id: "javascript-basics",
      title: "JavaScript for Beginners",
      instructor: "Mike Chen",
      duration: "8 hours",
      students: 18672,
      rating: 4.9,
      progress: 0,
      image: jsCourse,
      level: "Beginner" as const,
    },
    {
      id: "css-mastery",
      title: "Advanced CSS & Web Design",
      instructor: "Emma Rodriguez",
      duration: "10 hours",
      students: 9834,
      rating: 4.7,
      progress: 30,
      image: cssCourse,
      level: "Advanced" as const,
    }
  ];

  const stats = [
    { icon: BookOpen, label: "Courses", value: "150+" },
    { icon: Users, label: "Students", value: "50K+" },
    { icon: Award, label: "Certificates", value: "25K+" },
    { icon: TrendingUp, label: "Success Rate", value: "94%" },
  ];

  const handleStartCourse = (courseId: string) => {
    // Navigate to course detail page
    window.location.href = `/course/${courseId}`;
  };

  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
  };

  const handleFilter = () => {
    console.log("Opening filters");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <PlayCircle className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">LearnHub</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Courses</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">My Learning</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Instructors</a>
              <Button size="sm">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6" variant="secondary">
                🚀 New courses every week
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Learn at your own
                <span className="bg-gradient-primary bg-clip-text text-transparent"> pace</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Master new skills with our interactive video courses. Choose your topic, 
                track your progress, and learn from industry experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Browse Courses
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Online Learning Platform"
                  className="w-full rounded-2xl shadow-strong"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-primary rounded-2xl opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Your Perfect Course</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Search from our extensive library of courses and start learning today
            </p>
            <div className="flex justify-center">
              <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Courses</h2>
              <p className="text-muted-foreground">Continue your learning journey or start something new</p>
            </div>
            <Button variant="outline">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onStart={() => handleStartCourse(course.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <PlayCircle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">LearnHub</h3>
            </div>
            <p className="text-muted-foreground">
              Empowering learners worldwide with quality education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
