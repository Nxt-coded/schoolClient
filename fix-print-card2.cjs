const fs = require('fs');

const filePath = 'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pagesForStudents/pages/CardTemplate/PrintReportCard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace occurrences of school?.presentTerm with targetTerm
content = content.replace(/school\?\.presentTerm/g, 'targetTerm');
// Replace occurrences of school?.presentSession with targetSession
content = content.replace(/school\?\.presentSession/g, 'targetSession');

// Fix the mobile layout issue in PrintReportCard
const mobileLayoutOld = `<main className="flex justify-center mt-10">`;
const mobileLayoutNew = `<main className="flex md:justify-center mt-10 w-max min-w-full">`;
content = content.replace(mobileLayoutOld, mobileLayoutNew);

// Make the outer div wrapper overflow-x-auto
content = content.replace(
  '<div className="relative ">', 
  '<div className="relative w-full overflow-x-auto">'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done fixing PrintReportCard layout and variables.");
