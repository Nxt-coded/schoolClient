import { useEffect, useState } from "react";
import Button from "../../../components/reUse/Button";
import Input from "../../../components/reUse/Input";
import google from "../../../assets/socials/google_logosvg.svg";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { jwtDecode } from "jwt-decode";
import {
  getSchoolCookie,
  loginSchool,
  verifySchool,
} from "../../api/schoolAPIs";
import toast, { Toaster } from "react-hot-toast";
import { displayUserStatus, loginState } from "../../../global/reduxState";
import logo from "../../../assets/mainLogo.png";
import PasswordInput from "../../../components/reUse/PasswordIput";

const SignIn = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    const val = { email: state?.trim(), enrollmentID: password?.trim() };



    loginSchool(val)
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
          if (res?.response?.data?.message === "Error finding school") {
            setLoading(false);
            toast.error("Error Finding School, Please Check your email");
          } else if (
            res?.response?.data?.message ===
            "Error reading your school enrollment ID"
          ) {
            setLoading(false);
            toast.error("Incorrect School enrollment ID");
          } else if (
            res?.response?.data?.message === undefined ||
            "undefined"
          ) {
            setLoading(false);
            toast.error("Poor Internet Connectivity");
          } else {
            setLoading(false);
            toast.error(`${res?.response?.data?.message}`);
          }
        }
      });
  };

  useEffect(() => {
    if (token) {
      const { id }: any = jwtDecode(token);
      verifySchool(id);
    }
  });

  return (
    <div className=" freshh w-full h-full flex flex-col justify-center items-center ">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mb-10 text-center flex items-center w-full flex-col">
        <Link to="/">
          <img className="mb-5 w-56 h-28 object-contain" src={logo} />{" "}
        </Link>{" "}
        <div className="text-[26px] font-bold mb-3 text-blue-900">
          Welcome Back
        </div>
        <div className="text-[14px] -mt-4">
          {" "}
          Sign in now to continue your Experience.
        </div>
      </div>

      <div
        className="rounded-md bg-white min-h-[300px] w-[80%] md:w-[500px] border  p-4"
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
          placeholder="School Enrollment ID"
          className="w-[97%]"
          show
          //   errorText="Password has to be passed"
          errorText={password && "Please ensure your ID is correct!"}
          required
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />

        <div>
          <Button
            name={loading ? "Loading..." : "Login"}
            className="w-[97%] bg-blue-900 text-white h-14 hover:bg-blue-800 transition-all duration-300"
            type="submit"
            onClick={handleSubmit}
            icon={loading && <ClipLoader color="white" size={18} />}
            style={{ fontSize: "18px" }}
          />

          <div className="flex gap-[9px] md:gap-5 items-center flex-col sm:flex-row mt-5 mx-3 justify-between">
            <Link
              to="/auth/student-login"
              className="hover:bg-blue-50 hover:scale-105 flex-1 transition-all duration-300 border px-5 py-3 rounded-md text-center"
            >
              <div className="text-[13px] ml-2 font-bold cursor-pointer">
                Switch to Student Login
              </div>
            </Link>
            <Link
              to="/auth/switch-login"
              className="hover:bg-blue-50 hover:scale-105 transition-all duration-300 border px-5 py-3 rounded-md text-center flex-1"
            >
              <div className="text-[13px] ml-2 font-bold cursor-pointer">
                Switch to Teacher Login
              </div>
            </Link>
          </div>
        </div>
        {/* <div className="mt-10 ml-[10px] mb-3 mx-2 text-[13px] font-medium flex  justify-between ">
          <div>Or Sign up with google</div>
        </div>
        <div className="flex flex-col">
          <button className="ml-[10px] h-14 px-3 flex items-center  border-[2px] border-black rounded-md text-[#ababab] bg-slate-900 transition-all duration-300 font-medium leading-tight w-[97%] text-center text-[12px] sm:text-base hover:scale-105">
            <img
              src={google}
              alt="google_logo"
              className="w-[20%] h-full object-contain"
            />
            <p>Continue with Google (coming soon) </p>
          </button>
        </div> */}
      </div>
      <div className="mt-5 pb-[20px] text-[13px] w-[250px] sm:w-[350px] md:w-auto text-center">
        Don’t have an account with us?{" "}
        <span className="font-bold ml-2 text-blue-900">
          <Link to="/auth">Register here</Link>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
