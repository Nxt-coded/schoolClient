import LittleHeader from "../../../components/static/LittleHeader";
import pix from "../../../assets/pix.jpg";
import { useComplain, useSchoolData } from "../../hook/useSchoolAuth";
import { FC } from "react";
import {
  useStudentInfo,
  useStudentInfoData,
} from "../../../pagesForStudents/hooks/useStudentHook";
import {
  useTeacherDetail,
  useTeacherInfo,
} from "../../../pagesForTeachers/hooks/useTeacher";
import { markResolveComplains, markSeenComplains } from "../../api/schoolAPIs";
import toast from "react-hot-toast";
import { mutate } from "swr";

interface iProps {
  props?: any;
}

const ReporterDetail: FC<iProps> = ({ props }) => {
  const { studentInfoData } = useStudentInfoData(props);
  const { data } = useSchoolData();
  const { teacherDetail } = useTeacherDetail(props);

  return (
    <div className="flex items-center">
      <div className={`w-[200px] border-r `}>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={
                  teacherDetail?.avatar
                    ? teacherDetail?.avatar
                    : studentInfoData?.avatar
                    ? studentInfoData?.avatar
                    : pix
                }
                alt="Avatar"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">
              {teacherDetail?.staffName
                ? teacherDetail?.staffName
                : `${studentInfoData?.studentFirstName} ${studentInfoData?.studentLastName}`}
            </div>
            <div className="text-[10px] font-semibold opacity-50 flex flex-wrap gap-1 ">
              {teacherDetail?.classesAssigned
                ? teacherDetail?.classesAssigned?.map((el: any) => (
                    <div className="pr-2 border-r-2">{el.className}</div>
                  ))
                : studentInfoData?.classAssigned}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100px] border-r ml-2">
        {teacherDetail
          ? teacherDetail?.status.split("-")[1]
          : studentInfoData?.status.split("-")[1]}
      </div>
      {/* name */}
    </div>
  );
};

const ViewReport = () => {
  // const data = Array.from({ length: 7 });

  const { data } = useSchoolData();
  const { complainData } = useComplain(data?._id);

  return (
    <div>
      <LittleHeader name={"Report and Complains"} />

      <div className="mb-28" />

      <div className="mb-28" />

      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1090px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[80px] border-r">Resolved</div>

          <div className="w-[200px] border-r">Name</div>
          <div className="w-[100px] border-r">Status</div>

          <div className="w-[400px] border-r">Complains</div>
          <div className="w-[100px] border-r">Urgency</div>

          <div className="w-[80px] border-r">Make as seen</div>

          <div className="w-[80px] border-r">Make as Resolved</div>
        </div>

        <div className=" w-[1090px] overflow-hidden ">
          {complainData?.map((props: any, i: number) => (
            <div>
              <div>
                <div
                  key={props}
                  className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="w-[80px] border-r">
                    <label>
                      <input
                        checked={props?.resolve}
                        type="checkbox"
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <ReporterDetail props={props.reporterID} />

                  <div className="w-[400px] py-2 flex justify-start border-r font-normal ml-2">
                    {props?.title}
                  </div>
                  <div className="w-[100px] border-r">{props?.importance}</div>
                  <div className="w-[80px] border-r pl-6 ">
                    <label
                      onClick={() => {
                        markSeenComplains(data?._id, props?._id).then(
                          (res: any) => {
                            if (res.status === 201) {
                              mutate(`api/view-school-complain/${data?._id}`);
                              toast.success("complain has been marked as Seen");
                            } else {
                              toast.error("something went wrong");
                            }
                          }
                        );
                      }}
                    >
                      <input
                        checked={props?.seen}
                        type="checkbox"
                        className="checkbox checkbox-error"
                      />
                    </label>
                  </div>
                  <div className="w-[80px] border-r  pl-6">
                    <label
                      onClick={() => {
                        markResolveComplains(data?._id, props?._id).then(
                          (res: any) => {
                            if (res.status === 201) {
                              mutate(`api/view-school-complain/${data?._id}`);
                              toast.success("complain has been resolved");
                            } else {
                              toast.error("something went wrong");
                            }
                          }
                        );
                      }}
                    >
                      <input
                        checked={props?.resolve}
                        type="checkbox"
                        className="checkbox checkbox-warning "
                      />
                    </label>
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

export default ViewReport;
