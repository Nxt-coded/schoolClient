import { useDispatch, useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { FC, ReactNode, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../reUse/Button";
import { IoMdImages } from "react-icons/io";
import {
  changeMenuState,
  changeToggleMenuState,
  displayImageToggle,
  logoutState,
} from "../../../global/reduxState";
import { logout } from "../../../pages/api/schoolAPIs";
import { useSchoolData } from "../../../pages/hook/useSchoolAuth";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { updateStudentAvatar } from "../../../pagesForStudents/api/studentAPI";
import { useStudentInfo } from "../../../pagesForStudents/hooks/useStudentHook";
import { updateTeacherAvatar } from "../../api/teachersAPI";
import { useTeacherInfo } from "../../hooks/useTeacher";
import { FaMarker } from "react-icons/fa6";

interface iData {
  title?: string;
  icon?: ReactNode;
  to?: string;
  onClick?: () => void;
}
interface iProps {
  name?: iData[];

  log?: boolean;
  but?: boolean;
}

const SmallPiece: FC<iProps> = ({ log, name, but }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentInfo } = useStudentInfo();

  const toggle = useSelector((state: any) => state.toggle);

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
  const { teacherInfo } = useTeacherInfo();

  const [state, setState] = useState<string>("");

  const changeImage = (e: any) => {
    const file = e.target.files[0];

    const formData: any = new FormData();
    formData.append("avatar", file);
    setState(file);

    dispatch(displayImageToggle(true));
    const timer = setTimeout(() => {
      updateTeacherAvatar(teacherInfo?._id, formData).then((res) => {
        console.log(res);
        mutate(`api/view-teacher-detail/${teacherInfo?._id}`);
        if (res.status === 201) {
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

  useEffect(() => {}, [state]);

  return (
    <div className="border w-[250px] bg-blue-50 shadow-sm min-h-48 rounded-md p-1">
      <div className="flex flex-col items-between w-full  overflow-y-auto">
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
        <div className="w-full flex justify-center mt-3">
          <NavLink to="/attendance" onClick={handleToggleMenuFalse}>
            <Button
              name="Mark Attendance"
              className="text-[12px] uppercase font-bold bg-blue-950 text-white rounded-lg"
              icon={<FaMarker className="text-[11px]" />}
            />
          </NavLink>
        </div>
      )}

      {log && (
        <label
          htmlFor="id"
          className="text-[12px] font-medium py-3 duration-300 transition-all hover:bg-blue-950 p-2 rounded-md my-1 hover:text-white cursor-pointer flex items-center justify-between"
          onClick={() => {
            // dispatch(logoutState());
          }}
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
            // logout();

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
        {teacherInfo?.schoolName}
      </p>
    </div>
  );
};

export default SmallPiece;
