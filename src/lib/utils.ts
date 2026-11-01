import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAnswerMatched(opt: any, answer: any): boolean {
  if (!opt || !answer) return opt === answer;
  const normalize = (s: any) =>
    String(s)
      .replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags
      .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
      .replace(/\s+/g, " ") // Condense multiple spaces to one
      .trim()
      .toLowerCase();
  return normalize(opt) === normalize(answer);
}
