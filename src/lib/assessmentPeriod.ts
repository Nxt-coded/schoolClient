const normalize = (value: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const matchesCurrentAssessmentPeriod = (
  assessment: unknown,
  currentTerm?: string,
  currentSession?: string
): boolean => {
  const term = normalize(currentTerm);
  const session = normalize(currentSession);
  if (!term || !session) return false;

  const pending: unknown[] = Array.isArray(assessment)
    ? [...assessment]
    : [assessment];
  const visited = new Set<object>();

  while (pending.length > 0) {
    const candidate = pending.pop();
    if (Array.isArray(candidate)) {
      pending.push(...candidate);
      continue;
    }
    if (!isRecord(candidate) || visited.has(candidate)) continue;
    visited.add(candidate);

    if (
      normalize(candidate.term) === term &&
      normalize(candidate.session) === session
    ) {
      return true;
    }

    for (const key of ["exam", "midTest", "assessment", "data"]) {
      const nested = candidate[key];
      if (nested && typeof nested === "object") pending.push(nested);
    }
  }

  return false;
};
