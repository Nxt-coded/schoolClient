// swrKeys.ts - central mapping from request URLs to SWR keys (used for targeted revalidation)
type Mapping = {
  pattern: RegExp;
  key: string;
};

const mappings: Mapping[] = [
  { pattern: /\/create-bulk-classroom\//, key: 'api/view-classrooms/' },
  { pattern: /\/create-bulk-student\//, key: 'api/read-student/' },
  { pattern: /\/create-bulk-subject\//, key: 'api/view-school-subject/' },
  // add more mappings as needed
];

export function getSWRKeyForUrl(url: string): string | null {
  try {
    for (const m of mappings) {
      if (m.pattern.test(url)) return m.key;
    }
  } catch (err) {}
  return null;
}

export default { getSWRKeyForUrl };
