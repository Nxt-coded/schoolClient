import { useDispatch } from "react-redux";
import { FC, useState } from "react";
import { displaySession, displaySessioned } from "../../../global/reduxState";
import { useSchoolData } from "../../../pages/hook/useSchoolAuth";
import { FaCheckDouble } from "react-icons/fa6";

const Session: FC = () => {
  const { data } = useSchoolData();
  const dispatch = useDispatch();

  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(displaySession(true));
      dispatch(displaySessioned(false));
    } else {
      document.startViewTransition(() => {
        dispatch(displaySession(true));
        dispatch(displaySessioned(false));
      });
    }
  };

  const [state, setState] = useState<string>("");

  const changeImage = (e: any) => {
    const file = e.target.files[0];

    const formData: any = new FormData();
    formData.append("avatar", file);
    setState(file);
    console.log(state);

    if (state) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
      }, 1000);
    }
  };

  const arrayData = Array.from({ length: 0 });

  return (
    <div className="border w-[250px] bg-blue-50 shadow-sm min-h-42 rounded-md p-1 ">
      <p className="text-[14px] mt-2 font-bold ml-2">Academic Session</p>
      <div className="flex flex-col items-between  w-full">
        {arrayData.length > 0 ? (
          <div>
            {arrayData?.map((props: any, i: number) => (
              <div
                key={i}
                className="w-full
          "
                // onClick={handleToggleMenuFalse}
              >
                <div className="text-[12px] w-full py-2 font-medium  duration-300 transition-all hover:bg-blue-950 p-2 rounded-md my-1 hover:text-white cursor-pointer flex items-center justify-between border">
                  <div>Session: 2023/2024</div>
                  <div className="text-[17px]"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
            <FaCheckDouble size={13} />
            <p className="mt-3 text-[12px] font-medium">
              session hasn't been decleared
            </p>
          </div>
        )}
      </div>

      <div className="mt-4" />
      <hr />
      <div
        className="flex w-full justify-center items-center cursor-pointer hover:text-blue-900 transition-all duraion-300 mt-2"
        onClick={handleToggleMenuFalse}
      >
        <p className="font-bold">+</p>
        <p className="p-2 text-center break-words text-[12px] font-bold uppercase ">
          Add New Session
        </p>
      </div>
    </div>
  );
};

export default Session;
