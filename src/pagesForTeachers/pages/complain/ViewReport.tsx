import LittleHeader from "../../../components/static/LittleHeader";
import pix from "../../../assets/pix.jpg";
import { useComplain, useTeacherInfo } from "../../hooks/useTeacher";
import { FaCheckDouble } from "react-icons/fa6";
import { FC } from "react";
import moment from "moment";

const ViewReport: FC = () => {
  const { teacherInfo } = useTeacherInfo();
  const { complainData } = useComplain(teacherInfo?._id);

  return (
    <div>
      <LittleHeader name={"Report and Complaints"} />

      <div className="mb-28" />

      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden"
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1090px] flex gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[80px] border-r">Resolved</div>
          <div className="w-[200px] border-r">Name</div>
          <div className="w-[100px] border-r">Status</div>
          <div className="w-[400px] border-r">Complaints</div>
          <div className="w-[100px] border-r">Urgency</div>
          <div className="w-[80px] border-r">Mark as Seen</div>
          <div className="w-[80px] border-r">Mark as Resolved</div>
        </div>

        {complainData?.length > 0 ? (
          <div className="w-[1090px] overflow-hidden">
            {complainData.map((props: any, i: number) => (
              <div
                key={props._id}
                className={`w-full flex items-center gap-2 text-[12px] font-medium min-h-16 px-4 my-2 overflow-hidden ${
                  i % 2 === 0 ? "bg-slate-50" : "bg-white"
                }`}
              >
                <div className="w-[80px] border-r">
                  <label>
                    <input
                      checked={props?.resolve}
                      type="checkbox"
                      className="checkbox"
                      readOnly
                    />
                  </label>
                </div>

                <div className="w-[200px] border-r">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={teacherInfo?.avatar || pix}
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{teacherInfo?.staffName}</div>
                      <div className="text-[12px] opacity-50">
                        {teacherInfo?.classesAssigned
                          ?.map((cls: any) => cls.className)
                          .join(", ")}{" "}
                        Teacher
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[100px] border-r ml-1">Teacher</div>

                <div className="w-[400px] py-2 flex justify-start border-r font-normal">
                  {props?.title}
                </div>

                <div className="w-[100px] border-r">{props?.importance}</div>

                <div className="w-[80px] border-r pl-6">
                  <label>
                    <input
                      checked={props?.seen}
                      type="checkbox"
                      className="checkbox checkbox-error"
                      readOnly
                    />
                  </label>
                </div>

                <div className="w-[80px] border-r pl-6">
                  <label>
                    <input
                      checked={props?.resolve}
                      type="checkbox"
                      className="checkbox checkbox-warning"
                      readOnly
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FaCheckDouble />
            <p className="mt-2 text-[15px]">
              You haven't reported any complaints yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReport;
