import{r as p,g as v}from"./index-BW2wwurf.js";const k="/assets/oops-transformed-removebg-preview-Bnig3h0J.png",h=["copy","cut","paste","contextmenu","selectstart","dragstart"],L=()=>{const o=p.useRef(!1),w=()=>{o.current=!0;const s=document.documentElement.requestFullscreen;if(!document.fullscreenElement&&typeof s=="function")try{s.call(document.documentElement).catch(t=>{console.error("Could not enter assessment fullscreen mode:",t),v.error("Fullscreen is unavailable. You can continue the assessment without it.")})}catch(t){console.error("Could not enter assessment fullscreen mode:",t)}};return p.useEffect(()=>{let s,t,r=document.visibilityState==="hidden";const a=e=>{e.preventDefault()},l=e=>{const n=e.key.toLowerCase(),c=e.code==="PrintScreen"||["printscreen","prtscr","snapshot"].includes(n),g=(e.ctrlKey||e.metaKey)&&["a","c","n","p","s","t","u","v","x"].includes(n),y=e.ctrlKey&&e.shiftKey&&["c","i","j","n"].includes(n);(g||y||e.key==="F12"||e.key==="F5"||e.key==="F11"||c||e.ctrlKey&&n==="r")&&e.preventDefault(),c&&(document.documentElement.classList.add("assessment-screenshot-warning"),window.clearTimeout(s),s=window.setTimeout(()=>{document.documentElement.classList.remove("assessment-screenshot-warning")},2e3))},d=()=>{document.documentElement.classList.add("assessment-focus-warning"),window.clearTimeout(t),t=window.setTimeout(()=>{document.documentElement.classList.remove("assessment-focus-warning")},2500)},m=()=>{document.visibilityState==="hidden"?r=!0:r&&o.current&&(r=!1,d())},u=()=>{o.current&&!document.fullscreenElement&&d()},f=e=>{const n=e.target;if(!(n instanceof Element))return;n.closest('a[target="_blank"]')&&(e.preventDefault(),e.stopImmediatePropagation())},i=document.createElement("style");return i.textContent=`
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
    `,document.head.appendChild(i),h.forEach(e=>{document.addEventListener(e,a,!0)}),window.addEventListener("keydown",l,!0),document.addEventListener("click",f,!0),document.addEventListener("visibilitychange",m),document.addEventListener("fullscreenchange",u),()=>{h.forEach(e=>{document.removeEventListener(e,a,!0)}),window.removeEventListener("keydown",l,!0),document.removeEventListener("click",f,!0),document.removeEventListener("visibilitychange",m),document.removeEventListener("fullscreenchange",u),window.clearTimeout(s),window.clearTimeout(t),document.documentElement.classList.remove("assessment-screenshot-warning"),document.documentElement.classList.remove("assessment-focus-warning"),i.remove()}},[]),w};export{k as o,L as u};
