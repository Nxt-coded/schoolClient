import pix from "../../../assets/pix.jpg";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, displayCart } from "../../../global/reduxState";
import { FaCheckDouble } from "react-icons/fa6";
import { useStore } from "../../../pages/hook/useSchoolAuth";
import { useTeacherInfo } from "../../hooks/useTeacher";

const StoreView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const cartToggle = useSelector((state: any) => state.cartToggle);

  const { teacherInfo } = useTeacherInfo();
  const { store: storeData } = useStore(teacherInfo?.schoolIDs);

  document.title = "View Store ";

  const changeView = () => {
    if (!document.startViewTransition) {
      dispatch(displayCart(!cartToggle));
    } else {
      document.startViewTransition(() => {
        dispatch(displayCart(!cartToggle));
      });
    }
    // displayCart;
  };

  return (
    <div>
      <div className="w-full flex justify-end mb-10">
        <div className="mr-10 relative cursor-pointer" onClick={changeView}>
          <BsCart4 size={25} />
          <div className="absolute -top-1 flex justify-center items-center bg-red-500 text-white rounded-full w-4 h-4 text-[12px] font-medium -right-1">
            {cart.length}
          </div>
        </div>
      </div>

      {storeData?.data?.length > 0 ? (
        <div>
          {" "}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {storeData?.data?.map((props: any, i: number) => (
              <div
                key={props?._id}
                className="card min-w-60 bg-base-100 shadow-sm border rounded-md pb-0"
              >
                <figure>
                  <img
                    className="h-[290px] w-full object-cover"
                    src={props?.avatar ? props?.avatar : pix}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body pb-4 px-3">
                  <h2 className="card-title">{props?.title}</h2>

                  <div className="flex justify-between items-center w-full ">
                    <p className="text-[12px] font-medium">
                      {props?.description}
                    </p>
                    <p className="flex justify-end font-bold">
                      {" "}
                      ₦{props?.cost.toLocaleString()}
                    </p>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn bg-blue-950 hover:bg-blue-900 text-white rounded-md mt-4 "
                      onClick={() => {
                        dispatch(addToCart(props));
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-1 mt-3">
          <FaCheckDouble size={13} />
          <p className="mt-3 text-[12px] font-medium">
            No Items in your collection yet
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreView;
