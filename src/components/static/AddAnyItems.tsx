import { FC, useState } from "react";
import { MdClose } from "react-icons/md";
import Input from "../reUse/Input";
import Button from "../reUse/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useSchoolClassRM,
  useSchoolData,
} from "../../pages/hook/useSchoolAuth";

interface iProps {
  props?: any;
  text?: any;
  handleFn?: any;
  offFn?: any;
  titleCall?: string;
  start?: string;
  end?: string;
  setStart?: React.Dispatch<React.SetStateAction<string>>;
  setEnd?: React.Dispatch<React.SetStateAction<string>>;
  placeEnd?: string;
  placeStart?: string;
  startTitle?: string;
  endTitle?: string;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  en?: boolean;
  fee?: boolean;
  num1?: number;
  num2?: number;
  num3?: number;
  setNumb1?: React.Dispatch<React.SetStateAction<number>>;
  setNumb2?: React.Dispatch<React.SetStateAction<number>>;
  setNumb3?: React.Dispatch<React.SetStateAction<number>>;

  setAnnounce?: React.Dispatch<React.SetStateAction<string>>;
  announce?: string;
  upper?: boolean;
  date?: boolean;
  sub?: boolean;
  base?: boolean;
  select?: boolean;
  startDateTime?: any;
  startDateTimeFn?: any;
}

const AddAnyItem: FC<iProps> = ({
  text,
  handleFn,
  start,
  end,
  setStart,
  setEnd,
  placeStart,
  placeEnd,
  startTitle,
  endTitle,
  loading,
  en,
  offFn,
  titleCall,
  fee,
  setNumb1,
  setNumb2,
  setNumb3,
  num1,
  num2,
  num3,
  date,
  setAnnounce,
  announce,
  sub,
  upper,
  select,
  startDateTime,
  startDateTimeFn,
  base,
}) => {
  //
  const { schoolClassroom } = useSchoolClassRM();
  const { data } = useSchoolData();

  const [classNameData, setClassNameData] = useState<string>("");

  return (
    <div className={`flex ${date ? "mt-32" : "mt-60"} justify-center`}>
      <div className="w-[500px] min-h-[300px] border rounded-md bg-white shadow-md p-4">
        <p className="flex items-center justify-between my-4 ">
          <p className="font-bold">{titleCall}</p>
          <Toaster position="top-center" reverseOrder={true} />

          <p
            className={` ${
              data?.categoryType === "Secondary"
                ? "hover:bg-blue-50"
                : "hover:bg-red-50"
            }transition-all duration-300 cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold`}
            onClick={offFn}
          >
            <MdClose />
          </p>
        </p>
        <hr />

        <p className="mt-2 leading-tight text-[13px] font-medium">{text}</p>

        <div className="mt-10 w-full gap-2 flex items-center">
          {
            <div className="w-full">
              <label className="font-medium text-[12px]">
                {startTitle} <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder={placeStart}
                className={`mx-0 h-12 w-full ${
                  upper ? "uppercase" : "normal-case"
                }`}
                value={start.toUpperCase()}
                onChange={(e: any) => {
                  setStart!(e.target.value);
                }}
              />
            </div>
          }

          {/* {select && data.categoryType === "Nursery/Primary" ? (
            <div className="w-full flex flex-col mb-10">
              <label className="font-medium text-[12px]">
                {startTitle} <span className="text-red-500">*</span>
              </label>
              <select
                value={classNameData}
                onChange={(e: any) => {
                  setClassNameData!(e.target.value);
                  setStart(classNameData);
                }}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Pick a class?
                </option>

                <option value={"kindergarten"}>kindergarten</option>
                <option value={"Nursery 1"}>Nursery 1</option>
                <option value={"Nursery 2"}>Nursery 2</option>
                <option value={"Basic 1"}>Basic 1</option>
                <option value={"Basic 2"}>Basic 2</option>
                <option value={"Basic 3"}>Basic 3</option>
                <option value={"Basic 4"}>Basic 4</option>
                <option value={"Basic 5"}>Basic 5</option>
                <option value={"Basic 6"}>Basic 6</option>
              </select>
            </div>
          ) : (
            <div className="w-full flex flex-col mb-10">
              <label className="font-medium text-[12px]">
                {startTitle} <span className="text-red-500">*</span>
              </label>
              <select
                value={start.toUpperCase()}
                onChange={(e: any) => {
                  setStart!(e.target.value);
                }}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Pick a class?
                </option>

                <option value={"JSS 1A"}>JSS 1</option>
                <option value={"JSS 1B"}>JSS 1</option>
                <option value={"JSS 1C"}>JSS 1</option>
                <option value={"JSS 2A"}>JSS 2</option>
                <option value={"JSS 2B"}>JSS 2</option>
                <option value={"JSS 2C"}>JSS 2</option>
                <option value={"JSS 3A"}>JSS 3</option>
                <option value={"JSS 3B"}>JSS 3</option>
                <option value={"JSS 3C"}>JSS 3</option>

                <option value={"SSS 1ART"}>SSS 1ART</option>
                <option value={"SSS 1COMMERCIAL"}>SSS 1COMMERCIAL</option>
                <option value={"SSS 1SCIENCE"}>SSS 1SCIENCE</option>

                <option value={"SSS 2ART"}>SSS 2ART</option>
                <option value={"SSS 2COMMERCIAL"}>SSS 2COMMERCIAL</option>
                <option value={"SSS 2SCIENCE"}>SSS 2SCIENCE</option>

                <option value={"SSS 3ART"}>SSS 3ART</option>
                <option value={"SSS 3COMMERCIAL"}>SSS 3COMMERCIAL</option>
                <option value={"SSS 3SCIENCE"}>SSS 3SCIENCE</option>
              </select>
            </div>
          )} */}

          {en && (
            <div className="w-full -mt-5">
              <label className="font-medium text-[12px]">
                {endTitle} <span className="text-red-500">*</span>
              </label>

              <select
                className="select bg-gray-100 select-bordered w-full max-w-xs mt-2"
                onChange={(e) => {
                  setEnd(e.target.value);
                }}
              >
                <option disabled selected>
                  Assign Class
                </option>
                {schoolClassroom?.classRooms
                  ?.sort((a: any, b: any) => {
                    return a.className - b.className;
                  })
                  ?.map((props: any) => (
                    <option
                      key={props?._id}
                      value={props?.className}
                      className="my-2 font-medium py-2"
                    >
                      {props?.className}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {date && (
            <div className="w-full  -mt-7">
              <label className="font-medium text-[12px] mb-5">
                {endTitle} <span className="text-red-500">*</span>
              </label>

              <DatePicker
                className="text-[12px] bg-gray-100 font-medium h-10  px-2 mt-3 border rounded-md w-[200px] "
                placeholderText="add date here"
                selected={startDateTime!}
                onChange={startDateTimeFn}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          )}
        </div>

        {fee && (
          <div className="flex gap-2">
            <div className="w-full">
              <label className="font-medium text-[12px]">
                1st Term Fee <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="50000"
                className="mx-0 h-10  w-full"
                value={num1}
                onChange={(e: any) => {
                  setNumb1!(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <label className="font-medium text-[12px]">
                2nd Term Fee <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="50000"
                className="mx-0 h-10  w-full"
                value={num2}
                onChange={(e: any) => {
                  setNumb2!(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <label className="font-medium text-[12px]">
                3rd Term Fee <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="50000"
                className="mx-0 h-10  w-full"
                value={num3}
                onChange={(e: any) => {
                  setNumb3!(e.target.value);
                }}
              />
            </div>
          </div>
        )}

        {date && (
          <div>
            <textarea
              className={`textarea bg-gray-100  ${
                data?.categoryType === "Secondary"
                  ? "border-blue-950"
                  : "border-red-950"
              } rounded-md w-[95%] resize-none h-[170px] text-[12px] font-normal placeholder:opacity-55`}
              placeholder="Event Details of this Announcement "
              value={announce}
              onChange={(e: any) => {
                setAnnounce!(e.target.value);
              }}
            />
          </div>
        )}

        {fee && (
          <div className="w-full flex justify-end transition-all duration-300">
            {start !== "" && num1 && num2 && num3 ? (
              <Button
                name={
                  loading ? (
                    <div>
                      <ClipLoader color="#fff" size={12} />{" "}
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Proceed"
                  )
                }
                className="bg-blue-950  mx-0"
                onClick={handleFn}
              />
            ) : (
              <Button
                name="Can't Proceed"
                className={`bg-[lightgray] ${
                  data?.categoryType === "Secondary"
                    ? "text-blue-950"
                    : "text-green-950"
                } mx-0 cursor-not-allowed`}
              />
            )}
          </div>
        )}

        {date && (
          <div className="w-full flex justify-end transition-all duration-300">
            {start !== "" && announce !== "" && startDateTime !== "" ? (
              <Button
                name={
                  loading ? (
                    <div>
                      <ClipLoader color="#fff" size={12} />{" "}
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Publish"
                  )
                }
                className={` ${
                  data?.categoryType === "Secondary"
                    ? "bg-blue-950"
                    : "bg-red-950"
                }  mx-0`}
                onClick={handleFn}
              />
            ) : (
              <Button
                name="Can't Publish"
                className={`bg-[lightgray] ${
                  data?.categoryType === "Secondary"
                    ? "text-blue-950"
                    : "text-green-950"
                } mx-0 cursor-not-allowed`}
              />
            )}
          </div>
        )}

        {sub && (
          <div className="w-full flex justify-end transition-all duration-300">
            {start !== "" && announce !== "" && startDateTime !== "" ? (
              <Button
                name={
                  loading ? (
                    <div>
                      <ClipLoader color="#fff" size={12} />{" "}
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Proceed"
                  )
                }
                className={`${
                  data?.categoryType === "Secondary"
                    ? "bg-blue-950"
                    : "bg-red-950"
                }  mx-0`}
                onClick={handleFn}
              />
            ) : (
              <Button
                name="Can't Proceed"
                className={`bg-[lightgray] ${
                  data?.categoryType === "Secondary"
                    ? "text-blue-950"
                    : "text-green-950"
                } mx-0 cursor-not-allowed`}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAnyItem;
