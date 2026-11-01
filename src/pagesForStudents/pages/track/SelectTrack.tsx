import { useState } from "react";

const SelectTrack = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const tracks = [
    "AI/ML Engineering",
    "Backend Engineering",
    "Frontend Engineering",
    "Mobile Development Engineering",
    "Fullstack Engineering",
  ];

  return (
    <div className="w-full bg-white rounded-md border p-4 mt-4 mb-4">
      <h2 className="font-bold text-[16px] mb-3 text-blue-950">
        Select Your Engineering Track
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tracks.map((track) => (
          <div
            key={track}
            onClick={() => setSelectedTrack(track)}
            className={`p-3 rounded-md cursor-pointer border transition-all duration-300 ${
              selectedTrack === track
                ? "bg-blue-950 text-white border-blue-950"
                : "bg-blue-50 text-blue-950 border-blue-100 hover:bg-blue-100"
            }`}
          >
            <div className="font-medium text-[13px]">{track}</div>
          </div>
        ))}
      </div>
      {selectedTrack && (
        <div className="mt-3 text-[12px] text-green-600 font-medium">
          You have selected: {selectedTrack}
        </div>
      )}
    </div>
  );
};

export default SelectTrack;
