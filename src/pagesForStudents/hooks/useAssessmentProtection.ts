import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const blockedClipboardEvents = [
  "copy",
  "cut",
  "paste",
  "contextmenu",
  "selectstart",
  "dragstart",
] as const;

export const useAssessmentProtection = () => {
  const assessmentActive = useRef(false);

  const enterAssessmentMode = () => {
    assessmentActive.current = true;

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((error: unknown) => {
        console.error("Could not enter assessment fullscreen mode:", error);
        toast.error(
          "Fullscreen could not be enabled. Please use a managed exam device."
        );
      });
    }
  };

  useEffect(() => {
    let screenshotWarningTimeout: number | undefined;
    let focusWarningTimeout: number | undefined;
    let wasHidden = document.visibilityState === "hidden";

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isScreenshotKey =
        event.code === "PrintScreen" ||
        ["printscreen", "prtscr", "snapshot"].includes(key);
      const hasModifier = event.ctrlKey || event.metaKey;
      const blockedModifierShortcut =
        hasModifier &&
        ["a", "c", "n", "p", "s", "t", "u", "v", "x"].includes(key);
      const blockedDeveloperShortcut =
        event.ctrlKey &&
        event.shiftKey &&
        ["c", "i", "j", "n"].includes(key);

      if (
        blockedModifierShortcut ||
        blockedDeveloperShortcut ||
        event.key === "F12" ||
        event.key === "F5" ||
        event.key === "F11" ||
        isScreenshotKey ||
        (event.ctrlKey && key === "r")
      ) {
        event.preventDefault();
      }

      if (isScreenshotKey) {
        document.documentElement.classList.add("assessment-screenshot-warning");
        window.clearTimeout(screenshotWarningTimeout);
        screenshotWarningTimeout = window.setTimeout(() => {
          document.documentElement.classList.remove(
            "assessment-screenshot-warning"
          );
        }, 2000);
      }
    };

    const showFocusWarning = () => {
      document.documentElement.classList.add("assessment-focus-warning");
      window.clearTimeout(focusWarningTimeout);
      focusWarningTimeout = window.setTimeout(() => {
        document.documentElement.classList.remove("assessment-focus-warning");
      }, 2500);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        wasHidden = true;
      } else if (wasHidden && assessmentActive.current) {
        wasHidden = false;
        showFocusWarning();
      }
    };

    const handleFullscreenChange = () => {
      if (assessmentActive.current && !document.fullscreenElement) {
        showFocusWarning();
      }
    };

    const preventNewTabLink = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[target="_blank"]');
      if (link) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    const printStyles = document.createElement("style");
    printStyles.textContent = `
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
    `;
    document.head.appendChild(printStyles);

    blockedClipboardEvents.forEach((eventName) => {
      document.addEventListener(eventName, preventDefault, true);
    });
    window.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("click", preventNewTabLink, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      blockedClipboardEvents.forEach((eventName) => {
        document.removeEventListener(eventName, preventDefault, true);
      });
      window.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("click", preventNewTabLink, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.clearTimeout(screenshotWarningTimeout);
      window.clearTimeout(focusWarningTimeout);
      document.documentElement.classList.remove(
        "assessment-screenshot-warning"
      );
      document.documentElement.classList.remove("assessment-focus-warning");
      printStyles.remove();
    };
  }, []);

  return enterAssessmentMode;
};
