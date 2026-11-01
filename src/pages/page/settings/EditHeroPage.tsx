// import { FC, useEffect, useState } from "react";
// import { BsCamera } from "react-icons/bs";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

// interface iNumProps {
//   text: string;
// }
// const Props: FC<iNumProps> = ({ text }) => {
//   return (
//     <div className="py-2 px-4 rounded-full bg-blue-950 flex justify-center items-center text-white text-[15px]">
//       {text}
//     </div>
//   );
// };

// const EditHeropage = () => {
//   const [headerToggle, setHeaderToggle] = useState(false);
//   const [heroToggle, setHeroToggle] = useState(false);
//   const [image, setImage] = useState("");
//   const [avatar, setAvatar] = useState("");

//   const [viewMode, setViewMode] = useState<boolean>(true);
//   const [startViewTransition, setStartViewTransition] =
//     useState<boolean>(false);

//   useEffect(() => {
//     setStartViewTransition(true);
//   }, []);

//   const handleViewMode = () => {
//     setViewMode(true);
//   };

//   const handleEditMode = () => {
//     setViewMode(false);
//   };

//   const onHandleImage = (e: any) => {
//     const file = e.target.files[0];
//     const readyImage = URL.createObjectURL(file);
//     setImage(file);
//     setAvatar(readyImage);
//   };

//   return (
//     <div
//       className={`w-full min-h-[300px] p-[20px] rounded-md border border-black  grid grid-cols-1  absolute top-[170px] ${
//         !viewMode ? "opacity-100" : "opacity-0"
//       } ${startViewTransition ? "transition-opacity duration-500" : ""}`}
//     >
//       <div className="">
//         <div className=" items-center mb-2">
//           <div className="font-semibold text-blue-950 mb-5 text-[20px]">
//             LandingPage Layouts
//           </div>
//         </div>
//         {/* Header Section */}
//         <div className="flex items-center  bg-red-600 cursor-pointer mb-2 gap-4">
//           <div className="flex items-center gap-1 flex-col ">
//             <div className="flex items-center gap-2">
//               <Props text="1" />
//               <div
//                 className="flex gap-1 items-center cursor-pointer"
//                 onClick={() => {
//                   setHeaderToggle(!headerToggle);
//                   setHeroToggle(false); // Close hero section
//                 }}
//               >
//                 <div>Header Section</div>
//                 {headerToggle ? (
//                   <FaAngleUp className="mt-1" />
//                 ) : (
//                   <FaAngleDown className="mt-1" />
//                 )}
//               </div>
//             </div>
//             <div className="">
//               {headerToggle && (
//                 <div>
//                   <div className="flex items-center justify-center">
//                     <div>Upload Your School Logo</div>
//                     <label
//                       htmlFor="header-logo-upload"
//                       className="mb-3 px-5 py-3 border rounded-md m-2 overflow-hidden flex gap-2 items-center justify-center bg-blue-950 text-white text-[18px]"
//                     >
//                       <BsCamera />
//                     </label>

//                     <input
//                       type="file"
//                       id="header-logo-upload"
//                       className="hidden"
//                       placeholder="Upload"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* Header Section Ends */}

//         {/* Hero Section */}
//         <div className="flex items-center  bg-red-600 cursor-pointer mb-2 gap-4">
//           <div className="flex items-center gap-1 flex-col ">
//             <div className="flex items-center gap-2">
//               <Props text="1" />
//               <div
//                 className="flex gap-1 items-center cursor-pointer"
//                 onClick={() => {
//                   setHeroToggle(!heroToggle);
//                   setHeaderToggle(false); // Close header section
//                 }}
//               >
//                 <div>Hero Section</div>
//                 {heroToggle ? (
//                   <FaAngleUp className="mt-1" />
//                 ) : (
//                   <FaAngleDown className="mt-1" />
//                 )}
//               </div>
//             </div>
//             <div className="">
//               {heroToggle && (
//                 <div>
//                   <div className="flex items-center justify-center">
//                     <div>Upload Your School Logo</div>
//                     <label
//                       htmlFor="hero-logo-upload"
//                       className="mb-3 px-5 py-3 border rounded-md m-2 overflow-hidden flex gap-2 items-center justify-center bg-blue-950 text-white text-[18px]"
//                     >
//                       <BsCamera />
//                     </label>

//                     <input
//                       type="file"
//                       id="hero-logo-upload"
//                       className="hidden"
//                       placeholder="Upload"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* Hero Section Ends */}
//       </div>
//     </div>
//   );
// };

// export default EditHeropage;
