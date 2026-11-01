import { useState } from "react";
import Input from "../../../components/reUse/Input";
import Button from "../../../components/reUse/Button";
import {
  removeOptions,
  updateAccount,
  updateAccountInfo,
  updateSchoolFeeAccountInfo,
  updateSchoolPaymentOptions,
} from "../../api/schoolAPIs";
import { useSchool, useSchoolData } from "../../hook/useSchoolAuth";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import LittleHeader from "../../../components/static/LittleHeader";
import { MdClose } from "react-icons/md";

document.title = "School's Profile settings";
const ThemeScreen = () => {
  const [pathName, setPathName] = useState<string>("accountDetails");

  return (
    <div className="w-full">
      <main className="flex gap-4 items-center mb-2 w-[200%] ">
        <div
          className="cursor-pointer bg-black hover:bg-neutral-900 transition-all duration-300 text-white px-4 py-3 rounded-md"
          onClick={() => {
            setPathName("accountDetails");
          }}
        >
          Account Details
        </div>
        <div
          className="cursor-pointer bg-blue-950 hover:bg-blue-900 transition-all duration-300 text-white px-4 py-3 rounded-md"
          onClick={() => {
            setPathName("addPayments");
          }}
        >
          Add Payments
        </div>
      </main>

      {pathName === "accountDetails" ? (
        <div className="sm:w-[350%] mb-2 font-semibold italic text-[12px]">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          officia dolorem, consectetur, aspernatur obcaecati beatae error
        </div>
      ) : (
        <div className="sm:w-[350%] mb-2 font-semibold italic text-[12px]">
          {" "}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor eum
          eveniet atque expedita aut ex nihil maxime dolore perspiciatis
          inventore.{" "}
        </div>
      )}
      <div className=" sm:w-[350%]  rounded-lg border h-[550px] text-blue-950 ">
        {/* <LittleHeader name={document.title} /> */}
        <Toaster position="top-center" />

        <div>
          {pathName === "accountDetails" ? (
            <AccountDetail />
          ) : (
            <AddMorePayments />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeScreen;

const AccountDetail = () => {
  const { data } = useSchoolData();

  const [accountName, setAccountName] = useState<string>(``);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [bankAccount, setBankAccount] = useState<string>("");

  const bankCode = [
    {
      id: 1,
      bank: "Access Bank Nigeria Plc",
      code: "044",
    },
    {
      id: 2,
      bank: "Diamond Bank Plc",
      code: "063",
    },
    {
      id: 3,
      bank: "Ecobank Nigeria",
      code: "050",
    },
    {
      id: 4,
      bank: "Enterprise Bank Plc",
      code: "084",
    },
    {
      id: 5,
      bank: "Fidelity Bank Plc",
      code: "070",
    },
    {
      id: 6,
      bank: "First Bank of Nigeria Plc",
      code: "011",
    },
    {
      id: 7,
      bank: "First City Monument Bank",
      code: "214",
    },
    {
      id: 8,
      bank: "Guaranty Trust Bank Plc",
      code: "058",
    },
    {
      id: 9,
      bank: "Heritage Banking Company Ltd",
      code: "030",
    },
    {
      id: 10,
      bank: "Jaiz Bank",
      code: "301",
    },
    {
      id: 11,
      bank: "Keystone Bank Ltd",
      code: "082",
    },
    {
      id: 12,
      bank: "Mainstreet Bank Plc",
      code: "014",
    },
    {
      id: 13,
      bank: "Skye Bank Plc",
      code: "011",
    },
    {
      id: 14,
      bank: "Stanbic IBTC Plc",
      code: "039",
    },
    {
      id: 15,
      bank: "Sterling Bank Plc",
      code: "232",
    },
    {
      id: 16,
      bank: "Union Bank Nigeria Plc",
      code: "032",
    },
    {
      id: 17,
      bank: "United Bank for Africa Plc",
      code: "033",
    },
    {
      id: 18,
      bank: "Unity Bank Plc",
      code: "215",
    },
    {
      id: 19,
      bank: "035 Bank Plc",
      code: "011",
    },
    {
      id: 20,
      bank: "Zenith Bank International",
      code: "057",
    },
  ];

  const getChoosen = bankCode.find((el) => {
    return el.bank === bankAccount;
  });

  const [toggle, setToggle] = useState<Boolean>(false);

  return (
    <div>
      <p className="text-[15px] p-4 font-medium ">
        Please note that all online Payment, will be Paid to this Account detail
        provided below.
        <br />
        <br />
        So it is very important that the information provided below are accurate
        and correct. <br />
        {/* <span className="text-[20px]">Thanks</span> */}
      </p>

      <div className="mx-5">
        <hr />
      </div>

      <div className="px-4 pt-5">
        <label className=" font-medium ">
          Please Fill in your School's Account Name
        </label>
        <Input
          placeholder={"Account Name"}
          defaultValue={data?.bankDetails?.accountName}
          value={
            data?.bankDetails?.accountName
              ? data?.bankDetails?.accountName
              : accountName
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAccountName(e.target.value);
          }}
          className="mb-4 ml-0 w-[95%]"
        />
      </div>
      <div className="px-4 pt-0">
        <label className=" font-medium ">
          Please Fill in your School's Account Number
        </label>
        <Input
          placeholder={"Account Number"}
          defaultValue={data?.bankDetails?.accountNumber}
          value={
            data?.bankDetails?.accountNumber
              ? data?.bankDetails?.accountNumber
              : accountNumber
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAccountNumber(e.target.value);
          }}
          className="mb-8 ml-0 w-[95%]"
        />
      </div>

      <div className="px-4 w-full">
        <select
          className="select select-bordered w-[95%] max-w-xs"
          onChange={(e: any) => {
            setBankAccount(e.target.value);
          }}
        >
          <option disabled selected>
            {data?.bankDetails?.bankName}
          </option>
          {bankCode?.map((el, i) => (
            <option key={i} className="py-3" value={el.bank}>
              {el.bank}
            </option>
          ))}
        </select>

        <Button
          name={toggle ? "Processing" : "Update Account Detail"}
          icon={
            toggle && (
              <ClipLoader
                size={15}
                color="white"
                className="absolute -ml-3 -mt-2"
              />
            )
          }
          className="bg-blue-950 mt-10 ml-0 py-4"
          onClick={async () => {
            setToggle(true);

            const result: any = await updateSchoolFeeAccountInfo({
              accountName,
              accountNumber,
              accountBankCode: getChoosen?.code,
            }).then(() => {
              toast.success("Account details updated successfully");
            });

            updateAccount({
              accountName,
              accountNumber,
              accountBankCode: getChoosen?.code,
            }).then((res) => {
              updateAccountInfo(data?._id, {
                bankDetails: {
                  bankName: getChoosen.bank,
                  accountName,
                  accountNumber,
                  accountPaymentCode: res?.data?.data?.data?.subaccount_code,
                  schoolFeeAccountPaymentCode:
                    result?.data?.data?.data?.subaccount_code,
                },
              }).then((res) => {
                toast.success("Done");
                setToggle(false);
              });
            });

            const x = setTimeout(() => {
              setToggle(false);
              clearTimeout(x);
            }, 5000);
          }}
        />
      </div>
    </div>
  );
};

const AddMorePayments = () => {
  const { data } = useSchoolData();
  const { data: paymentData } = useSchool(data?._id);
  const [paymentName, setPaymentName] = useState<string>(``);
  const [paymentAmount, setPaymentAmount] = useState<string>("");

  const [toggle, setToggle] = useState<Boolean>(false);

  return (
    <div>
      <p className="text-[15px] p-4 font-medium ">
        To manage and monitor payments across this platform
        <br />
        <br />
      </p>

      <div className="mx-5">
        <hr />
      </div>

      <div className="px-4 pt-5">
        <label className=" font-medium ">
          Please Enter what to be paid for
        </label>
        <input
          placeholder={"School Uniform"}
          value={paymentName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPaymentName(e.target.value);
          }}
          className="mb-8 ml-0 w-[95%] h-[45px] border pl-2 rounded-md outline-none"
        />
      </div>
      <div className="px-4 pt-0">
        <label className=" font-medium ">
          Please Enter the Amount to be Paid
        </label>
        <input
          placeholder={"21000"}
          value={paymentAmount}
          onChange={(e: any) => {
            setPaymentAmount(e.target.value);
          }}
          className="mb-8 ml-0 w-[95%] h-[45px] border pl-2 rounded-md outline-none"
        />
      </div>

      <div className="px-4 w-full">
        <Button
          disabled={!!toggle}
          name={toggle ? "Processing" : "Add to Payment Log"}
          icon={
            toggle && (
              <ClipLoader
                size={15}
                color="white"
                className="absolute -ml-3 -mt-2"
              />
            )
          }
          className="bg-blue-950 mt-10 ml-0 py-4"
          onClick={() => {
            setToggle(true);

            updateSchoolPaymentOptions(data?._id, {
              paymentDetails: paymentName,
              paymentAmount,
            })
              .then((res) => {
                if (res.status === 201) {
                  toast.success("payment options updated successfully");
                }
              })
              .finally(() => {
                setToggle(false);
                setPaymentAmount("");
                setPaymentName("");
              });
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2 mx-4 mt-8">
        {paymentData?.data?.paymentOptions?.map((el: any) => (
          <div key={el?._id} className="">
            <div className="bg-orange-500 text-white text-[15px] px-4 py-2 rounded-full flex gap-2 justify-between items-center">
              <p>{el?.paymentDetails}</p>

              <div
                className="cursor-pointer"
                onClick={() => {
                  removeOptions(data?._id, el?.id);
                }}
              >
                <MdClose />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
