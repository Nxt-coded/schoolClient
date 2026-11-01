document.title = "School's Store";
import { useState } from "react";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import StoreView from "./StoreView";
import StoreItems from "./StoreItems";
import { useDispatch, useSelector } from "react-redux";
import CartItemScreen from "./CartItemScreen";
import { displayCart } from "../../../global/reduxState";
import { BsCart4 } from "react-icons/bs";
import { useSchoolData } from "../../hook/useSchoolAuth";
import { MdCheck, MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { createStore } from "../../api/schoolAPIs";
import { mutate } from "swr";
import Input from "../../../components/reUse/Input";
import { ClipLoader } from "react-spinners";

const ViewStoreItems = () => {
  const dispatch = useDispatch();
  const { data } = useSchoolData();
  const [toggle, setToggle] = useState(false);

  const cartToggle = useSelector((state: any) => state.cartToggle);
  const cart = useSelector((state: any) => state?.cart);

  const changeView = () => {
    if (!document.startViewTransition) {
      setToggle(!toggle);
      dispatch(displayCart(false));
    } else {
      document.startViewTransition(() => {
        setToggle(!toggle);
        dispatch(displayCart(false));
      });
    }
  };

  const changeViewCart = () => {
    if (!document.startViewTransition) {
      setToggle(!toggle);
      dispatch(displayCart(!cartToggle));
    } else {
      document.startViewTransition(() => {
        setToggle(!toggle);
        dispatch(displayCart(!cartToggle));
      });
    }
  };

  // These is the Create Store Function For MOBILE SCREENS ONLY. STARTS HERE
  const [subject, setSubject] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [period, setPeriod] = useState<number>(0);
  const [image, setImage] = useState("");
  const [pix, setPix] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setPix(save);
    setImage(file);
  };

  const onHandleAdd = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", subject);
    formData.append("cost", `${period}`);

    formData.append("description", `${day}`);
    formData.append("avatar", image);

    if (image !== "") {
      createStore(data?._id, formData)
        .then((res: any) => {
          if (res.status === 201) {
            mutate(`api/view-store/${data?._id}`);
            setLoading(false);
            toast.success("Product Uploaded");
            setPeriod(0);
            setPix("");

            setDay("");
            setSubject("");
            setImage("");
          } else {
            setLoading(false);
            toast.error(`${res?.response?.data?.message}`);
            setPeriod(0);
            setPix("");
            setDay("");
            setSubject("");
            setImage("");
          }

          setDay("");
          setSubject("");
          setImage("");
        })
        .then(() => {
          setPeriod(0);
          setPix("");
          setDay("");
          setSubject("");
        });
    } else {
      setLoading(false);
      toast.error("Image is not included");
    }
  };
  // These is the Create Store Function For MOBILE SCREENS ONLY.ENDS HERE
  return (
    <div className="text-blue-950 relative">
      <LittleHeader name={toggle ? "School's Store" : "School's items"} />

      {/* <div className="my-5 " /> */}

      <div className="flex justify-between mb-10 w-full">
        <div className=" flex items-center gap-3">
          <label
            htmlFor="add_to_store"
            className="px-5 py-2 border rounded-md m-2 overflow-hidden flex items-center justify-center text-white text-[11px] md:text-[13px] ml-0 bg-green-500 cursor-pointer hover:scale-105 transition-all duration-300 md:hidden"
          >
            Add item to Store
          </label>
          {/* For Mobile Screen Only ADD TO STORE MODAL toggle starts here */}
          <input type="checkbox" id="add_to_store" className="modal-toggle" />
          <div className="modal rounded-md" role="dialog">
            <div className="modal-box  rounded-md bg-white">
              <div className="flex items-center justify-between my-4 ">
                <p className="font-bold">Add New Items to Store</p>

                <label
                  htmlFor="add_to_store"
                  className={`${
                    data?.categoryType === "Secondary"
                      ? "hover:bg-blue-50 "
                      : "hover:bg-red-50 "
                  } transition-all duration-300  cursor-pointer rounded-full flex items-center justify-center w-6 h-6 font-bold `}
                >
                  <MdClose />
                </label>
              </div>
              <hr />
              <div className="mt-2 leading-tight text-[13px] font-medium text-left">
                Please note that by assigning this subject to this class, it
                automtically becomes one of the class must take suject.
                <br />
                <br />
                <div className="flex gap-2  items-center">
                  <p> Product Title: {subject}</p>
                  {subject && (
                    <div className="flex items-center font-bold">
                      <span>selected</span>
                      <MdCheck className="text-green-500 text-[25px] mb-1 " />
                    </div>
                  )}
                </div>
                <div className="flex gap-2  items-center">
                  <p> Product Cost: {period > 0 && period}</p>
                  {period && (
                    <div className="flex items-center font-bold">
                      <span>selected</span>
                      <MdCheck className="text-green-500 text-[25px] mb-1 " />
                    </div>
                  )}
                </div>
                <div className="flex gap-2  items-center">
                  <p> Product Description: {day.slice(0, 30)}...</p>
                  {day && (
                    <div className="flex items-center font-bold">
                      <span>selected</span>
                      <MdCheck className="text-green-500 text-[25px] mb-1 " />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="mt-10 flex gap-4 w-full justify-start">
                  <label
                    className={` text-white ${
                      data?.categoryType === "Secondary"
                        ? "bg-blue-950"
                        : "bg-red-950"
                    } border px-6 py-3 cursor-pointer rounded-md  mt-4`}
                    htmlFor="pix"
                  >
                    Upload Image
                  </label>
                  {pix && (
                    <img
                      className="w-16 h-10 border rounded-md mt-4 object-cover"
                      src={pix}
                    />
                  )}

                  <input
                    id="pix"
                    className="hidden"
                    type="file"
                    onChange={handleUpload}
                  />
                </div>
              </div>
              <div className="mt-4 w-full gap-2 flex flex-col items-center text-left">
                <div className="w-full">
                  <label className="font-medium text-[12px] mt-4">
                    Product Title <span className="text-red-500">*</span>
                  </label>

                  {/* // readSubject */}
                  <Input
                    className=" w-full mt-2 mb-8 ml-0"
                    placeholder="ProductTitle"
                    value={subject}
                    defaultValue={subject}
                    onChange={(e: any) => {
                      setSubject(e.target.value);
                    }}
                  />
                  <div className="flex w-full gap-2 mb-10">
                    <div className="w-full">
                      <label className="font-medium text-[12px]">
                        Product Cost <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={period}
                        type="number"
                        defaultValue={period}
                        placeholder="Product Cost"
                        className="w-full mt-2 ml-0"
                        onChange={(e: any) => {
                          setPeriod(e.target.value);
                        }}
                      />
                    </div>

                    <div className="w-full">
                      <label className="font-medium text-[12px]">
                        Product Description{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={day}
                        placeholder="Product Description"
                        className="ml-0 w-full mt-2"
                        defaultValue={day}
                        onChange={(e: any) => {
                          setDay(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-end transition-all duration-300">
                {subject !== "" && period !== 0 && day !== "" ? (
                  <label
                    htmlFor="add_to_store"
                    className={`${
                      data?.categoryType === "Secondary"
                        ? "bg-blue-950"
                        : "bg-red-950"
                    } text-white py-4 px-8 rounded-md cursor-pointer transition-all duration-300`}
                    onClick={() => {
                      onHandleAdd();
                    }}
                  >
                    {loading ? (
                      <div>
                        <ClipLoader size={10} color="white" />
                        <span className="ml-2">Loading....</span>
                      </div>
                    ) : (
                      "Proceed"
                    )}
                  </label>
                ) : (
                  <Button
                    name="Can't Proceed"
                    className={`bg-[lightgray] ${
                      data?.categoryType === "Secondary"
                        ? "text-blue-950"
                        : "text-green-950"
                    } mx-0 cursor-not-allowed`}
                  />
                )}
              </div>
            </div>

            <label className="modal-backdrop" htmlFor="add_to_store">
              Close
            </label>
          </div>
          {/* For Mobile Screen Only ADD TO STORE MODAL toggle ends here */}

          <Button
            name="Store View"
            className="ml-0 bg-orange-500  "
            onClick={changeView}
          />

          <Button
            name="Store Items"
            className="ml-0 bg-blue-950 "
            onClick={changeView}
          />
        </div>
        <div className=" flex items-center">
          <div className="w-full flex justify-end mb-5">
            <div
              className="mr-10 relative cursor-pointer"
              onClick={changeViewCart}
            >
              <BsCart4 size={27} />
              <div className="absolute -top-1 flex justify-center items-center bg-red-500 text-white rounded-full w-4 h-4 text-[12px] font-medium -right-1">
                {cart?.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md w-full relative">
        <div className="p-2">{toggle ? <StoreView /> : <StoreItems />}</div>

        {cartToggle && (
          <div
            className="absolute top-0 p-0 w-full min-h-full pb-10
             rounded-md bg-white"
            style={{
              // background: "rgba(73, 154, 255, 10)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(73, 154, 255, 0.3)",
            }}
          >
            <CartItemScreen />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStoreItems;
