import ClipLoader from "react-spinners/ClipLoader";

const QuizLoad = () => {
  return (
    <div
      className="w-full h-screen absolute top-0 left-0 flex flex-col justify-center items-center "
      style={{
        background: "rgba(73, 154, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(73, 154, 255, 0.3)",
      }}
    >
      <ClipLoader color="#000000" size={20} />
    </div>
  );
};

export default QuizLoad;
