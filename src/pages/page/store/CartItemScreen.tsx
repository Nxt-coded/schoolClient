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
import { UnLazyImage } from "@unlazy/react";
import { storePayment } from "../../api/schoolAPIs";
import { useState } from "react";
import { useSchool, useSchoolData } from "../../hook/useSchoolAuth";
import ClipLoader from "react-spinners/ClipLoader";
import { FiMinus } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";

const CartItemScreen = () => {
  const { data } = useSchoolData();
  const dispatch = useDispatch();
  const { _id } = useParams<{ _id: string }>();
  const cart = useSelector((state: any) => state?.cart);
  const carts = useSelector((state: any) =>
    state?.cart?.find((p: any) => p?._id === _id)
  );

  const cartToggle = useSelector((state: any) => state?.cartToggle);

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

                    <p className="font-semibold">
                      ₦{mainCost.toLocaleString()}
                    </p>
                  </div>
                  <div className=" flex border-y py-3 justify-between">
                    <p>service Charge</p>

                    <p>₦500</p>
                  </div>
                  <div className="hover:scale-[102%]  transition-all duration-300 mt-6 flex justify-center items-center">
                    <Button
                      name={`Checkout ₦${realCost.toLocaleString()}`}
                      className=" bg-blue-950"
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
