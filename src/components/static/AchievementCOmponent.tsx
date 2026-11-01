
import React, { useState } from 'react';

const AchievementBadge = ({ emoji, color, count, label }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg"
          style={{ background: color }}
        >
          {emoji}
        </div>
        {count > 1 && (
          <div className="absolute -bottom-1 -right-1 bg-gray-700 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
            ×{count}
          </div>
        )}
      </div>
      {label && <span className="text-xs text-blue-900">{label}</span>}
    </div>
  );
};

const Achievements = () => {
  const [achievements] = useState([
    // {
    //   id: 1,
    //   emoji: "😂",
    //   color: "linear-gradient(135deg, #FFA726 0%, #FB8C00 100%)",
    //   count: 1,
    //   label: "LOL",
    // },
    // {
    //   id: 2,
    //   emoji: "🎯",
    //   color: "linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)",
    //   count: 3,
    //   label: "Bullseye",
    // },
    // {
    //   id: 3,
    //   emoji: "💯",
    //   color: "linear-gradient(135deg, #f86394ff 0%, #ce547cff 100%)",
    //   count: 1,
    //   label: "Perfect",
    // },
    // {
    //   id: 4,
    //   emoji: "🔥",
    //   color: "linear-gradient(135deg, #EF5350 0%, #E53935 100%)",
    //   count: 5,
    //   label: "On Fire",
    // },
    {
      id: 5,
      emoji: "⭐",
      color: "linear-gradient(135deg, #FFEE58 0%, #FDD835 100%)",
      count: 12,
      label: "Report Card",
    },
    {
      id: 6,
      emoji: "🏆",
      color: "linear-gradient(135deg, #66BB6A 0%, #43A047 100%)",
      count: 2,
      label: "CBT Exams",
    },
    {
      id: 7,
      emoji: "💎",
      color: "linear-gradient(135deg, #26C6DA 0%, #00ACC1 100%)",
      count: 1,
      label: "Perfomance",
    },
    {
      id: 8,
      emoji: "🚀",
      color: "linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%)",
      count: 7,
      label: "Trackers",
    },
  ]);

  return (
    <div className="mx-3">
      <div className=" px-auto">
        <div className="bg-white rounded-md border shadow-lg p-2 py-4">
          <h1 className="text-[16px] font-bold text-blue-900 mb-3">Achievements</h1>
          
          <div className="flex flex-wrap gap-6 justify-center ">
            {achievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                emoji={achievement.emoji}
                color={achievement.color}
                count={achievement.count}
                label={achievement.label}
              />
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Achievements;