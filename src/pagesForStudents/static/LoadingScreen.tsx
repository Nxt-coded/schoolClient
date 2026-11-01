import ClipLoader from "react-spinners/ClipLoader";
import Button from "../../components/reUse/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoadingScreen = () => {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setState(true);
      clearTimeout(timer);
    }, 13000);
  }, [state]);
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

      {state && (
        <div className="w-full flex-col flex items-center ">
          {" "}
          <p className="mt-10">You've been Logged Out</p>
          <Link to="/auth/login" className="">
            <Button name="Login Again" className="bg-blue-950 " />
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
