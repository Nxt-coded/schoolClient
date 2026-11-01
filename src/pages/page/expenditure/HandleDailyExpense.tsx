import { createDailyExpense } from "@/pages/api/schoolAPIs";
import { useSchoolData } from "@/pages/hook/useSchoolAuth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

const HandleDailyExpense = () => {
  const [budget, setBudget] = useState<number>();

  const [amount, setAmount] = useState<string>();
  const [item, setItem] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [paymentCategory, setPaymentCategory] = useState<string>();
  const [paymentMode, setPaymentMode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useSchoolData();

  const addExpenseEntry = async () => {
    setLoading;
    true;
    await createDailyExpense(data?._id, {
      item,
      description,
      paymentCategory,
      amount: parseInt(amount),
      paymentMode,
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Expense created successfully");
          mutate(`api/read-term-daily-expense/${data?._id}`);
        } else {
          toast.error("something went wrong");
        }
      })
      .finally(() => {
        setLoading(false);
        setPaymentMode("");
        setItem("");
        setPaymentCategory("");
        setDescription("");
        setAmount("");
      });
  };

  return (
    <div>
      <div className="modal-action mx-2 w-[95%]">
        <label
          htmlFor="my_modal_expenses_modal"
          className={`py-2 px-6 w-full border rounded-md bg-slate-800 hover:bg-slate-900 text-[12px] text-white transition-all duration-300 cursor-pointer inline-block text-center`}
        >
          Record Daily Expense
        </label>
      </div>

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
                <label className="font-semibold">Name of Expense Item</label>
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
                  Description of the Expense Item
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
                <label className="font-semibold">Expense Item Amount</label>
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
                    <option selected>Expense Method</option>
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
                    <option selected>Expense Category</option>
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
                className="uppercase  btn text-white py-4 px-6 bg-red-500 border hover:bg-red-600 scale-105 w-[200px]"
              >
                Cancel
              </label>

              <label
                htmlFor="my_modal_expenses_modal"
                className="uppercase btn text-white py-4 px-6 bg-slate-800 hover:bg-slate-900 transition-all duration-300  scale-105 w-[200px]"
                onClick={addExpenseEntry}
              >
                Enter Expense
              </label>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleDailyExpense;
