const fs = require('fs');

const filePath = 'c:/Users/FutureLab/Documents/project/next/startSchoolFe/src/pagesForStudents/pages/CardTemplate/PrintReportCard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the reference error where targetSession is assigned to targetSession
content = content.replace('let targetSession = targetSession;', 'let targetSession = school?.presentSession;');
content = content.replace('let targetTerm = targetTerm;', 'let targetTerm = school?.presentTerm;');
content = content.replace('let targetClassInfo = classInfoQuery || `${studentInfo?.classAssigned} session: ${targetSession}(${targetTerm})`;', 'let targetClassInfo = classInfoQuery || `${studentInfo?.classAssigned} session: ${school?.presentSession}(${school?.presentTerm})`;');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done fixing PrintReportCard vars.");
