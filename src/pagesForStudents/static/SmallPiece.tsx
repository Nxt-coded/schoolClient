import { useDispatch, useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { FC, ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdImages } from "react-icons/io";
import {
  changeMenuState,
  changeToggleMenuState,
  displayImageToggle,
  logoutState,
} from "../../global/reduxState";
import { logout } from "../../pages/api/schoolAPIs";
import { useSchoolData } from "../../pages/hook/useSchoolAuth";
import Button from "../../components/reUse/Button";
import { useStudentInfo } from "../hooks/useStudentHook";
import toast from "react-hot-toast";
import { updateStudentAvatar } from "../api/studentAPI";
import { mutate } from "swr";

interface iData {
  title?: string;
  icon?: ReactNode;
  to?: string;
  onClick?: () => void;
}
interface iProps {
  name?: iData[];
  propName: string;

  log?: boolean;
  but?: boolean;
  maxHeight?: string;
}

const SmallPiece: FC<iProps> = ({ log, name, but, propName }) => {
  const { studentInfo } = useStudentInfo();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleMenuFalse = () => {
    if (!document.startViewTransition) {
      dispatch(changeToggleMenuState(false));
    } else {
      document.startViewTransition(() => {
        dispatch(changeToggleMenuState(false));
      });
    }
  };

  const handleMenu = () => {
    if (!document.startViewTransition) {
      dispatch(changeToggleMenuState(false));
      dispatch(changeMenuState(false));
    } else {
      document.startViewTransition(() => {
        dispatch(changeToggleMenuState(false));
        dispatch(changeMenuState(false));
      });
    }
  };

  const [state, setState] = useState<string>("");

  const changeImage = (e: any) => {
    const file = e.target.files[0];

    const formData: any = new FormData();
    formData.append("avatar", file);
    setState(file);

    // if (state) {
    dispatch(displayImageToggle(true));

    const timer = setTimeout(() => {
      updateStudentAvatar(studentInfo?._id, formData).then((res) => {
        if (res.status === 201) {
          mutate(`api/view-student-info/${studentInfo?._id}`);
          toast.success("Image has been updated");
          dispatch(displayImageToggle(false));
          handleMenu();
        } else {
          toast.error(`${res?.response?.data?.message}`);
          dispatch(displayImageToggle(false));
          handleMenu();
        }
      });
      clearTimeout(timer);
    }, 50);
  };
  // };

  useEffect(() => {}, [state]);

  return (
    <div className="border w-[250px] bg-blue-50 shadow-sm  rounded-md p-1 overflow-y-auto  z-50">
      <div
        className={`flex flex-col items-between w-full ${
          propName === "navs" ? "smallph h-[500px] overflow-y-auto" : ""
        }`}
      >
        
        {name?.map(({ title, icon, to }, i: number) => (
          <NavLink
            key={i}
            to={`${to}`}
            className="w-full
          "
            onClick={handleToggleMenuFalse}
          >
            <div className="text-[12px] w-full py-3 font-medium  duration-300 transition-all hover:bg-blue-950 p-2 rounded-md my-1 hover:text-white cursor-pointer flex items-center justify-between">
              <div>{title}</div>
              <div className="text-[17px]">{icon}</div>
            </div>
          </NavLink>
        ))}
      </div>

      {but && (
        <div className="w-full flex flex-col justify-center mt-3">
          {/* <NavLink to="/upgrade" onClick={handleToggleMenuFalse}> */}
          <Button
            name={
              <div>
                Pay Fees
                <br />
                <p className="text-[12px]">(coming soon)</p>
              </div>
            }
            className="bg-black hover:bg-neutral-800 transition-all duration-300 text-white border-none font-medium py-2 px-6 leading-tight tracking-wider text-[14px]"
          />
          <Link to="/make-other-payments">
            <Button
              name={<div>Make Other Payments</div>}
              className="bg-blue-950 hover:bg-blue-900 transition-all duration-300 text-white border-none font-medium py-3 px-5 leading-tight w-[93%] tracking-wider -mt-0 text-[13px]"
            />
          </Link>
          {/* </NavLink> */}
        </div>
      )}

      {log && (
        <label
          htmlFor="id"
          className="text-[12px] font-medium py-3 duration-300 transition-all hover:bg-blue-950 p-2 rounded-md my-1 hover:text-white cursor-pointer flex items-center justify-between"
          content="Upload Avatar"
          title="Upload Avatar"
          onClick={() => {}}
        >
          Upload Avatar
          <input
            id="id"
            className="hidden"
            onChange={changeImage}
            type="file"
          />
          <div>
            <IoMdImages size={17} />
          </div>
        </label>
      )}

      {log && (
        <div
          className="text-[12px] font-medium py-3 duration-300 transition-all hover:bg-blue-950 p-2 rounded-md my-1 hover:text-white cursor-pointer flex items-center justify-between"
          onClick={() => {
            dispatch(logoutState());
            handleMenu();
            const timer = setTimeout(() => {
              navigate("/");
              localStorage.clear();
              window.location.reload();
              clearTimeout(timer);
            }, 0);
          }}
        >
          <div>Log-out</div>
          <div>
            <MdLogout size={17} />
          </div>
        </div>
      )}
      <div className="mt-4" />
      <hr />
      <p className="p-2 text-center break-words text-[12px] font-bold uppercase ">
        {studentInfo?.schoolName}
      </p>
    </div>
  );
};

export default SmallPiece;
