const fs = require('fs');
const h = fs.readFileSync('dist/200.html', 'utf8');
console.log('File size:', h.length, 'bytes');
const divCount = (h.match(/<div/g) || []).length;
console.log('div count:', divCount);
const hasContent = h.includes('id="root"') && h.length > 5000;
console.log('Prerender status:', hasContent ? 'YES - real content rendered!' : 'NO - still empty shell');
// Print first 500 chars of body content
const bodyMatch = h.match(/<body[^>]*>([\s\S]{0,500})/);
if (bodyMatch) console.log('\nBody preview:\n', bodyMatch[1]);
