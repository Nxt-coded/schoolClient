// import LittleHeader from "../../../components/static/LittleHeader";
// import pix from "../../../assets/pix.jpg";
// import { FaCheckDouble } from "react-icons/fa6";
// import { useState } from "react";

// import { updateSchoolFee } from "../../../pages/api/schoolAPIs";
// import { useDispatch } from "react-redux";
// import { useSchoolData, useSchoolSchoolFees } from "../../hook/useSchoolAuth";
// // import { mutate } from "swr";

// const SchoolFeesHistoryScreen = () => {
//   const dispatch = useDispatch();
//   const { data } = useSchoolData();

//   const { schoolFeeRecord, mutate } = useSchoolSchoolFees(data?._id);

//   const [stateArray, setStateArray] = useState<string[]>([]);

//   console.log(schoolFeeRecord)

//   return (
//     <div>
//       <LittleHeader name={"School Fees History"} />

//       <div className="mb-28" />

//       <div className="mb-28" />

//       <div
//         className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
//         // style={{ color: "var(--secondary)" }}
//       >
//         <div className="text-[gray] w-[900px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
//           <div className="w-[180px] border-r">Payment Date</div>

//           <div className="w-[250px] border-r">Student Info</div>
//           <div className="w-[130px] border-r">School Fee Paid</div>

//           <div className="w-[150px] border-r ml-1">Payment Receipt Code</div>

//           <div className="w-[150px] border-r">confirm</div>
//           <div className="w-[80px] border-r">Remark</div>
//         </div>

//         {/* Here */}
//         {schoolFeeRecord?.length > 0 ? (
//           <div className=" w-[900px] overflow-hidden ">
//             {schoolFeeRecord && schoolFeeRecord?.map((props: any, i: number) => (
//               <div>
//                 <div>
//                   <div
//                     key={props}
//                     className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
//                       i % 2 === 0 ? "bg-slate-50" : "bg-white"
//                     }`}
//                   >
//                     <div className="w-[180px] border-r">{props?.date}</div>

//                     <div className={`w-[250px] border-r `}>
//                       <div key={i} className="">
//                         <div className="flex items-center gap-3 my-2">
//                           <div className="avatar">
//                             <div className="mask mask-squircle w-12 h-12">
//                               <img
//                                 src={props?.avatar ? props?.avatar : pix}
//                                 alt="Avatar"
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <div className="font-bold">{props.studentName}</div>
//                             <div className="text-[12px] opacity-50 ">
//                               {props.studentClass} - {props?.term}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="w-[130px] border-r ml-1">
//                       ₦{props?.amount?.toLocaleString()}
//                     </div>

//                     {/* name */}

//                     <div className="w-[145px] border-r ml-1 uppercase font-bold">
//                       {props?.reference}
//                     </div>

//                     <div
//                       className="w-[150px] border-r pl-1 "
//                       onClick={() => {
//                         stateArray.push(props?._id);
//                       }}
//                     >
//                       <div>
//                         <label
//                           htmlFor="my_modal_6"
//                           className={`btn text-[12px] font-medium text-white
//                           ${props.confirm ? "bg-blue-950" : "bg-red-600"}
//                           ${
//                             props.confirm
//                               ? "hover:bg-blue-900"
//                               : "hover:bg-red-500"
//                           }
//                           w-[95%] capitalize
//                           `}
//                         >
//                           {props.confirm ? "confirm" : "not yet confirm"}
//                         </label>

//                         {/* Put this part before </body> tag */}
//                         <input
//                           type="checkbox"
//                           id="my_modal_6"
//                           className="modal-toggle"
//                         />
//                         <div className="modal" role="dialog">
//                           <div className="modal-box">
//                             <h3 className="font-bold text-lg">
//                               Confirm this payment
//                             </h3>
//                             <p className="py-4">
//                               Are you sure you want to confirm this payment?
//                               <br />
//                               {stateArray[0]}
//                             </p>
//                             <div className="modal-action">
//                               <label
//                                 htmlFor="my_modal_6"
//                                 className="btn px-8 bg-green-500 text-white hover:bg-green-600 "
//                                 onClick={() => {
//                                   updateSchoolFee(stateArray[0])
//                                     .then((res) => {
//                                       setStateArray([]);
//                                       let x = setTimeout(() => {
//                                         setStateArray([]);

//                                         clearTimeout(x);
//                                       }, 10);
//                                     })
//                                     .then(() => {
//                                       mutate(
//                                         `api/update-school-school-fee-comfirm/${stateArray[0]}`
//                                       );
//                                     });
//                                 }}
//                               >
//                                 Yes
//                               </label>
//                               <label
//                                 htmlFor="my_modal_6"
//                                 className="btn px-8 bg-red-500 text-white hover:bg-red-600 "
//                                 onClick={() => {
//                                   setStateArray([]);
//                                   let x = setTimeout(() => {
//                                     setStateArray([]);
//                                     console.log("view: ", stateArray);

//                                     clearTimeout(x);
//                                   }, 10);
//                                 }}
//                               >
//                                 No
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="w-[80px] border-r pl-6 ">
//                       <input
//                         id="my_modal_6"
//                         checked={props?.confirm}
//                         type="checkbox"
//                         className={`checkbox ${
//                           props?.confirm ? "checkbox-success" : "checkbox-error"
//                         }`}
//                         // onClick={() => {
//                         //   updateSchoolFee(props?._id).then((res) => {});
//                         //   mutate();
//                         // }}

//                         onClick={() => {
//                           updateSchoolFee(props?._id)
//                             .then((res) => {
//                               // Optionally handle the response if needed
//                               console.log(
//                                 "School fee updated successfully:",
//                                 res
//                               );
//                             })
//                             .then(() => {
//                               mutate(
//                                 async (currentData: any) => {
//                                   // Update the cache with the new data
//                                   const updatedData = (currentData || []).map(
//                                     (item: any) => {
//                                       if (item._id === props?._id) {
//                                         return { ...item, confirm: true }; // Update the `confirm` status
//                                       }
//                                       return item;
//                                     }
//                                   );
//                                   return updatedData;
//                                 },
//                               // { revalidate: true }
//                               );
//                             })
//                             .catch((error) => {
//                               console.error(
//                                 "Error updating school fee:",
//                                 error
//                               );
//                             });
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center">
//             <FaCheckDouble />
//             <p className="mt-2 text-[15px]">
//               You haven't reported any complains yet
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SchoolFeesHistoryScreen;

import LittleHeader from "../../../components/static/LittleHeader";
import pix from "../../../assets/pix.jpg";
import { FaCheckDouble } from "react-icons/fa6";
import { useState } from "react";

import { updateSchoolFee } from "../../../pages/api/schoolAPIs";
import { useDispatch } from "react-redux";
import { useSchoolData, useSchoolSchoolFees } from "../../hook/useSchoolAuth";

const SchoolFeesHistoryScreen = () => {
  const dispatch = useDispatch();
  const { data } = useSchoolData();

  const { schoolFeeRecord, mutate } = useSchoolSchoolFees(data?._id);

  const [stateArray, setStateArray] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // Track which payment is being updated

  console.log(schoolFeeRecord);

  // Handle payment confirmation
  const handleConfirmPayment = async (paymentId: string) => {
    setIsUpdating(paymentId);

    try {
      await updateSchoolFee(paymentId);

      // Optimistically update the cache
      mutate(
        (currentData: any) => {
          if (!currentData) return currentData;

          return currentData.map((item: any) => {
            if (item._id === paymentId) {
              return { ...item, confirm: true };
            }
            return item;
          });
        }
        // { revalidate: false } // Don't revalidate immediately to avoid flashing
      );

      // Clear the state array after successful update
      setStateArray([]);
    } catch (error) {
      console.error("Error updating school fee:", error);
      // Optionally show error message to user
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div>
      <LittleHeader name={"School Fees History"} />

      <div className="mb-28" />

      <div className="mb-28" />

      <div className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden ">
        <div className="text-[gray] w-[900px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[180px] border-r">Payment Date</div>
          <div className="w-[250px] border-r">Student Info</div>
          <div className="w-[130px] border-r">School Fee Paid</div>
          <div className="w-[150px] border-r ml-1">Payment Receipt Code</div>
          <div className="w-[150px] border-r">confirm</div>
          <div className="w-[80px] border-r">Remark</div>
        </div>

        {/* Add safe check and provide fallback */}
        {schoolFeeRecord && schoolFeeRecord.length > 0 ? (
          <div className=" w-[900px] overflow-hidden ">
            {schoolFeeRecord.map((props: any, i: number) => (
              <div key={props._id}>
                {" "}
                {/* Add proper key */}
                <div>
                  <div
                    className={`w-full flex items-center gap-2 text-[12px] font-medium  min-h-16 px-4 my-2  overflow-hidden ${
                      i % 2 === 0 ? "bg-slate-50" : "bg-white"
                    }`}
                  >
                    <div className="w-[180px] border-r">{props?.date}</div>

                    <div className={`w-[250px] border-r `}>
                      <div className="">
                        <div className="flex items-center gap-3 my-2">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={props?.avatar ? props?.avatar : pix}
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{props.studentName}</div>
                            <div className="text-[12px] opacity-50 ">
                              {props.studentClass} - {props?.term}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[130px] border-r ml-1">
                      ₦{props?.amount?.toLocaleString()}
                    </div>

                    <div className="w-[145px] border-r ml-1 uppercase font-bold">
                      {props?.reference}
                    </div>

                    <div
                      className="w-[150px] border-r pl-1 "
                      onClick={() => {
                        setStateArray([props?._id]); // Replace array instead of push
                      }}
                    >
                      <div>
                        <label
                          htmlFor={`modal_${props._id}`} // Unique modal ID
                          className={`btn text-[12px] font-medium text-white 
                          ${props.confirm ? "bg-blue-950" : "bg-red-600"}
                          ${
                            props.confirm
                              ? "hover:bg-blue-900"
                              : "hover:bg-red-500"
                          }
                          w-[95%] capitalize
                          ${isUpdating === props._id ? "loading" : ""}
                          `}
                          // disabled={isUpdating === props._id}
                        >
                          {isUpdating === props._id
                            ? "Updating..."
                            : props.confirm
                            ? "confirmed"
                            : "not yet confirmed"}
                        </label>

                        {/* Unique modal for each payment */}
                        <input
                          type="checkbox"
                          id={`modal_${props._id}`}
                          className="modal-toggle"
                        />
                        <div className="modal" role="dialog">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Confirm this payment
                            </h3>
                            <p className="py-4">
                              Are you sure you want to confirm this payment?
                              <br />
                              Payment ID: {props._id}
                            </p>
                            <div className="modal-action">
                              <label
                                htmlFor={`modal_${props._id}`}
                                className="btn px-8 bg-green-500 text-white hover:bg-green-600 "
                                onClick={() => handleConfirmPayment(props._id)}
                                // disabled={isUpdating === props._id}
                              >
                                {isUpdating === props._id
                                  ? "Updating..."
                                  : "Yes"}
                              </label>
                              <label
                                htmlFor={`modal_${props._id}`}
                                className="btn px-8 bg-red-500 text-white hover:bg-red-600 "
                                onClick={() => setStateArray([])}
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[80px] border-r pl-6 ">
                      <input
                        checked={props?.confirm}
                        type="checkbox"
                        className={`checkbox ${
                          props?.confirm ? "checkbox-success" : "checkbox-error"
                        }`}
                        disabled={isUpdating === props._id}
                        onChange={() => handleConfirmPayment(props._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FaCheckDouble />
            <p className="mt-2 text-[15px]">
              {schoolFeeRecord === undefined || schoolFeeRecord === null
                ? "Loading payment records..."
                : "You haven't reported any payments yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolFeesHistoryScreen;
