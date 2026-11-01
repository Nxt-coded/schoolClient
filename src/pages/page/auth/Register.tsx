import { useState } from "react";
import Button from "../../../components/reUse/Button";
import Input from "../../../components/reUse/Input";
import { FaGoogle } from "react-icons/fa6";
import google from "../../../assets/socials/google_logosvg.svg";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { googleAuth, registerSchool } from "../../api/schoolAPIs";
import logo from "../../../assets/mainLogo.png";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getEntryEmail } from "../../../global/reduxState";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (email !== "" && email.includes("@")) {
      registerSchool(email?.trim()).then((res) => {
        if (res.status === 201) {
          dispatch(getEntryEmail(email));
          setLoading(false);
          toast.success("Email Registered");
          navigate("/auth/enquiry-form");
        } else {
          setLoading(false);
          toast.error(
            `${
              res?.response?.data?.data.includes("duplicate")
                ? "Email has Already been used before!"
                : res?.response?.data?.mwssage
            }`
          );
        }
      });
    } else {
      setLoading(false);
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <div className=" w-full pt-[100px] md:pt-[150px] flex flex-col justify-center items-center freshh">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mb-10 text-center flex items-center w-full flex-col">
        <Link to="/">
          <img className="mb-5 w-56 h-28 object-contain" src={logo} />{" "}
        </Link>

        <div className="text-[26px] font-bold mb-3">Create an Account</div>
        <div className=" w-[270px] sm:w-[350px] md:w-auto text-[14px] -mt-4">
          Sign up today for instant access and start with a free account.
        </div>
      </div>

      <form
        className="rounded-md min-h-[300px] w-[80%] md:w-[500px] border-[2px] p-4"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Email"
          className="w-[97%]"
          type="email"
          required
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        {/* <div className="mx-4 flex items-center gap-3">
          <input
            checked={check}
            type="checkbox"
            onClick={() => {
              setCheck(!check);
            }}
          />

          <label className="text-[12px] leading-tight">
            By checking on the box, you've gone through our Privacy and Data
            Protection Policy!{" "}
          </label>
        </div> */}

        <div>
          {/* {check ? ( */}
          <Button
            name="Register"
            className="text-[15px] w-[97%] bg-blue-900 text-white h-14 hover:bg-blue-800 transition-all duration-300"
            type="submit"
            icon={loading && <ClipLoader color="white" size={18} />}
            // onClick={handleSubmit}

            style={{ fontSize: "18px" }}
          />
        </div>
        <div className="mt-10 mb-2 ml-2 text-[13px] font-medium ">
          Or Sign up with google
        </div>
        <div className="ml-[10px] flex flex-col">
          <button
            className="justify-center h-14 px-3 flex items-center border-[2px] border-black rounded-md text-white bg-slate-900 transition-all duration-300 font-medium leading-tight w-[98%] text-center text-[12px] sm:text-base  hover:bg-slate-800"
            onClick={() => {
              const URL: string = "https://just-next-be1.onrender.com/api";

              window.location.replace(
                `${"https://just-next-be1.onrender.com/api"}/auth/google`
              );
            }}
          >
            <img
              src={google}
              alt="google_logo"
              className="w-[20%] h-full object-contain"
            />
            <p>Continue with Google</p>
          </button>
        </div>
      </form>

      <div className="mt-5 mb-[35px] sm:mb-[70px] text-[13px] text-center w-[250px] sm:w-[350px] md:w-auto">
        Already have an Account with us?
        <span className="font-bold ml-2 text-blue-900">
          <Link to="/auth/login">Login here</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
