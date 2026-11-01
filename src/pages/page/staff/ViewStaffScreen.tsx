document.title = "View Staff";
// import moment from "moment";
import { useDispatch } from "react-redux";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import { displayDelay, displayStaffComp } from "../../../global/reduxState";
import { Link } from "react-router-dom";
import { useSchoolCookie, useSchoolTeacher } from "../../hook/useSchoolAuth";
import moment from "moment";
import { useTeacherNote } from "../../../pagesForTeachers/hooks/useTeacher";
import { FC, useEffect, useState } from "react";
import Input from "../../../components/reUse/Input";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

import { bulkUploadofClassroom, bulkUploadofTeachers, deleteStaff } from "../../api/schoolAPIs";
import { FaSpinner } from "react-icons/fa6";

interface iProps {
  props: string;
}

const TeacherRating: FC<iProps> = ({ props }) => {
  const { teacherNote } = useTeacherNote(props);

  let ratingData = teacherNote?.lessonNotes
    ?.map((el: any) => {
      return el?.rateData;
    })
    .flat()
    .map((el: any) => {
      return parseInt(el?.rate);
    });

  return (
    <div>
      {parseFloat(
        (
          ratingData?.reduce((a: number, b: number) => {
            return a + b;
          }, 0) / ratingData?.length
        ).toFixed(2)
      )
        ? parseFloat(
            (
              ratingData?.reduce((a: number, b: number) => {
                return a + b;
              }, 0) / ratingData?.length
            ).toFixed(2)
          )
        : 0}
    </div>
  );
};

const ViewStaffScreen = () => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchStaff, setStaffSearch] = useState("");

const { mutate } = useSchoolTeacher();

  const handleDisplayStaff = () => {
    if (!document.startViewTransition) {
      dispatch(displayStaffComp(true));
      dispatch(displayDelay(true));
    } else {
      document.startViewTransition(() => {
        dispatch(displayDelay(true));
        dispatch(displayStaffComp(true));
      });
    }
  };

  // Delete Staff Function

  // getting schoolID
  const schoolID = useSchoolCookie().dataID;

  const handeDeleteStaff = (staffID) => {
    try {
      setLoading(true);
      setShowButton(true);
      deleteStaff(schoolID, staffID).then((res) => {
        if (res.status === 200) {
          console.log(res);
          toast.success("Staff Has Been Successfully Deleted");
        }
      });
    } catch (error) {
      toast.error("Error In Deleting Staff");
      console.log(error);
    } finally {
      setLoading(false);
      setShowButton(false);
    }
  };

  const { schoolTeacher } = useSchoolTeacher();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaffSearch(e.target.value);
  };

  const sortedStaffs = schoolTeacher?.staff?.sort((a, b) =>
    a.staffName?.localeCompare(b.staffName)
  );

  const filteredTeacher = sortedStaffs?.filter((staff: any) => {
    const fullName = `${staff.staffName}`.toLowerCase();
    return fullName.includes(searchStaff.toLowerCase());
  });

  const [valueStored, setValueStored] = useState<Array<string>>([]);

  useEffect(() => {}, [valueStored]);

  const [file, setFile] = useState<any>();
  const [toggle, setToggle] = useState(false);
  
  const handleBulkClassroom = () => {
    setToggle(true);
    const formData = new FormData();
    formData.append("file", file);

    bulkUploadofTeachers(schoolID, formData)
      .then(() => {
        toast.success("Teachers data Have Been Successfully Imported");
        mutate(`api/view-school-teacher/${schoolID}`);
      })
      .finally(() => {
        setToggle(false);
      });
  };

  return (
    <div className="">
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"viewing all Staff"} />

      <div className="mt-10" />

      <div className="flex w-full justify-between items-start">
        <Input
          placeholder="Search Staff Name"
          className="ml-0"
          value={searchStaff}
          onChange={handleSearch}
        />

        <div className="flex flex-wrap gap-2 items-center justify-end">
          {file ? (
            <Button
              name={
                toggle ? (
                  <div className="flex items-center gap-2 duration-300 transition-all">
                    <FaSpinner className="animate-spin text-[18px]" />
                    <span>Uploading Data</span>
                  </div>
                ) : (
                  "Add file to Student"
                )
              }
              className="uppercase lg:text-[12px] text-[9px] font-medium bg-red-500 py-2 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-red-600 cursor-pointer transition-all duration-300"
              onClick={handleBulkClassroom}
            />
          ) : (
            <label
              htmlFor="file"
              className="uppercase lg:text-[12px]font-medium bg-neutral-950 py-2 sm:py-4 md:py-2 lg:py-4 md:px-4 hover:bg-neutral-900 cursor-pointer transition-all duration-300 px-5 border rounded-md m-2 overflow-hidden flex items-center justify-center text-white  md:text-[13px] text-[11px]"
            >
              upload Teachers Data
              <input
                id="file"
                type="file"
                accept=".csv"
                className="hidden"
                hidden
                onChange={(e: any) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
          )}

          <Button
            name="Add a new Recruit"
            className="lg:uppercase lg:text-[12px] text text-[10px] font-medium bg-blue-950 py-2 px-2 sm:py-4 md:py-2 lg:py-4 md:px-8 hover:bg-blue-900 cursor-pointer transition-all duration-300"
            onClick={handleDisplayStaff}
          />
        </div>
      </div>
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[2060px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[50px] border-r">S/N</div>
          <div className="w-[90px] border-r">Staff Image</div>
          <div className="w-[200px] border-r">Staff Name</div>
          <div className="w-[130px] border-r">Reg. Date</div>
          <div className="w-[80px] border-r">Status</div>
          <div className="w-[100px] border-r">Gender</div>
          <div className="w-[100px] border-r">Attendance Ratio</div>

          <div className="w-[100px] border-r">Staff Role</div>

          <div className="w-[150px] border-r">Phone</div>
          <div className="w-[200px] border-r">Contact </div>
          <div className="w-[200px] border-r">Subjects Taking</div>
          <div className="w-[200px] border-r">Class Handle</div>
          <div className="w-[80px] border-r">Rate</div>
          <div className="w-[180px] border-r">Action</div>
          <div className="w-[180px] border-r">Staff Action</div>
        </div>

        <div className=" w-[2060px] overflow-hidden">
          {filteredTeacher?.map((props: any, i: number) => (
            <div key={props} className="transition-all duration-300">
              <div>
                <div
                  className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 py-2 my-2  overflow-hidden ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  {/* start */}

                  <div className="w-[50px] border-r">{i + 1}</div>
                  {/* Image and Name */}
                  <div className="w-[90px] flex justify-start border-r">
                    <img
                      className="w-14 h-14 rounded-md border object-cover"
                      src={props?.avatar ? props?.avatar : pix}
                    />
                  </div>
                  <div className="w-[200px] border-r">
                    {props?.staffName}

                    <div className="text-slate-500">
                      ID: {props?.enrollmentID}
                    </div>
                  </div>
                  <div className="w-[130px] border-r">
                    {moment(props?.createdAt)?.format("ll")}
                  </div>

                  <div
                    className={`w-[80px] border-r ${
                      props?.activeStatus ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {props?.activeStatus ? "Active" : "Idle"}
                  </div>

                  <div className="w-[100px] border-r">
                    {props?.gender ? (
                      <div>{props?.gender}</div>
                    ) : (
                      <div>gender not added</div>
                    )}
                  </div>
                  <div className="w-[100px] border-r">2:10</div>

                  {/* check */}
                  <div className="w-[100px] border-r  ">{props?.staffRole}</div>
                  <div className="w-[150px] border-r  ">
                    {props?.phone
                      ? props?.phone
                      : "Phone Number Not Yet Assigned"}
                  </div>

                  <div className="w-[200px] border-r  ">
                    {props?.staffAddress
                      ? props?.staffAddress
                      : "Address Not Yet Assigned"}
                  </div>

                  {/* check II */}

                  <div className="w-[200px] border-r h-16 py-4 overflow-x-auto">
                    {props?.subjectAssigned?.length > 0 ? (
                      <div className="">
                        {props?.subjectAssigned?.map((props: any) => (
                          <div className="gap-2">
                            <p>
                              {props?.title}: {props?.classMeant}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      "Not Yet Assigned"
                    )}
                  </div>

                  {/*good  */}
                  <div className="w-[200px] border-r">
                    {props?.classesAssigned ? (
                      <div className="">
                        <p className="flex flex-wrap">
                          {props?.classesAssigned?.map((el: any) => (
                            <div className=" m-1 px-2 text-[10px] font-semibold text-white bg-blue-950 py-1 border rounded-full">
                              {el.className}
                            </div>
                          ))}
                        </p>
                      </div>
                    ) : (
                      "Not Yet Assigned"
                    )}
                  </div>

                  <div className="w-[80px] border-r">
                    <TeacherRating props={props?._id} />
                  </div>

                  <Link
                    to={`staff-details/${props?._id}`}
                    className="w-[180px] border-r"
                  >
                    <Button
                      name="View Detail"
                      className="py-3 w-[85%] hover:scale-105 bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                      onClick={() => {}}
                    />
                  </Link>

                  <div
                    className="w-[180px] border-r"
                    onClick={() => {
                      valueStored.push(props?._id);
                    }}
                  >
                    <div>
                      <label
                        htmlFor="my_modal_delete"
                        className="py-3 px-1 w-[85%] border rounded-md bg-red-500 text-[12px] text-white transition-all duration-300 hover:scale-105 cursor-pointer inline-block text-center"
                      >
                        Delete Staff
                      </label>
                    </div>
                    <input
                      type="checkbox"
                      id="my_modal_delete"
                      className="modal-toggle"
                    />
                    <div className="modal modal-middle">
                      <div className="modal-box bg-white">
                        <h3 className="font-bold mb-3 text-lg text-center text-blue-950">
                          Staff Deletion Notice
                        </h3>
                        <div className="mb text-blue-950">
                          <p className="mb-3">
                            You are about to permanently delete a staff record
                            from your database. This action is irreversible and
                            cannot be undone, and will result in the complete
                            removal of all associated data, including employment
                            history, contact information, and every other staff
                            detail
                          </p>
                          <div className="flex items-center justify-center gap-3 font-semibold  text-[15px]">
                            <p>
                              If{" "}
                              <span className="text-red-500 text-[20px]">
                                YES
                              </span>{" "}
                              continue,
                            </p>
                            <p className="">
                              If <span className="text-[20px]">NO</span> cancel.
                            </p>
                          </div>
                        </div>
                        <div className="modal-action flex items-center">
                          {loading ? (
                            <Button
                              name="Deleting Staff.."
                              className="px-3 py-1  bg-red-500 text-[15px] text-white transition-all duration-300 hover:scale-105"
                              icon={
                                loading && (
                                  <ClipLoader color="white" size={18} />
                                )
                              }
                            />
                          ) : (
                            showButton && (
                              <Button
                                name="Delete Staff"
                                className="px-3 py-3 bg-red-500 text-[15px] text-white transition-all duration-300 hover:scale-105"
                                onClick={() => handeDeleteStaff(valueStored[1])}
                              />
                            )
                          )}
                          {showButton ? (
                            <label
                              htmlFor="my_modal_delete"
                              className="btn text-white py-4 px-6 bg-blue-950 border hover:bg-blue-950 scale-105"
                              onClick={() => {
                                setValueStored([]);
                              }}
                            >
                              Cancel
                            </label>
                          ) : (
                            <label
                              htmlFor="my_modal_delete"
                              className="btn text-white py-4 px-6 bg-blue-950 border hover:bg-blue-950 scale-105"
                              onClick={() => {
                                setValueStored([]);
                                setShowButton(true);
                              }}
                            >
                              Close
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewStaffScreen;
