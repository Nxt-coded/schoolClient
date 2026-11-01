import { FC, useEffect, useState } from "react";
import {
  approveRegisterationStatusUpdate,
  deleteSchool,
} from "../../../../pages/api/schoolAPIs";
import { useAllSchools } from "../../../../pages/hook/useSchoolAuth";
import { FaDeleteLeft, FaSpinner } from "react-icons/fa6";
import { MdClose, MdDeleteForever } from "react-icons/md";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";

interface iPropsCard {
  text?: string;
  logo: string;
  setTotalSchools: (total: number) => void;
  setTotalTeachers: (total: number) => void;
  setTotalStudents: (total: number) => void;
}

const CompanyCard: FC<iPropsCard> = ({
  logo,
  setTotalSchools,
  setTotalTeachers,
  setTotalStudents,
}) => {
  const { allSchool } = useAllSchools();

  const unverifiedSchools = allSchool?.filter((school: any) => !school?.verify);

  const verifiedSchools = allSchool?.filter((school: any) => school?.verify);

  const [toggle, setToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [schoolMain, setSchoolMain] = useState<string>("");

  const renderSchoolRow = (school: any) => (
    <tr key={school?._id}>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex justify-start gap-2 items-center">
        {/* <img
          src={logo}
          alt=""
          className="w-[50px] h-[20px] object-contain rounded-lg mt-2"
        /> */}
        <div className="uppercase text-blue-950 text-[14px] mt-2">
          <div>{school.schoolName}</div>
          <p className="mt-4 text-[12px] font-medium normal-case">
            EnrollmentID: {school?.enrollmentID}
          </p>
          <p className="mt- text-[12px] font-medium normal-case">
            Admin Code: {school?.adminCode}
          </p>
          <p className="mt-4 text-[12px] font-medium normal-case">
            Total Students: {school?.students?.length}
          </p>
          <p className="mt- text-[12px] font-medium normal-case">
            Total Staffs: {school?.staff?.length}
          </p>
        </div>
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {school.email}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {school.address}
      </td>
      <td className="border-t-0 px-6 mt-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {school.phone}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
        <p className={`text-${school.verify ? "green" : "red"}-400`}>
          {school.verify ? "Onboard" : "Not Onboard"}
        </p>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <button
          className={`w-24 h-9 text-white rounded ${
            school.verify ? "bg-green-600" : "bg-red-600"
          }`}
          onClick={() => {
            setToggle(true);

            approveRegisterationStatusUpdate(school?._id)
              .then((res) => {
                console.log(res);
                mutate(`api/view-all-school`);
              })
              .finally(() => {
                setToggle(false);
              });
          }}
        >
          {school.verify ? (
            "Verified"
          ) : (
            <div className="flex items-center justify-center">
              {toggle ? (
                <div>
                  <FaSpinner className="text-white animate-spin" />
                </div>
              ) : (
                "Verify"
              )}
            </div>
          )}
        </button>
      </td>

      <td>
        <label htmlFor="my_modal_6" className="">
          <div
            className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded-sm gap-2 cursor-pointer"
            onClick={() => {
              setSchoolMain(school?._id);
            }}
          >
            <MdDeleteForever className="text-white text-[20px] " />
            <span>Delete</span>
          </div>
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-red-500 border-b pb-5">
                Are you sure you want to do this?
              </h3>
              <label
                htmlFor="my_modal_6"
                className="flex w-8 h-8 bg-red-400 rounded-full items-center justify-center cursor-pointer -mt-5"
              >
                <MdClose size={20} className="text-white" />
              </label>
            </div>
            <p className="py-4">
              By click the delete button below... You are doing to delete all
              data pertaining to this school
              <br />
              <br />
              <br />
              <span className="uppercase font-semibold text-blue-950">
                {" "}
                is this an action you wish to carry out?
              </span>
            </p>

            <div className="modal-action">
              <label
                htmlFor="my_modal_6"
                className="btn btn-error text-white px-8"
                onClick={() => {
                  setLoading(true);
                  deleteSchool(schoolMain)
                    .then((res) => {
                      if (res.status === 201) {
                        mutate(`api/view-all-school`);
                        toast.success("School Delete Successfully");
                      }
                    })
                    .finally(() => {
                      setLoading(false);
                      setSchoolMain("");
                    });
                }}
              >
                Delete School
              </label>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <Toaster />
      <p className="font-bold pl-5 text-xl">New School</p>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-2 overflow-y-auto mt-3">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Unverified Schools
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-blue-950 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  School Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Address
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Phone
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Verify
                </th>
              </tr>
            </thead>
            <tbody>
              {unverifiedSchools?.length > 0 ? (
                unverifiedSchools?.map(renderSchoolRow)
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    Loading school data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-bold pl-5 text-xl text-green-500 pt-3">
        Approve School
      </p>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-2 mt-4 overflow-y-auto">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Verified Schools
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-blue-950 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  School Info
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Address
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Phone
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Verify
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {verifiedSchools?.length > 0 ? (
                verifiedSchools?.map(renderSchoolRow)
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    Loading school data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
