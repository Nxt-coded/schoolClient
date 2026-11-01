import { Card } from "../../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Clock, Users, Star, Play } from "lucide-react";
import moment from "moment";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  createdAt: string;
  students: number;
  rating: number;
  progress?: number;
  totalLessons?: number;
  subjectImage: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  onStart: () => void;
}

const CourseCard = ({
  title,
  instructor,
  duration,
  createdAt,
  totalLessons,
  students,
  rating,
  progress = 0,
  subjectImage,
  level,
  onStart,
}: any) => {
  return (
    <Card
      className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group cursor-pointer"
      onClick={onStart}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={subjectImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <Badge
            className={`bg-white/60 text-black font-medium backdrop-blur-xl}`}
          >
            {level}
          </Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Play className="h-6 w-6 text-white ml-1" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4">by: NEXT Teach</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{moment(createdAt).fromNow()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{totalLessons} Topics</span>
          </div>
          {/* <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-warning" />
            <span>{rating}</span>
          </div> */}
        </div>

        {progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button
          onClick={onStart}
          className="w-full"
          variant={progress > 0 ? "secondary" : "default"}
        >
          {progress > 0 ? "Continue Learning" : "Start Course"}
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;