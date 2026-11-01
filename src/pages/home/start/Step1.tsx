import { useState } from "react";
import Input from "../../../components/reUse/Input";

const Step1 = () => {
  const [schoolName, setSchoolName] = useState<string>("");
  return (
    <div
      className="-top-0 w-full h-full left-0 absolute rounded-md flex flex-col items-center justify-center"
      style={{
        // background: "rgba(73, 154, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(0, 45, 100, 0.3)",
      }}
    >
      <div>What's your school's Name</div>
      <Input
        // bg="#d9ebff"
        placeholder="School's Name"
        className="border"
        value={schoolName}
        onChange={(e) => {
          setSchoolName(e.target.value);
        }}
      />
    </div>
  );
};

export default Step1;
