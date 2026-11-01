import girl1 from "../assets/mainimgs/Studygirl.jpeg";
import girl2 from "../assets/mainimgs/Laptopgirl.jpg";
import child from "../assets/mainimgs/Childyellowbg.jpg";
import { Link } from "react-router-dom";
import { FC } from "react";

interface iCardProps {
  text?: string;
  num: number;
  bgColor: string;
  module: string;
}

export const CardProps: FC<iCardProps> = ({ text, num, bgColor, module }) => {
  return (
    <div
      className={`h-full m-2 p-[15px] border full rounded-md ${bgColor} transform transition-transform duration-500 hover:scale-105 hover:shadow-xl`}
    >
      <div className="w-full flex justify-start">
        <h1 className="text-[30px] py-1 px-3 text-blue-950 mb-2 rounded-[50%] bg-white flex justify-center items-center">
          {num}
        </h1>
      </div>
      <div className="text-[24px] text-blue-950 mb-2 font-semibold">
        {module} Module
      </div>
      <p className="text-blue-950">{text}</p>
    </div>
  );
};

import { Helmet } from "react-helmet";

const Feature = () => {
  return (
    <div className="mt-[70px] w-full bg-white-400 flex justify-center items-start">
      <Helmet>
        <title>Features - Just Next School Management Software</title>
        <meta name="description" content="Explore Just Next features: Student Management, Staff & Teacher Portals, Automated Report Cards, Attendance Tracking, Timetable & Expenditure Management." />
        <link rel="canonical" href="https://justnext.ng/features" />
      </Helmet>
      <div className="w-[97%]">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 pb-[30px]">
          <div className="pt-[20px] md:pt-[50px]">
            <div className="p-[20px]">
              <div className="text-blue-950 text-[45px] md:text-[48px] lg:text-[60px] font-bold mb-2">
                Enhance Your School with NEXT
              </div>
              <div className="mb-5">
                <h1 className="text-[25px] md:text-[28px] lg:text-[35px] font-semibold text-blue-950">
                  The pioneering school management platform transforming
                  education in Nigeria.
                </h1>
              </div>
              <div className="mb-5">
                <p className="text-black text-lg">
                  NEXT leverages state-of-the-art technology to bridge the
                  educational divide, providing innovative solutions to
                  streamline administrative processes, improve communication,
                  and enhance overall efficiency in schools across Nigeria, from
                  underserved communities to affluent institutions.
                </p>
              </div>
              <div className="">
                <Link to="/auth">
                  <button className="py-2 md:py-3 px-5 text-white bg-blue-950 rounded-3xl hover:animate-pulse">
                    Join us
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-[700px] pt-[80px] flex justify-center items-center">
            <div className="h-[530px] w-[75%] md:w-[73%] rounded-lg bg-gray-100 relative">
              <img
                src={girl1}
                alt=""
                className="rounded-md object-cover w-[450px] h-[310px] absolute right-[-50px] top-[-60px] transform transition-transform duration-500 hover:scale-105"
              />
              <img
                src={girl2}
                alt=""
                className="rounded-md object-cover w-[450px] h-[310px] absolute left-[-50px] bottom-[-60px] transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 py-[50px]">
          <div className="h-[400px] mb-[30px]">
            <img
              src={child}
              alt=""
              className="h-full w-full p-[20px] md:w-[90%] object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="">
            <div className="mb-5 text-[28px] text-blue-950 font-semibold">
              NEXT provides a comprehensive suite of features tailored to meet
              the diverse needs of schools across Nigeria.
            </div>
            <div className="mb-5 text-blue-950 flex justify-between items-center flex-col gap-[25px]">
              <div className="mb-5 text-black">
                Our innovative platform, NEXT, is revolutionizing school
                management in Nigeria by leveraging state-of-the-art technology
                to streamline administrative processes, enhance communication,
                and boost overall efficiency. With a comprehensive suite of
                features, NEXT efficiently manages student data, simplifies
                attendance tracking, and streamlines grading and reporting. Our
                platform fosters enhanced communication between schools and
                parents, ensuring that everyone stays informed and engaged.
                Additionally, NEXT offers customizable features and flexible
                pricing options, making it accessible to schools of all
                financial statuses. Join NEXT today to experience unparalleled
                educational support, improved operational efficiency, and a
                transformative impact on your school community.
              </div>
            </div>
            <div className="">
              <Link to="/auth">
                <button className="py-2 md:py-3 px-5 text-white bg-blue-950 rounded-3xl hover:animate-pulse">
                  Learn More →
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-[50px] flex justify-center items-center flex-col">
          <div className="text-center text-black text-[40px] font-semibold mb-5">
            By Joining <span className="text-blue-950 font-bold">NEXT,</span>{" "}
            <br />
            Your School Will Be Open To A World Of Benefits
          </div>
          <div className="text-center w-[90%] lg:w-[50%] mb-5">
            <p>
              Our platform offers customizable features and flexible pricing
              options, ensuring that every school, regardless of its financial
              status, can benefit from our cutting-edge school management
              solutions. Join us to experience improved efficiency, enhanced
              communication, and unparalleled educational support.
            </p>
          </div>
          <div className="w-[85%] md:w-[80%] lg:w-[78%] pt-[30px] ">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] ">
              <div className="flex justify-center items-center">
                <CardProps
                  num={1}
                  module="Student Management"
                  bgColor="bg-blue-50"
                  text="Efficiently manage student data and academic records."
                />
              </div>
              <div className="flex justify-center items-center">
                <CardProps
                  num={2}
                  module="Staff/Teacher Management"
                  bgColor="bg-gray-50"
                  text="Streamline staff and teacher information management."
                />
              </div>
              <div className="flex justify-center items-center">
                <CardProps
                  num={3}
                  module="Timetable"
                  bgColor="bg-blue-50"
                  text="Create and manage school timetables effortlessly."
                />
              </div>
              <div className="flex justify-center items-center">
                <CardProps
                  num={4}
                  module="Attendance"
                  bgColor="bg-gray-50"
                  text="Track student and staff attendance with ease."
                />
              </div>
              <div className="flex justify-center items-center">
                <CardProps
                  num={5}
                  module="Lesson Note"
                  bgColor="bg-blue-50"
                  text="Prepare and share lesson notes efficiently."
                />
              </div>
              <div className="flex justify-center items-center">
                <CardProps
                  num={6}
                  module="Report Card"
                  bgColor="bg-gray-50"
                  text="Generate comprehensive student report cards."
                />
              </div>
              <div className="flex justify-center items-center">
                <CardProps
                  num={7}
                  module="Gallery"
                  bgColor="bg-blue-50"
                  text="Showcase school events and achievements with a photo gallery."
                />
              </div>
              <div className="flex justify-center items-center">
                <CardProps
                  num={8}
                  module="Student Report"
                  bgColor="bg-gray-50"
                  text="Provide detailed academic and behavior reports."
                />
              </div>
              <div className="flex justify-center items-center">
                <CardProps
                  num={9}
                  module="Expenditure"
                  bgColor="bg-blue-50"
                  text="Track and manage school expenditures efficiently."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feature;
