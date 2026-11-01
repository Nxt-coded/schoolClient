const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pagesForStudents/pages/CardTemplate/PrintReportCard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add useLocation import
content = content.replace(
  'import { Link } from "react-router-dom";',
  'import { Link, useLocation } from "react-router-dom";'
);

// 2. Add query params parsing and target definitions inside PrintReportCard
const hookInsertionPoint = `  const { studentInfo } = useStudentInfo();`;
const newHooks = `  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classInfoQuery = searchParams.get("classInfo");

  const { studentInfo } = useStudentInfo();`;

content = content.replace(hookInsertionPoint, newHooks);

// 3. Update grade query and target variables
const gradeQueryOld = `  let grade = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      \`\${studentInfo?.classAssigned} session: \${school?.presentSession}(\${school?.presentTerm})\`
    );
  });`;

const gradeQueryNew = `  let targetClassInfo = classInfoQuery || \`\${studentInfo?.classAssigned} session: \${school?.presentSession}(\${school?.presentTerm})\`;
  let targetSession = school?.presentSession;
  let targetTerm = school?.presentTerm;

  if (classInfoQuery) {
    const sessionMatch = classInfoQuery.match(/session:\\s*(.*?)\\((.*?)\\)/);
    if (sessionMatch) {
      targetSession = sessionMatch[1].trim();
      targetTerm = sessionMatch[2].trim();
    }
  }

  let grade = gradeData?.reportCard?.find((el: any) => {
    return el.classInfo === targetClassInfo;
  });`;

content = content.replace(gradeQueryOld, gradeQueryNew);

// 4. Update the terms inside the UI logic
// Replace all \`school?.presentTerm\` with \`targetTerm\` where it's used to conditionally render or layout things.
content = content.replace(/school\?\.presentTerm/g, 'targetTerm');
content = content.replace(/school\?\.presentSession/g, 'targetSession');

// 5. Fix mobile layout issue
const mobileLayoutOld = `<main className="flex justify-center mt-10">`;
const mobileLayoutNew = `<main className="flex md:justify-center mt-10 w-max min-w-full">`;
content = content.replace(mobileLayoutOld, mobileLayoutNew);

// Make the outer div wrapper overflow-x-auto
content = content.replace(
  '<div className="relative ">', 
  '<div className="relative w-full overflow-x-auto">'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done.");
