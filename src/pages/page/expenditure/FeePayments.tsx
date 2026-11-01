import moment from "moment";
import Input from "../../../components/reUse/Input";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useState } from "react";
import { deleteRecord, recordFeesPayment } from "../../api/schoolAPIs";
import {
  useFeeRecords,
  useSchoolCookie,
  useSchoolStudents,
} from "../../hook/useSchoolAuth";
import { AiOutlineDelete } from "react-icons/ai";

const FeePayments = () => {
  const [fee, setFee] = useState(0);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paidby, setPaidby] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const schoolID = useSchoolCookie().dataID;

  const formattedDate = dueDate ? moment(dueDate).format("YYYY-MM-DD") : "";

  const getSchool = useSchoolStudents(schoolID);
  const getAllStudents = getSchool?.students?.data?.students;

  const students = getAllStudents?.map!((el) => ({
    value: el._id,
    label: el.studentFirstName.concat(" ", el?.studentLastName),
  }));

  // My Get Function
  const { payments } = useFeeRecords(schoolID);

  // My Post Function
  const handleRecordFee = () => {
    try {
      recordFeesPayment(
        schoolID,
        selectedStudent?.value,
        fee,
        paidby,
        paymentMode,
        formattedDate
      ).then((res) => {
        toast.success("Successfully Recorded Fee Payment");
        return res?.data;
      });
    } catch (error) {
      toast.success("Network Connection Error");
      console.error();
      return error;
    }
  };

  const handleDeleteRecord = (studentID, recordID) => {
    try {
      deleteRecord(schoolID, studentID, recordID).then((res) => {
        toast.success("School Fees Record Deleted");
        return res.data;
      });
    } catch (error) {
      toast.error("Error Deleting Fees Record");
      console.error();
      return error;
    }
  };

  const filteredPayments = payments?.filter((payment) => {
    const fullName =
      `${payment?.studentFirstName} ${payment?.studentLastName} ${payment?.studentClass}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div>
        {/* <LittleHeader name={"Expenditures"} /> */}
        <Toaster position="top-center" reverseOrder={true} />

        <div>
          <div className="w-full flex justify-between items-start">
            <Input
              placeholder="Search Student Name or Class"
              className="ml-1 mt-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="modal-action ml-6 flex">
              <label
                htmlFor="my_modal_expenses_modal"
                className="py-2 px-3 sm:py-4 sm:px-6 ml-3 border rounded-md bg-blue-950 text-[12px] text-white transition-all duration-300 hover:scale-105 cursor-pointer inline-block text-center"
              >
                Record Fees
              </label>
            </div>
          </div>
          {/* Modal starts */}
          <input
            type="checkbox"
            id="my_modal_expenses_modal"
            className="modal-toggle "
          />

          <div className="modal modal-middle">
            <div className="modal-box bg-white min-h-[500px] flex flex-col">
              <div className="mt-[30px]">
                <main className="transition-all duration-300">
                  <div className="mb-5">
                    <div className="text-[15px] mb-1 text-blue-950 font-medium">
                      Select the student for installmental fee payment
                    </div>
                    <div>
                      <Select
                        options={students}
                        className="w-full"
                        placeholder="Select or search for a student"
                        isSearchable
                        onChange={(selectedOption: any) =>
                          setSelectedStudent(selectedOption)
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="text-[15px] mb-1 text-blue-950 font-medium">
                      Enter installment amount paid
                    </div>
                    <input
                      type="text"
                      placeholder="Enter amount, e.g., 20000"
                      className="border-[1px] border-gray-400 outline-none w-full rounded-md p-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFee(parseFloat(e.target.value) || 0);
                      }}
                    />
                  </div>
                  <div className="flex justify-between gap-[20px] items-center ">
                    <div className="mb-5 w-[50%]">
                      <div className="text-[15px] mb-1 text-blue-950 font-medium">
                        Paid By Who
                      </div>
                      <div>
                        <select
                          className="select select-bordered border-gray-500 w-full max-w-xs"
                          value={paidby}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setPaidby(e.target.value);
                          }}
                        >
                          <option selected>Choose</option>
                          <option value="Parent">Parent</option>
                          <option value="Guardian">Guardian</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-5 w-[50%]">
                      <div className="text-[15px] mb-1 text-blue-950 font-medium">
                        Mode Of Payment
                      </div>
                      <div>
                        <select
                          className="select select-bordered border-gray-500 w-full max-w-xs"
                          value={paymentMode}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setPaymentMode(e.target.value);
                          }}
                        >
                          <option selected>Payment Method</option>
                          <option value="Cash">Cash</option>
                          <option value="Transfer">Transfer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 flex items-center justify-start gap-[20px]">
                    <div className="text-[15px] text-blue-950 font-medium">
                      Payment date :
                    </div>
                    <DatePicker
                      className="w-[170px] text-center p-1 bg-white text-black border border-gray-500 outline-none rounded-lg cursor-pointer"
                      selected={dueDate}
                      onChange={(date: Date) => {
                        setDueDate(date);
                      }}
                      dateFormat="P"
                      placeholderText="Select today's date"
                    />
                  </div>
                </main>

                <main className="flex gap-4 justify-center">
                  <label
                    htmlFor="my_modal_expenses_modal"
                    className="btn text-white py-4 px-6 bg-red-500 border hover:bg-red-600 scale-105 w-[200px]"
                  >
                    Cancel
                  </label>

                  <label
                    htmlFor="my_modal_expenses_modal"
                    className="btn text-white py-4 px-6 bg-green-500 border hover:bg-green-600 scale-105 w-[200px]"
                    onClick={handleRecordFee}
                  >
                    Approve
                  </label>
                </main>
              </div>
            </div>
          </div>
          {/* Modal */}
        </div>
        <div
          className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
          style={{ color: "var(--secondary)" }}
        >
          <div className="w-full ml-[15px] mb-6 flex justify-start items-center"></div>
          <div className="text-[gray] w-[1100px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
            <div className="w-[90px] border-r">Date Paid</div>
            <div className="w-[230px] border-r">Student Name</div>
            <div className="w-[90px] border-r">Amount Paid</div>
            <div className="w-[90px] border-r">Balance</div>
            <div className="w-[120px] border-r">School Class Fee</div>
            <div className="w-[90px] border-r">Paid By</div>

            <div className="w-[90px] border-r">Payment Mode</div>
            <div className="w-[120px]"></div>
          </div>

          <div className=" w-[1100px] overflow-hidden">
            <div className="transition-all duration-300">
              {filteredPayments?.length > 0 ? (
                filteredPayments?.map((props: any) => (
                  <div key={props?._id} className="smooth">
                    <div className="w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 py-3 my-2  overflow-hidden">
                      {/* start */}
                      <div className="w-[90px] border-r">
                        {moment(props?.createdAt).format("ll")}
                      </div>
                      <div className="w-[230px] border-r pr-2 flex justify-between items-end font-semibold gap-1">
                        <div className="flex items-center gap-1">
                          <div>{props?.studentFirstName}</div>
                          <div>{props?.studentLastName}</div>
                        </div>
                        <div className="text-[10px] border rounded-md py-[2px] px-[3px] font-bold">
                          {props?.studentClass}
                        </div>
                      </div>

                      <div
                        className="w-[90px] border-r 
                    text-green-600 font-semibold"
                      >
                        ₦{props?.feePaid[0].toLocaleString()}
                      </div>

                      {/* name */}
                      <div className="w-[90px] border-r text-red-600 font-semibold">
                        ₦{props?.feeBalance.toLocaleString()}
                      </div>
                      <div className="w-[120px] border-r text-blue-600 font-semibold">
                        ₦{props?.classFees.toLocaleString()}
                      </div>
                      <div className="w-[90px] border-r">
                        {props?.feePaidDate}
                      </div>
                      {/* check */}
                      <div className="w-[90px] border-r">
                        {props?.paidByWho}
                      </div>
                      <div className="w-[120px] ">
                        <div
                          className="ml-5 relative group"
                          onClick={() => {
                            handleDeleteRecord(props?.studentID, props?._id);
                          }}
                        >
                          <AiOutlineDelete className="text-slate-600 text-[22px] hover:scale-105 hover:animate-pulse cursor-pointer font-extrabold hover:text-[22px] transition-all duration-[350ms]" />
                          <span className="absolute left-6 -translate-x-1/2 bottom-full mb-[3px] text-[10px] w-max px-2 py-[2px] text-sm bg-gray-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4">No Payments Currently Recorded</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeePayments;
