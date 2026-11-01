import ClipLoader from "react-spinners/ClipLoader";
import Button from "../reUse/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fav from "../../../public/fav.png";
import { useSchoolData } from "../../pages/hook/useSchoolAuth";
const LoadingScreen = () => {
  const [state, setState] = useState<boolean>(false);
  const { data } = useSchoolData();

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
        background: `${
          data?.categoryType === "Secondary"
            ? "rgba(73, 154, 255, 0.2)"
            : "rgba(73, 154, 255, 0.2)"
        }`,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(73, 154, 255, 0.3)",
      }}
    >
      <div className="relative flex justify-center items-center mb-7">
        <ClipLoader color="#000000" size={20} className="absolute top-9" />
        <img className=" h-[20px] mt-2 animate-pulse" src={fav} />
      </div>

      {state && (
        <div className="w-full flex-col flex items-center ">
          {" "}
          <p className="mt-8">Something went wrong</p>
          <Link to="/" className="">
            <Button
              name="Retry"
              className={`${
                data?.categoryType === "Secondary"
                  ? "bg-blue-950"
                  : "bg-red-950"
              }`}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
