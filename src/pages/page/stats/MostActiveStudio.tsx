import { FC } from "react";
import pix from "../../../assets/pix.jpg";
import { useSchoolData, useSchoolStudents } from "../../hook/useSchoolAuth";
import {
  useReadMyClassInfoData,
  useReadOneClassInfo,
} from "../../../pagesForStudents/hooks/useStudentHook";

interface iProps {
  props?: any;
}

const GetClassTeacher: FC<iProps> = ({ props }) => {
  const { oneClass } = useReadOneClassInfo(props);

  return <div>{oneClass?.classTeacherName}</div>;
};

const MostActiveScreen = () => {
  const { data } = useSchoolData();
  const { students } = useSchoolStudents(data?._id);

  return (
    <div className="py-6  rounded-md min-w-[300px]">
      {/* header */}

      <div className=" w-[800px] overflow-hidden">
        <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
          <div className="text-[gray] w-[700px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
            <div className="w-[200px] border-r">Gender</div>

            <div className="w-[200px] border-r">Student's Info</div>
            <div className="w-[100px] border-r">Class</div>
            <div className="w-[200px] border-r">Assign Teacher</div>
          </div>

          {students?.data?.students?.map((props: any, i: number) => (
            <div>
              {i <= 4 && (
                <div>
                  <div className=" w-[700px] overflow-hidden ">
                    <div>
                      <div>
                        <div
                          key={props}
                          className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
                            i % 2 === 0 ? "bg-slate-50" : "bg-white"
                          }`}
                        >
                          <div className="w-[200px] border-r capitalize">
                            {props?.gender}
                          </div>

                          <div className={`w-[200px] border-r `}>
                            <div className="flex gap-2">
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img
                                    src={props?.avatar ? props?.avatar : pix}
                                    alt="Avatar"
                                  />
                                </div>
                              </div>
                              <div className="text-[12px] leading-tight">
                                <p>{props?.studentFirstName}</p>
                                <p>{props?.studentLastName}</p>
                                <div className="mt-2" />
                                <p className="font-bold">
                                  {props?.totalPerformance}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="w-[100px] border-r">
                            {props?.classAssigned}
                          </div>

                          <div className="w-[200px] border-r">
                            <GetClassTeacher props={props?.presentClassID} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostActiveScreen;
