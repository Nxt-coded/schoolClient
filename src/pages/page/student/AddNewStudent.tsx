import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayDelay, displayStudent } from "../../../global/reduxState";
import AddStudent from "./AddStudent";

const AddNewStaff = () => {
  //   const toggle = useSelector((state: any) => state.showStaffComp);
  const toggled = useSelector((state: any) => state.delayToggled);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timing = setTimeout(() => {
      setShow(toggled);
      clearTimeout(timing);
    }, 60);
  }, [show, toggled]);

  return (
    <div className="w-full h-full flex justify-end overflow-hidden ">
      <div
        className={`h-full w-[500px] z-10 bg-white drop-shadow-lg rounded-r-md absolute transition-all duration-300
          ${show ? "right-[0rem]" : "-right-[35rem]"} `}
      >
        <AddStudent />
      </div>

      <p
        className="cursor-pointer absolute w-full h-full top-0 left-0 "
        onClick={() => {
          dispatch(displayDelay(false));
          const timing = setTimeout(() => {
            dispatch(displayStudent(false));

            clearTimeout(timing);
          }, 500);
        }}
      />
    </div>
  );
};

export default AddNewStaff;
