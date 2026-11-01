import { MdOutlineSecurity } from "react-icons/md";
import PasswordInput from "../../../components/reUse/PasswordIput";
import { useTeacherInfo } from "../../hooks/useTeacher";

const PasswordSecurity = () => {
  const { teacherInfo } = useTeacherInfo();
  return (
    <div className="overflow-hidden">
      {/* Terms and Guidelines */}
      <div className="mt-5 p-4 xl:w-[900px] bg-gray-200 transition-all duration-300 rounded-md shadow-sm">
        <h4 className="font-semibold mb-5 text-[18px] sm:text-[20px] flex items-center gap-2">
          <MdOutlineSecurity />{" "}
          <span className="text-blue-950 font-extrabold">NEXT</span> Security
          Guidelines
        </h4>
        <div className="mb-5 bg-gray-200 transition-all duration-300 font-medium ">
          At<span className="font-semibold"> NEXT</span>, We highly recommend
          logging in using your School Employment ID. This method is not only
          more convenient but also more secure, as it eliminates the need to
          frequently update your password, which is typically required when
          using email and password logins. By opting for your Employment ID,
          you’ll streamline your login process while maintaining the highest
          level of security, ensuring a smoother experience for you as a valued
          member of our team.
        </div>

        <ul className="ml-5 list-disc text-gray-700 text-sm">
          <li className="mb-2">
            Passwords must be changed regularly to enhance your account
            security.
          </li>
          <li className="mb-2">
            Never share your password with anyone, and avoid reusing passwords
            across multiple platforms.
          </li>
          <li className="mb-2">
            For additional protection, enable two-factor authentication (2FA)
            for your account.
          </li>
          <li className="mb-2">
            Your new password should be at least 8 characters long and include a
            mix of uppercase, lowercase, numbers, and special characters.
          </li>
        </ul>
      </div>

      <div className="border my-10" />
      <div className="my-5 text-[17px] font-medium">
        Your Current Employment ID ={" "}
        <span className="text-[20px] font-bold">
          {teacherInfo?.enrollmentID}
        </span>
      </div>
      <div className="lg:flex lg:gap-4 items-start">
        {/* Step 1: Confirm Older Password */}
        <div className="mb-4 lg:mb-0">
          <div>Step 1</div>
          <div className="mb-3 font-semibold">Confirm Older Password</div>
          <div className="p-4 min-h-[250px] xl:w-[450px] bg-gray-100 transition-all duration-300 rounded-md shadow-sm">
            <h3 className="ml-3 mb-5 font-semibold text-[17px]">
              Input your current password
            </h3>
            <PasswordInput
              placeholder="Current Password"
              className="bg-white rounded-md w-[240px] sm:w-[340px]"
            />
            <p className="ml-3 text-sm text-gray-600">
              For your security, please enter your current password to verify
              your identity before making any changes.
            </p>
            <button className="ml-3 mt-4 rounded-md py-2 px-3 bg-neutral-400 text-white transition-all duration-300 hover:scale-105 cursor-not-allowed">
              Confirm(...coming soon)
            </button>
          </div>
        </div>

        {/* Step 2: Add New Password */}
        <div>
          <div>Step 2</div>
          <div className="mb-3 font-semibold">Add New Password</div>
          <div className="p-4 min-h-[250px] xl:w-[450px] bg-gray-100 transition-all duration-300 rounded-md shadow-sm">
            <h3 className="ml-3 mb-5 font-semibold text-[17px]">
              Input your new password
            </h3>
            <PasswordInput
              placeholder="New Password"
              className="bg-white rounded-md w-[240px] sm:w-[340px]"
            />
            <p className="ml-3 text-sm text-gray-600 mt-2">
              Ensure that your new password is unique and hasn't been used
              before.
            </p>
            <button className="ml-3 mt-4 rounded-md py-2 px-3 bg-neutral-400 text-white transition-all duration-300 hover:scale-105 cursor-not-allowed">
              Update (...coming soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSecurity;
