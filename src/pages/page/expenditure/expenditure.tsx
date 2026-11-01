import { useState } from "react";
import LittleHeader from "../../../components/layout/LittleHeader";
import Input from "../../../components/reUse/Input";
import Button from "../../../pagesForTeachers/components/reUse/Button";
import {
  useTermBudget,
  useTermExpenses,
} from "../../../pagesForStudents/hooks/useStudentHook";
import { useSchoolData } from "../../hook/useSchoolAuth";
import moment from "moment";
import { createExpense, setTermBudet } from "../../api/schoolAPIs";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const expenditure = () => {
  const [budget, setBudget] = useState<number>();

  const [amount, setAmount] = useState<string>();
  const [item, setItem] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [paymentCategory, setPaymentCategory] = useState<string>();
  const [paymentMode, setPaymentMode] = useState<string>();
  const [search, setSearch] = useState("");

  const { data } = useSchoolData();
  const { termlyExpense } = useTermExpenses(data?._id);
  const { termBudget } = useTermBudget(data?._id);

  const addBudget = async () => {
    await setTermBudet(data?._id, budget).then((res) => {
      toast.success("budget created successfully");
      mutate(`api/view-term-budget/${data?._id}`);
    });
  };

  const addExpenseEntry = async () => {
    await createExpense(data?._id, {
      item,
      description,
      paymentCategory,
      amount: parseInt(amount),
      paymentMode,
    }).then(() => {
      toast.success("Expense created successfully");
      mutate(`api/view-expense/${data?._id}`);
    });
  };

  const expenseData = termlyExpense?.data?.expense
    ?.map((el: any) => {
      return el?.amount ? el?.amount : 0;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  const allExpenditures: any = termlyExpense?.data?.expense;

  const filteredExpenditure = allExpenditures?.filter((expendyture) => {
    const full =
      `${expendyture?.item} ${expendyture?.paymentMode}`.toLowerCase();
    return full.includes(search.toLowerCase());
  });

  return (
    <div>
      {/* <LittleHeader name={"Expenditures"} /> */}
      <Toaster position="top-center" reverseOrder={true} />
      <div className="flex w-full justify-between items-start mb-5">
        <div className="modal-action">
          <label
            htmlFor="my_modal_expenses"
            className="py-4 px-6  border rounded-md font-bold bg-red-500 text-[12px] text-white transition-all duration-300 hover:scale-105 cursor-pointer inline-block text-center uppercase"
          >
            Set Budget for the Term
          </label>
        </div>
        {/* Modal starts */}
        <input
          type="checkbox"
          id="my_modal_expenses"
          className="modal-toggle"
        />

        <div className="modal modal-middle">
          <div className="modal-box bg-white">
            <label
              htmlFor="my_modal_expenses"
              className="btn text-white py-4 px-6 bg-red-500 border hover:bg-red-600 scale-105"
              onClick={addBudget}
            >
              Budget Set
            </label>
            <input
              className="h-[45px] text-[12px] px-2 w-[68%] border rounded-md ml-3 "
              placeholder="set termly budget in Naira eg: 203000"
              value={budget}
              onChange={(e: any) => {
                setBudget(e.target.value);
              }}
            />

            <label
              htmlFor="my_modal_expenses"
              className="btn text-white py-4 px-6 bg-blue-950 border hover: scale-105 mt-7"
            >
              close
            </label>
          </div>
        </div>
        {/* Modal */}
      </div>
      <div className="w-full mb-[50px] min-h-[150px] grid grid-cols-1 lg:grid-cols-2 gap-3 transition-all duration-300">
        <div className=" border rounded-md grid grid-cols-2">
          <div className="h-full p-2">
            <div className="font-semibold mb-5">EXPENDITURE DASHBOARD</div>
            <h4 className="mb-1 font-medium">Main Budget :</h4>
            <h1
              className={`mb-2 font-bold text-[25px] ${
                data?.categoryType === "Secondary"
                  ? "text-blue-950"
                  : "text-green-950"
              }`}
            >
              ₦{termBudget?.data?.toLocaleString()}
            </h1>
            <div
              className={`flex items-center gap-[10px] ${
                data?.categoryType === "Secondary"
                  ? "text-blue-950"
                  : "text-green-950"
              } text-[12px]`}
            >
              <div>Currency: </div>
              <div>Naira (₦)</div>
            </div>
          </div>
          <div className="h-full p-2 flex items-center justify-center">
            <div className="w-full p-2 h-full rounded-l-[inherit] border md:rounded-md md:h-[90%]">
              <h4 className="mb-3 font-medium">Total Expenses :</h4>
              <h1
                className={`font-bold text-[25px] ${
                  expenseData > termBudget?.data
                    ? "text-red-500"
                    : "text-green-500"
                } text-blue-950`}
              >
                ₦{expenseData?.toLocaleString()}
              </h1>

              {expenseData < termBudget?.data ? (
                <p className="text-[12px] font-semibold">
                  Still within <strong>BUDGET</strong>
                </p>
              ) : (
                <p className="text-[12px] font-semibold">
                  Out of <strong>BUDGET</strong> by{" "}
                  <span className="text-red-500">
                    ₦{((termBudget?.data - expenseData) * -1).toLocaleString()}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="border h-full rounded-md p-2 text-[12px]">Chart</div>
      </div>
      <div>
        <div className="flex w-full justify-between items-start">
          <Input
            placeholder="Search for expense Item Or Payment Mode"
            className="ml-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="modal-action ml-6">
            <label
              htmlFor="my_modal_expenses_modal"
              className={`py-4 px-6 ml-3 border rounded-md ${
                data?.categoryType === "Secondary"
                  ? "bg-blue-950"
                  : "bg-red-950"
              } text-[12px] text-white transition-all duration-300 hover:scale-105 cursor-pointer inline-block text-center`}
            >
              Record An Expenditure
            </label>
          </div>
        </div>
        {/* Modal starts */}
        <input
          type="checkbox"
          id="my_modal_expenses_modal"
          className="modal-toggle"
        />

        <div className="modal modal-middle">
          <div className="modal-box bg-white flex flex-col">
            <div>
              <main>
                <div className="flex flex-col">
                  <label className="font-semibold">Name of Item</label>
                  <input
                    className="h-[45px] text-[12px] px-2 w-full border rounded-md mb-2 "
                    placeholder="A4 paper, Cleaning Agents etc"
                    value={item}
                    onChange={(e: any) => {
                      setItem(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">
                    Description of the Item
                  </label>
                  <textarea
                    className="min-h-[100px] resize-none text-[12px] px-2 w-full border rounded-md mb-2 "
                    placeholder="Description"
                    value={description}
                    onChange={(e: any) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col mb-5">
                  <label className="font-semibold">Item Amount</label>
                  <div className="flex gap-2">
                    <input
                      className="h-[45px]  text-[12px] px-2 w-full border rounded-md mb-2 "
                      placeholder="₦2000 etc"
                      value={amount}
                      onChange={(e: any) => {
                        setAmount(e.target.value);
                      }}
                    />
                    <select
                      className="select select-bordered w-full max-w-xs"
                      value={paymentMode}
                      onChange={(e) => {
                        setPaymentMode(e.target.value);
                      }}
                    >
                      <option disabled selected>
                        Payment Method
                      </option>
                      <option value="Cash">Cash</option>
                      <option value="Transfer">Transfer</option>
                    </select>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      value={paymentCategory}
                      onChange={(e) => {
                        setPaymentCategory(e.target.value);
                      }}
                    >
                      <option disabled selected>
                        Item Category
                      </option>
                      <option value="Cloths">Cloths</option>
                      <option value="Stationaries">Stationaries</option>
                      <option value="Books">Books</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
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
                  onClick={addExpenseEntry}
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
        <div className="w-full ml-[15px] mb-6 flex justify-start items-center">
          <Link to="/view-all-expenditures">
            <div
              className={`${
                data?.categoryType === "Secondary"
                  ? "text-blue-950"
                  : "text-green-950"
              } text-[12px] uppercase font-semibold`}
            >
              view all expenses
            </div>
          </Link>
        </div>
        <div className="text-[gray] w-[1100px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[130px] border-r">Date</div>
          <div className="w-[120px] border-r">Amount</div>
          <div className="w-[200px] border-r">Item</div>
          <div className="w-[120px] border-r">Payment Method</div>
          <div className="w-[300px] border-r">Description / Notes</div>

          <div className="w-[120px] border-r">Category</div>
        </div>

        <div className=" w-[1100px] overflow-hidden">
          <div className="transition-all duration-300">
            {filteredExpenditure?.length > 0 ? (
              filteredExpenditure?.map((props: any) => (
                <div key={props?._id} className="smooth">
                  <div className="w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 py-2 my-2  overflow-hidden bg-white">
                    {/* start */}

                    <div className="w-[130px] border-r">
                      {moment(props?.createdAt).format("ll")}
                    </div>

                    <div
                      className="w-[120px] border-r 
                     text-red-600"
                    >
                      ₦{props?.amount?.toLocaleString()}
                    </div>

                    <div className="w-[200px] border-r">{props?.item}</div>
                    {/* name */}
                    <div className="w-[120px] flex justify-center border-r">
                      {props?.paymentMode}
                    </div>
                    <div className="w-[300px] border-r">
                      {props?.description}
                    </div>

                    {/* check */}
                    <div className="w-[120px] border-r  ">
                      {props?.paymentCategory}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4">No Expenditure Currently Recorded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default expenditure;
