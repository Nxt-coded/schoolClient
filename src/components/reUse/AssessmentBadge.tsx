import { FC } from "react";

interface AssessmentBadgeProps {
  label: string;
  tone: "green" | "orange";
  active: boolean;
}

const AssessmentBadge: FC<AssessmentBadgeProps> = ({ label, tone, active }) => {
  const colors =
    tone === "orange"
      ? "border-orange-200 bg-orange-50 text-orange-700"
      : "border-green-200 bg-green-50 text-green-700";

  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded border px-2 text-[10px] font-bold uppercase ${colors}`}
      title={`${label} uploaded${active ? " and active for students" : ""}`}
    >
      {active && (
        <span
          className={`h-2 w-2 rounded-full ${
            tone === "orange" ? "bg-orange-500" : "bg-green-500"
          }`}
          aria-hidden="true"
        />
      )}
      {label} Added
    </span>
  );
};

export default AssessmentBadge;
