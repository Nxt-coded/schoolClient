const fs = require('fs');

const filePaths = [
  'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pagesForStudents/pages/CardTemplate/ReportCardTemplateOne.tsx',
  'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pages/page/ResultHistory/ReportCardTemplateOne.tsx',
  'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pagesForTeachers/pages/CardTemplate/TeacherReportCardTemplateOne.tsx'
];

for (const filePath of filePaths) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // We already know ReportCardTemplateOne gets queryClassInfo via searchParams
  // Let's find timetbale?.data?.presentTerm or school?.presentTerm or whatever it uses.
  
  // To be safe, let's parse targetSession and targetTerm using queryClassInfo:
  const extractLogic = `  let targetSession = timetbale?.data?.presentSession;
  let targetTerm = timetbale?.data?.presentTerm;

  if (queryClassInfo) {
    const sessionMatch = queryClassInfo.match(/session:\\s*(.*?)\\((.*?)\\)/);
    if (sessionMatch) {
      targetSession = sessionMatch[1].trim();
      targetTerm = sessionMatch[2].trim();
    }
  }`;

  // Insert extractLogic before `const positionFromState = `
  if (!content.includes('let targetSession =')) {
    content = content.replace('const positionFromState =', extractLogic + '\\n\\n  const positionFromState =');
  }

  // Replace occurrences of timetbale?.data?.presentTerm with targetTerm
  content = content.replace(/timetbale\?\.data\?\.presentTerm/g, 'targetTerm');
  // Replace occurrences of timetbale?.data?.presentSession with targetSession
  content = content.replace(/timetbale\?\.data\?\.presentSession/g, 'targetSession');

  // Fix the mobile layout issue in ReportCardTemplateOne
  const mobileLayoutOld = `<main className="flex justify-center mt-10">`;
  const mobileLayoutNew = `<main className="flex md:justify-center mt-10 w-max min-w-full">`;
  content = content.replace(mobileLayoutOld, mobileLayoutNew);

  // Make the outer div wrapper overflow-x-auto
  content = content.replace(
    '<div className="relative ">', 
    '<div className="relative w-full overflow-x-auto">'
  );

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Done fixing ReportCardTemplateOne.");
