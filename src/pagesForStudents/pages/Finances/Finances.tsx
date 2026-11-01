import moment from "moment";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  useStudentFeePayment,
  useStudentInfo,
} from "../../hooks/useStudentHook";

const Finances = () => {
  const { studentInfo } = useStudentInfo();
  const studentId = studentInfo._id;

  const { studentFeePayment } = useStudentFeePayment(studentId);

  return (
    <div>
      <LittleHeader name="My Finances" />
      <div className="border-b mb-5 w-full" />
      <div className="font-semibold mb-3 text-gray-700">
        My Installmental School Fee Payment
      </div>
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="w-full ml-[15px] mb-6 flex justify-start items-center"></div>
        <div className="text-[gray] w-[1000px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[90px] border-r">Date Paid</div>
          <div className="w-[230px] border-r">Student Name</div>
          <div className="w-[90px] border-r">Amount Paid</div>
          <div className="w-[90px] border-r">Balance</div>
          <div className="w-[120px] border-r">School Class Fee</div>
          <div className="w-[90px] border-r">Paid By</div>

          <div className="w-[90px] border-r">Payment Mode</div>
          <div className="w-[120px]"></div>
        </div>
        <div className="w-[1000px] transition-all duration-300">
          {studentFeePayment?.length > 0 ? (
            studentFeePayment?.map((props: any) => (
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
                  <div className="w-[90px] border-r">{props?.feePaidDate}</div>
                  {/* check */}
                  <div className="w-[90px] border-r">{props?.paidByWho}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4">No Installmental Payment Done</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finances;
