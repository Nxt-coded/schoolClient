const fs = require('fs');

const filePath = 'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pagesForStudents/pages/CardTemplate/PrintReportCard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const hookInsertion = `  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    studentInfo?.schoolIDs
  );

  let school: any = schoolAnnouncement;

  let targetClassInfo = classInfoQuery || \`\${studentInfo?.classAssigned} session: \${school?.presentSession}(\${school?.presentTerm})\`;
  let targetSession = school?.presentSession;
  let targetTerm = school?.presentTerm;

  if (classInfoQuery) {
    const sessionMatch = classInfoQuery.match(/session:\\s*(.*?)\\((.*?)\\)/);
    if (sessionMatch) {
      targetSession = sessionMatch[1].trim();
      targetTerm = sessionMatch[2].trim();
    }
  }`;

// Find `  const { schoolAnnouncement }: any = useSchoolAnnouncement(` to `  let school: any = schoolAnnouncement;` and replace it
content = content.replace(
  `  const { schoolAnnouncement }: any = useSchoolAnnouncement(
    studentInfo?.schoolIDs
  );

  let school: any = schoolAnnouncement;`,
  hookInsertion
);

// We also need to fix `grade` declaration if it's using targetSession and targetTerm without backticks because the script before might have broken it.
content = content.replace(
  `  let grade = gradeData?.reportCard?.find((el: any) => {
    return (
      el.classInfo ===
      \`\${studentInfo?.classAssigned} session: \${targetSession}(\${targetTerm})\`
    );
  });`,
  `  let grade = gradeData?.reportCard?.find((el: any) => {
    return el.classInfo === targetClassInfo;
  });`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done fixing PrintReportCard");
