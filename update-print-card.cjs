const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src/pagesForStudents/pages/CardTemplate/PrintReportCard.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add reportClass resolution after targetClassInfo
const oldBlock = `  let targetClassInfo = classInfoQuery || \`\${studentInfo?.classAssigned} session: \${targetSession}(\${targetTerm})\`;

  if (classInfoQuery) {
    const sessionMatch = classInfoQuery.match(/session:\\s*(.*?)\\((.*?)\\)/);
    if (sessionMatch) {
      targetSession = sessionMatch[1].trim();
      targetTerm = sessionMatch[2].trim();
    }
  }`;

const newBlock = `  let targetClassInfo = classInfoQuery || \`\${studentInfo?.classAssigned} session: \${targetSession}(\${targetTerm})\`;

  let reportClass = studentInfo?.classAssigned || "";
  if (classInfoQuery) {
    const classMatch = classInfoQuery.split("session:")[0].trim();
    if (classMatch) {
      reportClass = classMatch;
    }
    const sessionMatch = classInfoQuery.match(/session:\\s*(.*?)\\((.*?)\\)/);
    if (sessionMatch) {
      targetSession = sessionMatch[1].trim();
      targetTerm = sessionMatch[2].trim();
    }
  }`;

content = content.replace(oldBlock, newBlock);

// 2. Update st1, st2, st3
content = content.replace(
  /\`\${studentInfo\?\.classAssigned} session: \${targetSession}\(1st Term\)\`/g,
  '`${reportClass} session: ${targetSession}(1st Term)`'
);
content = content.replace(
  /\`\${studentInfo\?\.classAssigned} session: \${targetSession}\(2nd Term\)\`/g,
  '`${reportClass} session: ${targetSession}(2nd Term)`'
);
content = content.replace(
  /\`\${studentInfo\?\.classAssigned} session: \${targetSession}\(3rd Term\)\`/g,
  '`${reportClass} session: ${targetSession}(3rd Term)`'
);

// 3. Update filenames and class display
content = content.replace(
  'filename: `${studentInfo?.studentFirstName}-${studentInfo?.classAssigned}-${targetSession}',
  'filename: `${studentInfo?.studentFirstName}-${reportClass || studentInfo?.classAssigned}-${targetSession}'
);
content = content.replace(
  '{studentInfo?.classAssigned} {targetSession}',
  '{reportClass || studentInfo?.classAssigned} {targetSession}'
);
content = content.replace(
  '<h1 className="uppercase text-[12px] font-normal -mt-[2px]">\n                    {studentInfo?.classAssigned}\n                  </h1>',
  '<h1 className="uppercase text-[12px] font-normal -mt-[2px]">\n                    {reportClass || studentInfo?.classAssigned}\n                  </h1>'
);

// Also handle CRLF for the above replacement if needed
content = content.replace(
  '<h1 className="uppercase text-[12px] font-normal -mt-[2px]">\r\n                    {studentInfo?.classAssigned}\r\n                  </h1>',
  '<h1 className="uppercase text-[12px] font-normal -mt-[2px]">\r\n                    {reportClass || studentInfo?.classAssigned}\r\n                  </h1>'
);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated PrintReportCard.tsx!');
