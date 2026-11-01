import { useEffect } from "react";
import axios from "axios";
import { URL } from "../pagesForStudents/api/studentAPI";

const QUEUE_KEY = "clockActionQueue";

interface ClockAction {
  type: "clock-in" | "clock-out";
  schoolID: string;
  studentID: string;
  timestamp: number;
}

const saveToQueue = (action: ClockAction) => {
  const existing: ClockAction[] = JSON.parse(
    localStorage.getItem(QUEUE_KEY) || "[]"
  );
  existing.push(action);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(existing));
};

const flushQueue = async () => {
  const queue: ClockAction[] = JSON.parse(
    localStorage.getItem(QUEUE_KEY) || "[]"
  );
  if (!queue.length) return;

  const remaining: ClockAction[] = [];

  for (const action of queue) {
    try {
      const route =
        action.type === "clock-in"
          ? `/student-clock-in/${action.schoolID}/${action.studentID}`
          : `/student-clock-out/${action.schoolID}/${action.studentID}`;

      await axios.patch(`${URL}${route}`);
    } catch {
      remaining.push(action);
    }
  }

  localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
};

/**
 * Queues a clock action and syncs when online.
 * Returns "queued" when offline, "sent" when online.
 */
export const clockWithOfflineFallback = async (
  type: "clock-in" | "clock-out",
  schoolID: string,
  studentID: string
): Promise<"sent" | "queued"> => {
  if (navigator.onLine) {
    const route =
      type === "clock-in"
        ? `/student-clock-in/${schoolID}/${studentID}`
        : `/student-clock-out/${schoolID}/${studentID}`;
    await axios.patch(`${URL}${route}`);
    return "sent";
  } else {
    saveToQueue({ type, schoolID, studentID, timestamp: Date.now() });
    return "queued";
  }
};

/**
 * Mount this hook at the app root (or any always-mounted component).
 * It automatically replays queued clock actions when internet is restored.
 */
const useOfflineClock = () => {
  useEffect(() => {
    const handleOnline = () => {
      flushQueue();
    };

    window.addEventListener("online", handleOnline);

    // Also attempt flush on mount (handles page reload while online)
    if (navigator.onLine) flushQueue();

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);
};

export default useOfflineClock;
