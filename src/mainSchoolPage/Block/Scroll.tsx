import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useState, useEffect } from "react";

const Scroll = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;

      if (scrollPosition > 100) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }

      if (
        window.innerHeight + scrollPosition <
        document.body.offsetHeight - 100
      ) {
        setShowScrollDown(true);
      } else {
        setShowScrollDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {showScrollUp && (
        <div
          className="text-[30px] cursor-pointer text-blue-950"
          onClick={scrollUp}
          style={{ marginBottom: "10px" }}
        >
          <FaAngleUp />
        </div>
      )}
      {showScrollDown && (
        <div
          className="text-[30px] cursor-pointer text-blue-950"
          onClick={scrollDown}
        >
          <FaAngleDown />
        </div>
      )}
    </div>
  );
};

export default Scroll;
