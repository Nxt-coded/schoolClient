import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import Input from "../reUse/Input";
import Button from "../reUse/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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
  date?: boolean;
  sub?: boolean;
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

  startDateTime,
  startDateTimeFn,
}) => {
  //
  return (
    <div className={`flex ${date ? "mt-32" : "mt-60"} justify-center`}>
      <div className="w-[500px] min-h-[300px] border rounded-md bg-white shadow-md p-4">
        <p className="flex items-center justify-between my-4 ">
          <p className="font-bold">{titleCall}</p>
          <Toaster position="top-center" reverseOrder={true} />

          <p
            className="hover:bg-blue-50 transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold "
            onClick={offFn}
          >
            <MdClose />
          </p>
        </p>
        <hr />

        <p className="mt-2 leading-tight text-[13px] font-medium">{text}</p>

        <div className="mt-10 w-full gap-2 flex items-center">
          <div className="w-full">
            <label className="font-medium text-[12px]">
              {startTitle} <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder={placeStart}
              className="mx-0 h-10 w-full"
              value={start}
              onChange={(e: any) => {
                setStart!(e.target.value);
              }}
            />
          </div>

          {en && (
            <div className="w-full">
              <label className="font-medium text-[12px]">
                {endTitle} <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder={placeEnd}
                className="mx-0 h-10  w-full"
                value={end}
                onChange={(e: any) => {
                  setEnd!(e.target.value);
                }}
              />
            </div>
          )}

          {date && (
            <div className="w-full  -mt-7">
              <label className="font-medium text-[12px] mb-5">
                {endTitle} <span className="text-red-500">*</span>
              </label>

              <DatePicker
                className="text-[12px] font-medium h-10  px-2 mt-3 border rounded-md w-[200px] "
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
                First Term Fee <span className="text-red-500">*</span>
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
                Second Term Fee <span className="text-red-500">*</span>
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
                Third Term Fee <span className="text-red-500">*</span>
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
              className="textarea border-blue-950 rounded-md w-[95%] resize-none h-[170px] text-[12px] font-normal placeholder:opacity-55"
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
                className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
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
                className="bg-blue-950  mx-0"
                onClick={handleFn}
              />
            ) : (
              <Button
                name="Can't Publish"
                className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
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
                className="bg-blue-950  mx-0"
                onClick={handleFn}
              />
            ) : (
              <Button
                name="Can't Proceed"
                className="bg-[lightgray] text-blue-950 mx-0 cursor-not-allowed"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAnyItem;
