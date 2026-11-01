const fs = require('fs');
let c = fs.readFileSync('src/main.tsx', 'utf8');

c = c.replace(
  'ReactDOM.createRoot(document.getElementById("root")!).render(\\n  // <React.StrictMode>\\n  <App />\\n\\n  // </React.StrictMode>\\n);',
  `const rootElement = document.getElementById("root")!;
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, <App />);
} else {
  ReactDOM.createRoot(rootElement).render(<App />);
}`
);

fs.writeFileSync('src/main.tsx', c);
console.log("Done fixing main.tsx.");
