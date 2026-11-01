import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onVideoEnd?: () => void;
}

const isYouTubeUrl = (url: string): boolean => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  return youtubeRegex.test(url);
};

const getYouTubeVideoId = (url: string): string => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\s]+)/
  );
  return match ? match[1] : "";
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  onVideoEnd,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const isYouTube = isYouTubeUrl(videoUrl);
  const youtubeVideoId = isYouTube ? getYouTubeVideoId(videoUrl) : "";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onVideoEnd?.();
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", handleEnded);
    };
  }, [videoUrl, onVideoEnd]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime += seconds;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  if (isYouTube) {
    return (
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto max-h-[70vh] object-contain"
        onClick={togglePlay}
      />

      {/* Controls Overlay */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
        transition-opacity duration-300
        ${showControls ? "opacity-100" : "opacity-0"}
      `}
      >
        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
            >
              <Play className="w-12 h-12 text-white ml-1" />
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Progress Bar */}
          <div
            className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer group/progress"
            onClick={handleSeek}
          >
            <div
              className="h-2 bg-blue-500 rounded-full relative group-hover/progress:bg-blue-400 transition-colors"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full opacity-0 group-hover/progress:opacity-100 transform translate-x-1/2" />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => skip(-10)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button
                onClick={togglePlay}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>

              <button
                onClick={() => skip(10)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>

              <button
                onClick={toggleMute}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <Maximize className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Title */}
      <div className="absolute top-4 left-4 right-4">
        <h2 className="text-white text-xl font-semibold drop-shadow-lg">
          {title}
        </h2>
      </div>
    </div>
  );
};
