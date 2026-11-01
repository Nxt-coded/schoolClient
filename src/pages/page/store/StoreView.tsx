import pix from "../../../assets/pix.jpg";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, displayCart } from "../../../global/reduxState";
import { FaCheckDouble } from "react-icons/fa6";
import { useSchoolData, useStore } from "../../hook/useSchoolAuth";
import { UnLazyImage } from "@unlazy/react";

const StoreView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state?.cart);
  const cartToggle = useSelector((state: any) => state?.cartToggle);

  const { data } = useSchoolData();
  const { store: storeData } = useStore(data?._id);

  document.title = "View Store ";

  // const changeView = () => {
  //   if (!document.startViewTransition) {
  //     dispatch(displayCart(!cartToggle));
  //   } else {
  //     document.startViewTransition(() => {
  //       dispatch(displayCart(!cartToggle));
  //     });
  //   }
  //   // displayCart;
  // };
  return (
    <div>
      {storeData?.data?.length > 0 ? (
        <div>
          {" "}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {storeData?.data?.map((props: any, i: number) => (
              <div
                key={props?._id}
                className="card min-w-60 bg-base-100 shadow-sm border rounded-md pb-0"
              >
                <figure>
                  <UnLazyImage
                    // blurhash="LKO2:N%2Tw=w]~RBVZRi};RPxuwH"
                    // srcSet="image-320w.jpg 320w, image-640w.jpg 640w"
                    alt={props?.title}
                    thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
                    src={props?.avatar ? props?.avatar : pix}
                    autoSizes
                    className="h-[290px] w-full object-cover"
                  />
                </figure>
                <div className="card-body pb-4 px-3">
                  <h2 className="card-title">{props?.title}</h2>

                  <div className="flex justify-between items-center w-full text-wrap">
                    <p className="text-[12px] font-medium break-words overflow-hidden overflow-ellipsis">
                      {props?.description}
                    </p>
                    <p className="flex justify-end font-bold">
                      {" "}
                      ₦{props?.cost?.toLocaleString()}
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
