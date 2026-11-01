import { useNavigate } from "react-router-dom";
import "./style.css";
export const Fallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <h1 className="text-[20px]">Something went wrong:</h1>
      {/* <p className="zoom-area">
        <b>CSS</b> animations to make a cool 404 page.{" "}
      </p> */}
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <button
          className="btn bg-[#594558] text-white hover:bg-[#835254] px-8 transition-all duration-300 uppercase"
          onClick={() => {
            navigate(-1);
          }}
        >
          Take a step Back
        </button>
      </div>
    </div>
  );
};
