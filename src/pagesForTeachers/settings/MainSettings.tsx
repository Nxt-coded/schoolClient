import { useState } from "react";
import LittleHeader from "../components/layout/LittleHeader";
import ProfileSettings from "./InsideMainSettings/ProfileSettings";
import SocialsSettings from "./InsideMainSettings/SocialsSettings";
import PasswordSecurity from "./InsideMainSettings/PasswordSecurity";

const MainSettings = () => {
  const [activeSection, setActiveSection] = useState("My Profile");

  return (
    <div>
      <LittleHeader name={"Settings"} back />

      <div>
        <div className="flex justify-start items-center gap-[20px] border-b transition-all duration-300">
          <div
            onClick={() => setActiveSection("My Profile")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "My Profile"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1 className="mb-3 text-[13px] md:text-[19px]">My Profile</h1>
          </div>
          <div
            onClick={() => setActiveSection("My Socials")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "My Socials"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1 className="mb-3 text-[13px] md:text-[19px]">My Socials</h1>
          </div>
          <div
            onClick={() => setActiveSection("Password and Security")}
            className={`h-full cursor-pointer transition-all duration-300 ${
              activeSection === "Password and Security"
                ? "border-b-[2px] border-blue-950 font-medium text-blue-950"
                : "border-transparent"
            }`}
          >
            <h1 className="mb-3 text-[13px] md:text-[19px]">
              Password and Security
            </h1>
          </div>
        </div>

        {/* SETTINGS DIVS */}

        {activeSection === "My Profile" && (
          <div className="mt-5 min-h-[60vh] freshh">
            <ProfileSettings />
          </div>
        )}

        {activeSection === "My Socials" && (
          <div className="mt-5 min-h-[60vh] freshh">
            <div>
              <SocialsSettings />
            </div>
          </div>
        )}
        {activeSection === "Password and Security" && (
          <div className="mt-5 min-h-[60vh] freshh">
            <div>
              <PasswordSecurity />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSettings;
