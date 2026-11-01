document.title = "School's Store";
import { useState } from "react";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import StoreView from "./StoreView";
import StoreItems from "./StoreItems";
import { useDispatch, useSelector } from "react-redux";
import CartItemScreen from "./CartItemScreen";
import { displayCart } from "../../../global/reduxState";
import { Toaster } from "react-hot-toast";

const ViewStoreItems = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const cartToggle = useSelector((state: any) => state.cartToggle);

  return (
    <div className="text-blue-950 relative">
      <Toaster />
      <LittleHeader name={"School's Store"} />

      <div className="my-20" />

      <div className="flex items-center mb-10">
        <Button
          name="Storing View"
          className="ml-0 bg-blue-950  "
          // onClick={changeView}
        />
      </div>

      <div className="border rounded-md w-full relative">
        <div className="p-2">
          <StoreView />{" "}
        </div>

        {cartToggle && (
          <div
            className="absolute top-0 p-0 w-full min-h-[300px] pb-10
             rounded-md backdrop-blur-1"
            style={{
              background: "white",
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
