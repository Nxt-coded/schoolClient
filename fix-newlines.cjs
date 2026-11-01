const fs = require('fs');

const filePaths = [
  'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pagesForStudents/pages/CardTemplate/ReportCardTemplateOne.tsx',
  'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pages/page/ResultHistory/ReportCardTemplateOne.tsx',
  'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pagesForTeachers/pages/CardTemplate/TeacherReportCardTemplateOne.tsx'
];

for (const filePath of filePaths) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix literal \n\n
  content = content.replace(/\\n\\n/g, '\n\n');

  // Fix `let targetSession = targetSession;` which happens due to previous bad replace
  content = content.replace(/let targetSession = targetSession;/g, 'let targetSession = timetbale?.data?.presentSession;');
  content = content.replace(/let targetTerm = targetTerm;/g, 'let targetTerm = timetbale?.data?.presentTerm;');

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Done fixing \\n issue.");
