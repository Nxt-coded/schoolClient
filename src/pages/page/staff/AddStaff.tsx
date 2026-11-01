import { useState } from "react";
import Input from "../../../components/reUse/Input";
import Button from "../../../components/reUse/Button";
import { createSchoolTeacher } from "../../api/schoolAPIs";
import { useSchoolData } from "../../hook/useSchoolAuth";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  displayDelay,
  displayStaffComp,
  displayStudent,
} from "../../../global/reduxState";
import ClipLoader from "react-spinners/ClipLoader";
import LittleHeader from "../../../components/layout/LittleHeader";
import { MdClose } from "react-icons/md";
import { mutate } from "swr";

const AddStaff = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [assignedSubject, setAssignedSubject] = useState<string>("");
  const [assignedRole, setAssignedRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");

  const { data } = useSchoolData();

  const createNewStaff = () => {
    setLoading(true);

    createSchoolTeacher(data?._id, {
      staffName: name,
      staffAddress: location,
      subjectTitle: assignedSubject,
      role: assignedRole,
      salary: parseInt(salary),
      gender,
    }).then((res) => {
      if (res.status === 201) {
        mutate(`api/view-school-teacher/${data?._id}`);
        setLoading(false);
        toast.success("staff registered successful");
        dispatch(displayDelay(false));
        const timing = setTimeout(() => {
          dispatch(displayStudent(false));

          clearTimeout(timing);
        }, 500);
      } else {
        setLoading(false);
        toast.error(`${res.response.data.message}`);
      }
    });
  };

  return (
    <div className="top-0 lg:w-[100%] md:w-[100%] w-[100%] right-0 absolute h-full overflow-x-auto">
      <div className="px-4 h-full top-0 mb-8  ">
        <div className="mt-20" />
        <div className="flex justify-between items-center">
          <LittleHeader name={"Add New Staff"} />

          <MdClose
            className="cursor-pointer w-10 h-10 p-2 rounded-full hover:rotate-90 transition-all duration-300 hover:bg-slate-50"
            onClick={() => {
              dispatch(displayDelay(false));
              const timing = setTimeout(() => {
                dispatch(displayStaffComp(false));

                clearTimeout(timing);
              }, 500);

              // setShow(!show);
            }}
          />
        </div>

        <Toaster position="top-center" reverseOrder={true} />

        <div className="rounded-md w-full h-[80%] p-4 mt-4">
          <div className="mt-10" />

          <div className="mt-1">
            <label className="text-[14px]" onClick={() => {}}>
              Staff Name
            </label>
            <Input
              placeholder="Enter Staff Name"
              className="ml-0 w-full"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mt-1 flex flex-col mb-6">
            <label className="text-[14px] mb-2">
              Gender:{" "}
              <span className="font-bold text-[10px]">Choose a Genders</span>
            </label>
            <select
              className="ml-0 select bg-gray-100 select-bordered w-full "
              value={gender}
              onChange={(e: any) => {
                setGender(e.target.value);
              }}
            >
              <option selected value="Choose a Genders">
                Choose a Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mt-1">
            <label className="text-[14px]">Staff Address</label>
            <Input
              placeholder="Enter Staff Address"
              className="ml-0 w-full"
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLocation(e.target.value);
              }}
            />
          </div>
          <div className="mt-1">
            <label className="text-[14px]">Staff Salary</label>
            <Input
              placeholder="120000"
              className="ml-0 w-full"
              value={salary}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSalary(e.target.value);
              }}
            />
          </div>
          {/* <div className="mt-1">
            <label className="text-[14px]">Staff Taking Subject</label>
            <Input
              placeholder="Enter Staff Taking Subject"
              className="ml-0 w-full"
              value={assignedSubject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAssignedSubject(e.target.value);
              }}
            />
          </div> */}
          <div className="mt-1">
            <label className="text-[14px]">Staff Role</label>
            <select
              className="ml-0 select bg-gray-100 select-bordered w-full "
              value={assignedRole}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setAssignedRole(e.target.value);
              }}
            >
              <option selected value="Choose Staff Role">
                Choose Staff Role
              </option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="mt-10" />

          <div className="w-full flex justify-center">
            <Button
              name={
                loading ? (
                  <div className="flex gap-2 items-center">
                    <ClipLoader color="#fff" size={20} />
                    <p>Loading</p>
                  </div>
                ) : (
                  "Register Staff"
                )
              }
              className="w-full mx-0 bg-blue-950 py-4"
              onClick={createNewStaff}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
