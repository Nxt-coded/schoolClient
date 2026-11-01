export interface PromotionResult {
  status: "PROMOTED" | "REPEAT";
  reason: string;
  isRepeat: boolean;
}

/**
 * Calculates promotion status for a student based on school rules.
 * For Cardoso Catholic Secondary School (enrollmentID: 7b92fdb8, email: richardmd44@yahoo.com):
 * 1. Any child that fails Maths AND English will repeat.
 * 2. Any child below 45% should also repeat.
 * 3. Otherwise, child is promoted.
 */
export const checkPromotionStatus = (
  school: any,
  results: any[],
  percentage: number
): PromotionResult => {
  const schoolEnrollmentID = school?.enrollmentID || school?.enrollmentCode || "";
  const schoolEmail = (school?.email || "").toLowerCase();
  const schoolName = (school?.schoolName || school?.name || "").toLowerCase();

  const isCardoso =
    schoolEnrollmentID === "7b92fdb8" ||
    schoolEmail === "richardmd44@yahoo.com" ||
    schoolName.includes("cardoso");

  if (!isCardoso) {
    // Standard rule for non-Cardoso schools
    const isPass = percentage >= 40;
    return {
      status: isPass ? "PROMOTED" : "REPEAT",
      reason: isPass ? "PROMOTED TO NEXT CLASS" : "REPEAT CLASS",
      isRepeat: !isPass,
    };
  }

  // Cardoso Catholic Secondary School specific rules
  const isSubjectFail = (sub: any) => {
    if (!sub) return false;
    const mark =
      sub?.mark ??
      ((sub?.test1 ?? 0) +
        (sub?.test2 ?? 0) +
        (sub?.test3 ?? 0) +
        (sub?.test4 ?? 0) +
        (sub?.exam ?? 0));
    const grade = (sub?.grade || "").toString().toUpperCase();
    return mark < 40 || grade === "F9" || grade === "F";
  };

  // Find Mathematics subject
  const mathSubject = results?.find((item: any) =>
    (item?.subject || "").toLowerCase().includes("math")
  );

  // Find English subject
  const englishSubject = results?.find((item: any) =>
    (item?.subject || "").toLowerCase().includes("english")
  );

  const failedMaths = mathSubject ? isSubjectFail(mathSubject) : false;
  const failedEnglish = englishSubject ? isSubjectFail(englishSubject) : false;
  const failedBothMathsAndEnglish = failedMaths && failedEnglish;

  const isBelow45Percent = percentage < 45;

  if (failedBothMathsAndEnglish || isBelow45Percent) {
    let reasonText = "";
    if (failedBothMathsAndEnglish && isBelow45Percent) {
      reasonText = "Failed Maths & English and Score below 45%";
    } else if (failedBothMathsAndEnglish) {
      reasonText = "Failed Maths & English";
    } else {
      reasonText = "Score below 45%";
    }

    return {
      status: "REPEAT",
      reason: `REPEAT CLASS (${reasonText})`,
      isRepeat: true,
    };
  }

  return {
    status: "PROMOTED",
    reason: "PROMOTED TO NEXT CLASS",
    isRepeat: false,
  };
};
