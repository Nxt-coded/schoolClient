import { FaCheck, FaCheckDouble } from "react-icons/fa6";
import pix from "../../../assets/pix.jpg";
import { usePurchasedStore, useStudentInfo } from "../../hooks/useStudentHook";

const PickUpItem = () => {
  const { studentInfo } = useStudentInfo();
  const { purchasedStore } = usePurchasedStore(studentInfo?._id);
  let item: any = {};

  for (let i = 0; i < purchasedStore?.length; i++) {
    item = purchasedStore[0];
  }

  return (
    <div>
      {Object.values(item).length !== 0 ? (
        <div className="text-blue-950">
          <p className="font-medium leading-tight mb-3 text-[12px]">
            {item?.delievered! ? (
              <p>
                This Item Purchase is now due for Pick Up,
                <br />
                <span className="font-bold">
                  Thanks for being patient with us!
                </span>
              </p>
            ) : (
              <p>
                You'd made this purchase but it hasn't been comfirm... We are
                still on it. <br />
                <span className="font-bold">Please be patient with us!</span>
              </p>
            )}
          </p>
          <div className="flex items-center flex-wrap gap-5">
            <div className={`w-[200px] border-r  `}>
              {item?.cart?.map((el: any, i: number) => (
                <div key={i} className="">
                  <div className="flex items-center gap-3 my-2">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={el?.avatar ? el?.avatar : pix} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{el.title}</div>
                      <div className="text-[12px] opacity-50 ">
                        ₦{el?.cost?.toLocaleString()} * {el.QTY}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-[100px] border-r font-medium">
              <div className="text-[12px] w-full flex justify-start">
                {" "}
                Amount Paid{" "}
              </div>
              <div> ₦{item?.amount?.toLocaleString()} </div>
            </div>

            {/* name */}

            <div className="font-medium">
              <div className="text-[12px]  w-full flex justify-start">
                You Receipt Code
              </div>
              <div className="font-bold">{item?.reference}</div>
              <div className="text-[12px]  text-[silver] italic">
                {item?.date}
              </div>
            </div>
          </div>
          <p className="text-[12px] mt-8">
            Please show this <strong className="font-bold">Recipt code</strong>,
            when going to Pick up your items
            <br />
            This will help fast track all protocols that will delay you
            unneccessary!
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[130px] p-2 flex-col">
          <FaCheckDouble />
          <p className="text-[12px]">You've not made any recent Purchase</p>
        </div>
        // </div>
      )}
    </div>
  );
};

export default PickUpItem;
