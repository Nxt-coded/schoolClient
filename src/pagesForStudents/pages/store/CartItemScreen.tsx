import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  changeCartPick,
  displayCart,
  paymentRef,
  removeFromCart,
} from "../../../global/reduxState";
import { MdClose, MdDelete, MdExpandLess } from "react-icons/md";
import Button from "../../../components/reUse/Button";
import { storePayment } from "../../../pages/api/schoolAPIs";
import { useStudentInfo } from "../../hooks/useStudentHook";
import { useGallary, useSchool } from "../../../pages/hook/useSchoolAuth";
import { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import { UnLazyImage } from "@unlazy/react";
import toast, { Toaster } from "react-hot-toast";

const CartItemScreen = () => {
  const [toggle, setToggle] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const cartToggle = useSelector((state: any) => state.cartToggle);
  const cart = useSelector((state: any) => state.cart);

  const { studentInfo } = useStudentInfo();
  const { data } = useSchool(studentInfo?.schoolIDs);

  const changeView = () => {
    if (!document.startViewTransition) {
      dispatch(displayCart(!cartToggle));
    } else {
      document.startViewTransition(() => {
        dispatch(displayCart(!cartToggle));
      });
    }
  };

  const cost = cart
    ?.map((el: any) => {
      return el.QTY * el.cost;
    })
    ?.reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  return (
    <div className="flex w-full h-full flex-col items-center ">
      <Toaster />
      <div className="flex w-full  justify-between  ">
        <div className=" flex items-center justify-between px-3 w-full">
          <div className="text-red-600 text-[12px]">
            Using this store requires ₦500 charges for payment
          </div>
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
      </div>

      <div className=" w-full min-h-[50vh] flex justify-center">
        <div className=" grid grid-rows-2 lg:grid-cols-6 px-4 gap-5 w-full">
          {cart.length > 0 ? (
            <div className="rounded-md shadow-lg border col-span-4">
              <div className=" px-2 py-3">CART({cart.length})</div>
              {cart?.map((props: any) => (
                <div
                  className=" w-full border-y py-3 px-2 grid grid-cols-5 gap-2 mb-3"
                  key={props?._id}
                >
                  <div className=" col-span-4">
                    <div className=" flex gap-5">
                      <div className=" w-[30%]">
                        <UnLazyImage
                          alt={props?.title}
                          thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
                          src={props?.avatar}
                          autoSizes
                          className="w-[140px] object-cover h-[120px] border rounded-lg ml-2"
                        />
                      </div>
                      <div className=" w-[70%] text-wrap">
                        <p className="font-bold text-[18px]">{props?.title}</p>
                        <p className="leading-tight text-neutral-900 break-words overflow-hidden overflow-ellipsis">
                          {props?.description}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className="gap-3 flex ml-2 mt-4 cursor-pointer p-2 hover:bg-slate-100 transition-all duration-300 rounded-md text-red-600 items-center"
                        onClick={() => {
                          dispatch(removeFromCart(props));
                        }}
                      >
                        <div>
                          <MdDelete size={20} />
                        </div>
                        <p className="mr-2 text-[12px] mt-1 font-semibold ">
                          Remove Item
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" col-span-1 flex flex-col justify-center items-end gap-y-2">
                    <div className="font-semibold">
                      ₦{props?.cost?.toLocaleString()}
                    </div>
                    <div className="capitalize text-[12px]">no discount</div>
                    <div className=" flex items-center">
                      <div>
                        <Button
                          name={<FiMinus size={15} className=" mr-1" />}
                          className=" bg-red-600 px-1 py-2"
                          onClick={() => {
                            dispatch(changeCartPick(props));
                          }}
                        />
                      </div>
                      <p className=" text-[18px]">{props?.QTY}</p>
                      <div>
                        <Button
                          name={<IoAddSharp size={15} className=" mr-1" />}
                          className=" bg-blue-950 px-1 py-2"
                          onClick={() => {
                            dispatch(addToCart(props));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Not Yet</div>
          )}
          <div className="col-span-2">
            {cart.length > 0 ? (
              <div className=" min-h-[210px] rounded-md shadow-md ">
                <div className=" p-3">
                  <div className=" py-2">CART SUMMARY</div>
                  <div className=" flex border-y py-3 justify-between">
                    <p>Subtotal</p>

                    <p className="font-semibold">₦{cost.toLocaleString()}</p>
                  </div>
                  <div className=" flex border-y py-3 justify-between">
                    <p>service Charge</p>

                    <p>₦500</p>
                  </div>
                  {/* <div className="hover:scale-[102%]  transition-all duration-300 mt-6 flex justify-center items-center">
                    <Button
                      name={`Checkout ₦${cost.toLocaleString()}`}
                      className=" bg-blue-950"
                    />
                  </div> */}
                  <div className="w-full flex justify-center mt-10">
                    <Button
                      name={toggle ? "Processing..." : "Proceed to Pay"}
                      className="bg-blue-950 w-full mx-0 py-5"
                      onClick={() => {
                        setToggle(true);
                        if (studentInfo?.parentEmail) {
                          storePayment({
                            email: studentInfo?.parentEmail,
                            amount: cost + 500,
                            subAccountCode:
                              data?.bankDetails?.accountPaymentCode,
                          }).then((res) => {
                            if (res) {
                              dispatch(
                                paymentRef(res?.data?.data?.data?.reference)
                              );
                              console.log(res);
                              location.replace(
                                res?.data?.data?.data?.authorization_url
                              );
                            }
                          });
                        } else {
                          toast.error(
                            "Please update Parent's email for permission"
                          );
                        }

                        const x = setTimeout(() => {
                          setToggle(false);
                          clearTimeout(x);
                        }, 4000);
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemScreen;

// 73, 154, 255, 0.2;  purchasedEndPoint
