import{r as p,g as v}from"./index-DYdvb1QK.js";const k="/assets/oops-transformed-removebg-preview-Bnig3h0J.png",h=["copy","cut","paste","contextmenu","selectstart","dragstart"],L=()=>{const s=p.useRef(!1),g=()=>{s.current=!0,document.fullscreenElement||document.documentElement.requestFullscreen().catch(n=>{console.error("Could not enter assessment fullscreen mode:",n),v.error("Fullscreen could not be enabled. Please use a managed exam device.")})};return p.useEffect(()=>{let n,o,i=document.visibilityState==="hidden";const a=e=>{e.preventDefault()},d=e=>{const t=e.key.toLowerCase(),c=e.code==="PrintScreen"||["printscreen","prtscr","snapshot"].includes(t),w=(e.ctrlKey||e.metaKey)&&["a","c","n","p","s","t","u","v","x"].includes(t),y=e.ctrlKey&&e.shiftKey&&["c","i","j","n"].includes(t);(w||y||e.key==="F12"||e.key==="F5"||e.key==="F11"||c||e.ctrlKey&&t==="r")&&e.preventDefault(),c&&(document.documentElement.classList.add("assessment-screenshot-warning"),window.clearTimeout(n),n=window.setTimeout(()=>{document.documentElement.classList.remove("assessment-screenshot-warning")},2e3))},l=()=>{document.documentElement.classList.add("assessment-focus-warning"),window.clearTimeout(o),o=window.setTimeout(()=>{document.documentElement.classList.remove("assessment-focus-warning")},2500)},m=()=>{document.visibilityState==="hidden"?i=!0:i&&s.current&&(i=!1,l())},u=()=>{s.current&&!document.fullscreenElement&&l()},f=e=>{const t=e.target;if(!(t instanceof Element))return;t.closest('a[target="_blank"]')&&(e.preventDefault(),e.stopImmediatePropagation())},r=document.createElement("style");return r.textContent=`
      html.assessment-screenshot-warning::after {
        content: "Screenshot attempt detected";
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: grid;
        place-items: center;
        background: #fff;
        color: #111827;
        font: bold 20px sans-serif;
      }

      html.assessment-focus-warning::after {
        content: "Stay on the assessment page. Please continue your test.";
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        display: grid;
        place-items: center;
        background: #fff;
        color: #111827;
        font: bold 20px sans-serif;
      }

      @media print {
        .assessment-protected > * {
          visibility: hidden !important;
        }

        .assessment-protected::after {
          content: "Assessment content is not available in print.";
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          color: #111827;
          font: bold 20px sans-serif;
          visibility: visible !important;
        }
      }
    `,document.head.appendChild(r),h.forEach(e=>{document.addEventListener(e,a,!0)}),window.addEventListener("keydown",d,!0),document.addEventListener("click",f,!0),document.addEventListener("visibilitychange",m),document.addEventListener("fullscreenchange",u),()=>{h.forEach(e=>{document.removeEventListener(e,a,!0)}),window.removeEventListener("keydown",d,!0),document.removeEventListener("click",f,!0),document.removeEventListener("visibilitychange",m),document.removeEventListener("fullscreenchange",u),window.clearTimeout(n),window.clearTimeout(o),document.documentElement.classList.remove("assessment-screenshot-warning"),document.documentElement.classList.remove("assessment-focus-warning"),r.remove()}},[]),g};export{k as o,L as u};
