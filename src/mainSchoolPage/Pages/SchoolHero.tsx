import React, { FC } from "react";
import pix from "../../../public/pix.jpg";
import { IoIosStar } from "react-icons/io";
import _ from "lodash";
import {
  useSchoolStudentDetail,
  useSchoolTeacherDetail,
} from "@/pages/hook/useSchoolAuth";
const SchoolHero: FC<any> = ({ schoolInfo, schoolName }) => {
  const data = _.shuffle(schoolInfo?.staff);
  const dataStudent = _.shuffle(schoolInfo?.students);

  const { schoolSubjectTeacherDetail } = useSchoolTeacherDetail(
    data[Math.round(Math.random() * data.length - 1)]
  );

  const { studentDetails } = useSchoolStudentDetail(
    dataStudent[Math.round(Math.random() * dataStudent.length - 1)]
  );

  return (
    <div className="pt-32 mx-5 md:mx-10 min-h-10 text-blue-950">
      <main className="p-4 border rounded-md  bg-gradient-to-r from-transparent to-indigo-600/10 ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 min-h-[600px]">
          <div className="col-span-1 md:col-span-2 ">
            <div className="flex-col lg:flex-row items-start gap-2 lg:items-center  flex justify-start ">
              <div className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2 border-white">
                {data?.slice(0, 5).map((el: any, i: number) => (
                  <TeacherImage key={i} el={el} />
                ))}
              </div>
              <div className="">
                <div className="flex gap-">
                  {Array.from({ length: 5 }).map((el: any, i: number) => (
                    <IoIosStar className="" key={i} />
                  ))}
                </div>
                <div className="text-black/40 font-medium capitalize">
                  Parent's rating and satisfaction
                </div>
              </div>
            </div>

            <p className="mt-10 text-[60px] md:text-[70px] leading-[1] italic">
              Your Child's Path to <br />
              <span className="font-semibold ">Greatness</span>
            </p>

            <p className="mt-5 text-[16px] md:text-[20px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
              inventore qui libero, voluptatum laudantium velit ab cupiditate
            </p>

            <div className="mt-6 flex gap-2 text-[13px] md:text-[14px]">
              <button className="cursor-pointer hover:bg-blue-950/90 transition-all duration-300 bg-blue-950 text-white rounded-full px-8 py-3">
                Get Started
              </button>
              <button className="cursor-pointer hover:bg-blue-950/10 transition-all duration-300 bg-white text-blue-950 rounded-full px-8 py-3 border border-blue-950">
                Contact Us
              </button>
            </div>
          </div>
          <div className="mt-10 md:mt-0 col-span-3 bg-gray-50 grid grid-co-1 md:grid-cols-2 gap-4">
            <div className="h-[500px] md:h-[600px] relative">
              <img
                src={
                  schoolSubjectTeacherDetail?.avatar
                    ? schoolSubjectTeacherDetail?.avatar
                    : pix
                }
                alt="images"
                className="h-[500px] md:h-[600px] w-full object-cover"
              />
              <p className="absolute bottom-2 left-4 text-[30px] font-semibold bg-white/70 px-3 py-1 leading-[1]">
                {schoolSubjectTeacherDetail?.staffName}
                <p className="text-[14px] mt-1 ">
                  {/* {schoolSubjectTeacherDetail?.classAssigned}  */}
                  Teacher
                </p>
              </p>
            </div>
            <div className="h-[500px] md:h-[600px] relative">
              <img
                src={
                  studentDetails?.data?.avatar
                    ? studentDetails?.data?.avatar
                    : pix
                }
                alt="images"
                className="h-[500px] md:h-[600px] w-full object-cover"
              />
              <p className="absolute bottom-2 left-4 text-[30px] font-semibold bg-white/70 px-3 py-1 leading-[1]">
                {studentDetails?.data?.studentFirstName}{" "}
                {studentDetails?.data?.studentLastName}
                <p className="text-[14px] mt-1 ">
                  {/* {schoolSubjectTeacherDetailstudentDetails?.classAssigned}  */}
                  Student
                </p>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchoolHero;

const TeacherImage: FC<any> = ({ el }) => {
  const { schoolSubjectTeacherDetail } = useSchoolTeacherDetail(el);

  return (
    <img
      src={
        schoolSubjectTeacherDetail?.avatar
          ? schoolSubjectTeacherDetail?.avatar
          : pix
      }
      className="w-12 h-12 object-cover bg-gray-200 border-2 border-white rounded-full "
    />
  );
};
