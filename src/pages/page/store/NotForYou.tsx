import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  changeCartPick,
  displayCart,
  paymentRef,
} from "../../../global/reduxState";
import { MdClose, MdExpandLess } from "react-icons/md";
import Button from "../../../components/reUse/Button";
import { UnLazyImage } from "@unlazy/react";
import { storePayment } from "../../api/schoolAPIs";
import { useState } from "react";
import { useSchool, useSchoolData } from "../../hook/useSchoolAuth";
import ClipLoader from "react-spinners/ClipLoader";

const CartItemScreen = () => {
  const { data } = useSchoolData();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state?.cart);
  const cartToggle = useSelector((state: any) => state?.cartToggle);

  const [loading, setToggle] = useState<boolean>(false);

  const changeView = () => {
    if (!document.startViewTransition) {
      dispatch(displayCart(!cartToggle));
    } else {
      document.startViewTransition(() => {
        dispatch(displayCart(!cartToggle));
      });
    }
  };

  const mainCost = cart
    ?.map((el: any) => {
      return el?.cost * el?.QTY;
    })
    ?.reduce((a: number, b: number) => {
      return a + b;
    }, 0)
    ?.toLocaleString();

  const realCost = (
    cart
      ?.map((el: any) => {
        return el.cost * el.QTY;
      })
      ?.reduce((a: number, b: number) => {
        return a + b;
      }, 0) + 500
  )?.toLocaleString();

  return (
    <div className="flex w-full h-full flex-col items-center ">
      <div className="flex w-full  justify-end  ">
        <div>
          <MdClose
            size={30}
            className="mr-10 my-5 cursor-pointer hover:text-red-600 hover:rotate-180 transition-all duration-300
          flex justify-center items-center rounded-full hover:bg-neutral-300
          "
            onClick={changeView}
          />
        </div>
      </div>

      <div
        className="flex  transition-all duration-300 2xl:w-[70%] justify-end py-10 rounded-md mx-2 w-[98%]"
        style={{
          background: "white",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(73, 154, 255, 0.3)",
        }}
      >
        <div className="px-5 w-full grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="pr-2">
            <p className="font-bold">Cart Total </p>
            <p className="font-medium my-5 flex justify-between items-center">
              <p>SubTotal</p>
              <p className="font-bold">₦{mainCost}</p>
            </p>
            <p className="font-medium my-5 flex justify-between items-center">
              <p>Extra Charges</p>
              <p className="font-bold">₦500</p>
            </p>
            <div className="mt-10 border-t border-neutral" />

            <p className="font-medium my-1 flex justify-between items-center">
              <p>Total</p>
              <p className="font-bold">₦{realCost}</p>
            </p>

            <div className="w-full flex justify-center mt-10">
              <Button
                name={loading ? "loading" : "Process to Pay"}
                icon={
                  loading && (
                    <ClipLoader size={15} color="white" className="absolute" />
                  )
                }
                className="bg-blue-950 w-full mx-0 py-5"
                onClick={() => {
                  setToggle(true);

                  storePayment({
                    email: data?.email,
                    amount:
                      cart
                        ?.map((el: any) => {
                          return el?.cost * el?.QTY;
                        })
                        ?.reduce((a: number, b: number) => {
                          return a + b;
                        }, 0) + 500,
                    subAccountCode: data?.bankDetails?.accountPaymentCode,
                  }).then((res) => {
                    if (res) {
                      dispatch(paymentRef(res?.data?.data?.data?.reference));
                      location.replace(
                        res?.data?.data?.data?.authorization_url
                      );
                    }
                  });

                  const x = setTimeout(() => {
                    setToggle(false);
                    clearTimeout(x);
                  }, 4000);
                }}
              />
            </div>
          </div>

          <div className="col-span-2 min-h-[50vh] pl-2 md:border-l border-neutral-500 w-full flex flex-col items-center ">
            {cart.length > 0 ? (
              <div className="w-full">
                {cart?.map((props: any) => (
                  <div
                    key={props?._id}
                    className="flex items-center w-full gap-2 border-b border-[gray] py-5 "
                  >
                    <MdClose />

                    <UnLazyImage
                      alt={props?.title}
                      thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
                      src={props?.avatar}
                      autoSizes
                      className="w-[200px] h-[120px] border rounded-lg ml-2"
                    />

                    <div className="w-[90%] ">
                      <p className="font-bold text-[18px]">{props?.title}</p>
                      <p className="leading-tight text-neutral-900">
                        {props?.description}{" "}
                      </p>

                      <div className="flex mt-5 font-bold text-[20px]">
                        ₦{(props?.cost * props?.QTY)?.toLocaleString()}
                      </div>
                    </div>

                    <div className="w-[15%] flex flex-col justify-center h-full items-center gap-3">
                      <p
                        className="bg-blue-950 text-white rounded-md h-10 w-10 flex items-center justify-center font-bold cursor-pointer"
                        onClick={() => {
                          dispatch(addToCart(props));
                        }}
                      >
                        <MdExpandLess />
                      </p>
                      <p className="font-bold">{props.QTY}</p>

                      <p
                        className="bg-orange-600 text-white rounded-md h-10 w-10 flex items-center justify-center font-bold cursor-pointer rotate-180 "
                        onClick={() => {
                          dispatch(changeCartPick(props));
                        }}
                      >
                        <MdExpandLess />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No Items Yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemScreen;
