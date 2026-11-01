import { useState } from "react";
import Button from "../../../components/reUse/Button";
import Input from "../../../components/reUse/Input";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import toast, { Toaster } from "react-hot-toast";
import { displayUserStatus, loginState } from "../../../global/reduxState";
import {
  loginTeacher,
  loginTeacherToken,
} from "../../../pagesForTeachers/api/teachersAPI";
import logo from "../../../assets/mainLogo.png";
import PasswordInput from "../../../components/reUse/PasswordIput";

const SwitchLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [enrollmentID, setEnrollmentID] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [token, setToken] = useState<boolean>(true);
  const changeTokenDisplay = () => {
    setToken(!token);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    setLoading(true);
    const val = { email: state?.trim(), password: password?.trim() };

    loginTeacher(val)
      .then((res) => {
        if (res.status === 201) {
          dispatch(loginState(res));
          dispatch(displayUserStatus(res.user));
          toast.success("login successful");
          setLoading(false);

          if (!loading) {
            sessionStorage.clear();
            navigate("/dashboard");
          }
        } else {
          if (res?.response?.data?.message === undefined || "undefined") {
            setLoading(false);
            toast.error("Wrong ID, Please check your EnrollmentID");
          } else {
            setLoading(false);
            toast.error(`${res?.response?.data?.message}`);
          }
        }
      })
      .then(() => {});
  };

  const handleSubmitToken = () => {
    // e.preventDefault();
    setLoading(true);
    const val = { token: enrollmentID?.trim() };

    loginTeacherToken(val)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          dispatch(loginState(res));
          dispatch(displayUserStatus(res.user));
          toast.success("login successful");
          setLoading(false);

          if (!loading) {
            sessionStorage.clear();
            navigate("/dashboard");
          }
        } else {
          if (res?.response?.data?.message === undefined || "undefined") {
            setLoading(false);
            toast.error("Wrong ID, Please check your EnrollmentID");
          } else {
            setLoading(false);
            toast.error(`${res?.response?.data?.message}`);
          }
        }
      })
      .then(() => {});
  };

  return (
    <div className="freshh w-full h-full flex flex-col justify-center items-center ">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mb-10 text-center flex items-center w-full flex-col">
        <Link to="/">
          <img className="mb-5 w-56 h-28 object-contain" src={logo} />{" "}
        </Link>

        <div className="text-[26px] font-bold mb-3 text-blue-900">
          Welcome Back
        </div>
        <div className="text-[14px] -mt-3 w-[70%] leading-tight">
          Sign in as Teacher/Staff to continue your Experience.
        </div>
      </div>

      {/* <div className="flex justify-center w-full">
        <div className="flex w-[80%] md:w-[500px] ">
          <Button
            className="bg-black font-semibold py-4 ml-0 flex-1"
            name={"Login with Email/Password"}
            onClick={changeTokenDisplay}
          />
          <Button
            className="bg-blue-950 py-4 font-semibold mr-0 flex-1"
            name={"Login with EntrollmentID"}
            onClick={changeTokenDisplay}
          />
        </div>
      </div> */}
      {!token ? (
        <div
          className="rounded-md bg-white transition-all duration-300 min-h-[200px] w-[80%] md:w-[500px] border p-4"
          // onSubmit={handleSubmit}
        >
          <Input
            placeholder="Email"
            className="w-[97%]"
            type="email"
            required
            value={state}
            onChange={(e: any) => {
              setState(e.target.value);
            }}
          />
          <PasswordInput
            placeholder="Your Password"
            className="w-[97%]"
            show
            //   errorText="Password has to be passed"
            errorText={password && "Ensure your Password correct"}
            required
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />

          <div>
            <Button
              name={
                loading ? "Loading..." : "Teacher Login with Email/Password"
              }
              className="w-[97%] text-[16px] bg-neutral-950 text-white h-14 hover:bg-neutral-800 transition-all duration-300"
              type="submit"
              onClick={handleSubmit}
              icon={loading && <ClipLoader color="white" size={18} />}
            />

            <div className="text-[12px] ml-2 font-bold cursor-pointer">
              {/* Teacher and Student, Switch Login */}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="rounded-md transition-all duration-300 bg-white min-h-[100px] w-[80%] md:w-[500px] border p-4"
          // onSubmit={handleSubmit}
        >
          <PasswordInput
            placeholder="EnrollmentID"
            className="w-[97%]"
            show
            //   errorText="Password has to be passed"
            errorText={enrollmentID && "Ensure EnrollmentID correct"}
            required
            value={enrollmentID}
            onChange={(e: any) => {
              setEnrollmentID(e.target.value);
            }}
          />

          <div>
            <Button
              name={loading ? "Loading..." : "Teacher Login with EnrollmentID"}
              className="w-[97%] !text-[16px bg-blue-950 text-white h-14 hover:bg-blue-800 transition-all duration-300"
              type="submit"
              onClick={handleSubmitToken}
              icon={loading && <ClipLoader color="white" size={18} />}
              style={{ fontSize: "16px" }}
            />

            <div className="text-[12px] ml-2 font-bold cursor-pointer">
              {/* Teacher and Student, Switch Login */}
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 pb-[20px] text-[13px]">
        Don’t have an account yet?{" "}
        <span className="font-bold text-blue-900">
          <Link to="/auth">Register here</Link>
        </span>
      </div>
    </div>
  );
};

export default SwitchLogin;
