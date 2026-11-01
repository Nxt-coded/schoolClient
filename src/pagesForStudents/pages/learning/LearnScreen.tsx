import React from "react"
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import SearchBar from "../../components/SearchBar";
import CourseCard from "../../components/CourseCard";
import heroImage from "../../assets/hero-education.jpg";
import reactCourse from "../../assets/course-react.jpg";
import jsCourse from "../../assets/course-javascript.jpg";
import cssCourse from "../../assets/course-css.jpg";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { useReadTeachSubjects } from "@/pagesForStudents/hooks/subjectHooks";

const LearnScreen = () => {
  const handleStartCourse = (courseId: string) => {
    // Navigate to course detail page
    window.location.href = `/learning/${courseId}`;
  };

  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
  };

  const handleFilter = () => {
    console.log("Opening filters");
  };

  const { data: courses } = useReadTeachSubjects();
  // console.log(data);
  // const courses = [
  //   {
  //     id: "react-fundamentals",
  //     title: "React Fundamentals",
  //     instructor: "Sarah Johnson",
  //     duration: "6 hours",
  //     students: 12459,
  //     rating: 4.8,
  //     progress: 75,
  //     image: reactCourse,
  //     level: "Intermediate" as const,
  //   },
  //   {
  //     id: "javascript-basics",
  //     title: "JavaScript for Beginners",
  //     instructor: "Mike Chen",
  //     duration: "8 hours",
  //     students: 18672,
  //     rating: 4.9,
  //     progress: 0,
  //     image: jsCourse,
  //     level: "Beginner" as const,
  //   },
  //   {
  //     id: "css-mastery",
  //     title: "Advanced CSS & Web Design",
  //     instructor: "Emma Rodriguez",
  //     duration: "10 hours",
  //     students: 9834,
  //     rating: 4.7,
  //     progress: 30,
  //     image: cssCourse,
  //     level: "Advanced" as const,
  //   },
  // ];

  return (
    <main>
      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Find the Perfect Subject to Start Learning Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Improve the areas your lack strengths and get better at what you
              do
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
              <p className="text-muted-foreground">
                Continue your learning journey or start something new
              </p>
            </div>
            <Button variant="outline">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses?.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onStart={() => handleStartCourse(course._id)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default LearnScreen;