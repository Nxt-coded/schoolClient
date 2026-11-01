import { useState, useEffect, FC } from "react";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import hero from "../../../assets/Hero.png";
import welcome from "../../../assets/welcomescreen.png";
import teacher from "../../../assets/ourteachers.png";
import contact from "../../../assets/contact.png";
import footer from "../../../assets/footer.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { BsCamera } from "react-icons/bs";
import Input from "../../../components/reUse/Input";

interface iNumProps {
  text: string;
}
const Props: FC<iNumProps> = ({ text }) => {
  return (
    <div className="py-2 px-4 rounded-full bg-blue-950 flex justify-center items-center text-white text-[15px]">
      {text}
    </div>
  );
};

const SchoolTheme = () => {
  const [viewMode, setViewMode] = useState<boolean>(true);

  const [startViewTransition, setStartViewTransition] =
    useState<boolean>(false);

  useEffect(() => {
    setStartViewTransition(true);
  }, []);

  const handleViewMode = () => {
    if (!document.startViewTransition) {
      setViewMode(true);
    } else {
      document.startViewTransition(() => {
        setViewMode(true);
      });
    }
  };

  const handleEditMode = () => {
    if (!document.startViewTransition) {
      setViewMode(false);
    } else {
      document.startViewTransition(() => {
        setViewMode(false);
      });
    }
  };

  const ViewHeropage = () => (
    <div
      className={`w-full border rounded-md border-blue-950 p-[20px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
        viewMode ? "opacity-100" : "opacity-0"
      } ${startViewTransition ? "transition-opacity duration-500" : ""}`}
    >
      <div className=" md:col-span-2  flex justify-center items-center flex-col">
        <div className="w-[90%] flex justify-center items-center flex-col">
          <div className="text-blue-950 font-semibold">HEADER & HERO</div>
          <img src={hero} alt="" className="object-contain" />
        </div>
        <div className="w-[90%] flex justify-center items-center flex-col">
          <div className="text-blue-950 font-semibold">WELCOME</div>
          <img src={welcome} alt="" className="object-contain" />
        </div>
        <div className="w-[90%] flex justify-center items-center flex-col">
          <div className="text-blue-950 font-semibold">OUR TEACHER</div>
          <img src={teacher} alt="" className="object-contain" />
        </div>
        <div className="w-[90%] flex justify-center items-center flex-col">
          <div className="text-blue-950 font-semibold">CONTACT US</div>
          <img src={contact} alt="" className="object-contain" />
        </div>
        <div className="w-[90%] flex justify-center items-center flex-col">
          <div className="text-blue-950 font-semibold">FOOTER</div>
          <img src={footer} alt="" className="object-contain" />
        </div>
      </div>
      <div className="">
        <div className="mb-[10px] text-blue-950">Current Theme</div>
        <div className="mb-[30px] text-[30px] md:text-[20px] text-blue-950">
          School's Workspace
        </div>
        <div className="flex gap-3 items-center">
          <button className="py-2 px-7 md:px-4 text-white rounded-md bg-blue-950">
            Save
          </button>
          <button
            className="py-2 px-7 md:px-4
          5 text-white rounded-md bg-[rgb(17,27,33)]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
  //   const [toggle, setToggle] = useState(false);
  //   const [image, setImage] = useState("");
  //   const [avatar, setAvatar] = useState("");

  //   const onHandleImage = (e: any) => {
  //     const file = e.target.files![0];
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
  //                   if (!document.startViewTransition) {
  //                     setToggle(!toggle);
  //                   } else {
  //                     document.startViewTransition(() => setToggle(!toggle));
  //                   }
  //                 }}
  //               >
  //                 <div>Header Section</div>
  //                 {toggle ? (
  //                   <FaAngleUp className="mt-1" />
  //                 ) : (
  //                   <FaAngleDown className="mt-1" />
  //                 )}
  //               </div>
  //             </div>
  //             <div className="">
  //               {toggle && (
  //                 <div>
  //                   <div className="flex items-center justify-center">
  //                     <div>Upload Your School Logo</div>
  //                     <label
  //                       htmlFor="logo-upload"
  //                       className="mb-3 px-5 py-3 border rounded-md m-2 overflow-hidden flex gap-2 items-center justify-center bg-blue-950 text-white text-[18px]"
  //                     >
  //                       <BsCamera />
  //                     </label>

  //                     <input
  //                       type="file"
  //                       id="logo-upload"
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
  //                   if (!document.startViewTransition) {
  //                     setToggle(!toggle);
  //                   } else {
  //                     document.startViewTransition(() => setToggle(!toggle));
  //                   }
  //                 }}
  //               >
  //                 <div>Hero Section</div>
  //                 {toggle ? (
  //                   <FaAngleUp className="mt-1" />
  //                 ) : (
  //                   <FaAngleDown className="mt-1" />
  //                 )}
  //               </div>
  //             </div>
  //             <div className="">
  //               {toggle && (
  //                 <div>
  //                   <div className="flex items-center justify-center">
  //                     <div>Upload Your School Logo</div>
  //                     <label
  //                       htmlFor="logo-upload"
  //                       className="mb-3 px-5 py-3 border rounded-md m-2 overflow-hidden flex gap-2 items-center justify-center bg-blue-950 text-white text-[18px]"
  //                     >
  //                       <BsCamera />
  //                     </label>

  //                     <input
  //                       type="file"
  //                       id="logo-upload"
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

  const EditHeropage = () => {
    const [headerToggle, setHeaderToggle] = useState(false);
    const [heroToggle, setHeroToggle] = useState(false);
    const [welcomeToggle, setWelcomeToggle] = useState(false);
    const [teacherToggle, setTeacherToggle] = useState(false);
    const [contactToggle, setContactToggle] = useState(false);
    const [image, setImage] = useState("");
    const [avatar, setAvatar] = useState("");
    const [heroText, setHeroText] = useState("");

    // const handleInputChange = (e: any) => {
    //   setHeroText(e.target.value);
    // };

    // const handleSave = () => {
    //   localStorage.setItem("heroText", heroText);
    // };

    useEffect(() => {
      const savedHeroText = localStorage.getItem("heroText");
      if (savedHeroText) {
        setHeroText(savedHeroText);
      }
    }, []);

    const onHandleImage = (e: any) => {
      const file = e.target.files![0];
      const readyImage = URL.createObjectURL(file);
      setImage(file);
      setAvatar(readyImage);
    };

    return (
      <div
        className={`w-full min-h-[300px] p-[20px] rounded-md border border-blue-950 grid grid-cols-1  absolute top-[170px] ${
          !viewMode ? "opacity-100" : "opacity-0"
        } ${startViewTransition ? "transition-opacity duration-500" : ""}`}
      >
        <div className="">
          <div className=" items-center mb-2">
            <div className="font-semibold text-blue-950 mb-5 text-[20px]">
              LandingPage Layouts
            </div>
          </div>
          {/* Header Section */}
          <div className="flex items-center cursor-pointer mb-2 gap-4">
            <div className="flex items-center gap-1 flex-col ">
              <div className="flex items-center mb-3 gap-2">
                <Props text="1" />
                <div
                  className="flex gap-1 text-blue-950 items-center cursor-pointer"
                  onClick={() => {
                    if (!document.startViewTransition) {
                      setHeaderToggle(!headerToggle);
                      setHeroToggle(false);
                    } else {
                      document.startViewTransition(() => {
                        setHeaderToggle(!headerToggle);
                        setHeroToggle(false);
                      });
                    }
                  }}
                >
                  <div>Header Section</div>
                  {headerToggle ? (
                    <FaAngleUp className="mt-1" />
                  ) : (
                    <FaAngleDown className="mt-1" />
                  )}
                </div>
              </div>
              <div className="">
                {headerToggle && (
                  <div>
                    <div className="flex items-center justify-center">
                      <div>Upload Your School Logo</div>
                      <label
                        htmlFor="header-logo-upload"
                        className="mb-3 px-5 py-3 border rounded-md m-2 overflow-hidden flex gap-2 items-center justify-center bg-blue-950 text-white text-[18px]"
                      >
                        <BsCamera />
                      </label>

                      <input
                        type="file"
                        id="header-logo-upload"
                        className="hidden"
                        placeholder="Upload"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Header Section Ends */}

          {/* Hero Section */}
          <div className="flex items-center cursor-pointer mb-2 gap-4">
            <div className="flex items-center gap-1 flex-col ">
              <div className="flex items-center gap-2 mb-3">
                <Props text="2" />
                <div
                  className="flex gap-1 text-blue-950  items-center cursor-pointer"
                  onClick={() => {
                    if (!document.startViewTransition) {
                      setHeroToggle(!heroToggle);
                      setHeaderToggle(false);
                    } else {
                      document.startViewTransition(() => {
                        setHeroToggle(!heroToggle);
                        setHeaderToggle(false);
                      });
                    }
                  }}
                >
                  <div>Hero Section</div>
                  {heroToggle ? (
                    <FaAngleUp className="mt-1 " />
                  ) : (
                    <FaAngleDown className="mt-1" />
                  )}
                </div>
              </div>
              <div className="">
                {heroToggle && (
                  <div>
                    <div className="text-blue-950 flex items-center justify-between gap-4 flex-col mb-3 md:flex-row">
                      <div className="">Input your Main hero text</div>
                      <textarea
                        className="h-[60px] pl-2 w-[350px] text-blue-950 bg-gray-50 border border-blue-950rounded-md"
                        placeholder="The Smarter Way to Learn AnyTime.....|"
                      />
                    </div>
                    <div className="text-blue-950 flex items-center justify-between gap-4 flex-col md:flex-row">
                      <div className="">Input your Secondary hero text</div>
                      <textarea
                        className="h-[60px] pl-2 w-[350px] text-blue-950 bg-gray-50 border border-blue-950rounded-md"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                      />
                      {/* <button className="mb-3 px-3 py-2 border rounded-md m-2 overflow-hidden flex gap-2 items-center justify-center bg-blue-950 text-white text-[18px]">
                          Save
                        </button> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Hero Section Ends */}

          {/* Welcome Section */}
          <div className="flex items-center cursor-pointer mb-2 gap-4">
            <div className="flex items-center gap-1 flex-col ">
              <div className="flex items-center gap-2 mb-3">
                <Props text="3" />
                <div
                  className="flex gap-1 text-blue-950  items-center cursor-pointer"
                  onClick={() => {
                    if (!document.startViewTransition) {
                      setWelcomeToggle(!welcomeToggle);
                      setHeaderToggle(false);
                      setHeroToggle(false);
                    } else {
                      document.startViewTransition(() => {
                        setWelcomeToggle(!welcomeToggle);
                        setHeaderToggle(false);
                        setHeroToggle(false);
                      });
                    }
                  }}
                >
                  <div>Welcome Section</div>
                  {welcomeToggle ? (
                    <FaAngleUp className="mt-1 " />
                  ) : (
                    <FaAngleDown className="mt-1" />
                  )}
                </div>
              </div>
              <div className="">
                {welcomeToggle && (
                  <div>
                    <div className="text-blue-950 flex items-center justify-between gap-4 flex-col mb-3 md:flex-row">
                      <div className="">Input your Welcome text</div>
                      <textarea
                        className="h-[60px] pl-2 w-[350px] text-blue-950 bg-gray-50 border border-blue-950rounded-md"
                        placeholder="Welcome To Codelab High school"
                      />
                    </div>
                    <div className="mb-3 text-blue-950 flex items-center justify-between gap-4 flex-col md:flex-row">
                      <div className="">Input your Secondary hero text</div>
                      <textarea
                        className="h-[60px] pl-2 w-[350px] text-blue-950 bg-gray-50 border border-blue-950rounded-md"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                      />
                    </div>
                    <div className="mb-3 text-blue-950 flex items-center justify-between gap-4 flex-col md:flex-row">
                      <div className="">Teacher Card</div>
                      <textarea
                        className="h-[60px] pl-2 w-[350px] text-blue-950 bg-gray-50 border border-blue-950rounded-md"
                        placeholder="Awesome Teachers"
                      />
                    </div>
                    <div className="mb-3 text-blue-950 flex items-center justify-between gap-4 flex-col md:flex-row">
                      <div className="">Certificate Card</div>
                      <textarea
                        className="h-[60px] pl-2 w-[350px] text-blue-950 bg-gray-50 border border-blue-950rounded-md"
                        placeholder="Our Certificates"
                      />
                    </div>
                    <div className=" mb-3 text-blue-950 flex items-center justify-between gap-4 flex-col md:flex-row">
                      <div className="">Program Card</div>
                      <textarea
                        className="h-[60px] pl-2 w-[350px] text-blue-950 bg-gray-50 border border-blue-950rounded-md"
                        placeholder="Our Program"
                      />
                    </div>
                    <div className="mb-3 text-blue-950 flex items-center justify-between gap-4 flex-col md:flex-row">
                      <div className="">Student Card</div>
                      <textarea
                        className="h-[60px] pl-2 w-[350px] text-blue-950 bg-gray-50 border border-blue-950rounded-md"
                        placeholder="Our Students."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Welcome Section Ends */}

          {/* Teacher Section */}
          <div className="flex items-center cursor-pointer mb-2 gap-4">
            <div className="flex items-center gap-1 flex-col ">
              <div className="flex items-center mb-3 gap-2">
                <Props text="4" />
                <div
                  className="flex gap-1 text-blue-950 items-center cursor-pointer"
                  onClick={() => {
                    if (!document.startViewTransition) {
                      setTeacherToggle(!teacherToggle);
                      setHeroToggle(false);
                      setWelcomeToggle(false);
                      setHeaderToggle(false);
                    } else {
                      document.startViewTransition(() => {
                        setTeacherToggle(!teacherToggle);
                        setHeroToggle(false);
                        setWelcomeToggle(false);
                        setHeaderToggle(false);
                      });
                    }
                  }}
                >
                  <div>Teacher Section</div>
                  {teacherToggle ? (
                    <FaAngleUp className="mt-1" />
                  ) : (
                    <FaAngleDown className="mt-1" />
                  )}
                </div>
              </div>
              <div className="">
                {teacherToggle && (
                  <div className="flex justify-center items-center flex-col">
                    <div className="w-full flex justify-between  items-center gap-2">
                      <div>First Teacher's name</div>
                      <Input type="text" placeholder="John kennedy" />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <div>Second Teacher's name</div>
                      <Input type="text" placeholder="Jessica Egbeda" />
                    </div>
                    <div className="w-full flex justify-between  items-center gap-2">
                      <div>Third Teacher's name</div>
                      <Input type="text" placeholder="Roland George" />
                    </div>
                    <div className="w-full flex justify-between  items-center gap-2">
                      <div>Fourth Teacher's name</div>
                      <Input type="text" placeholder="Blessing Monday" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Teacher Section Ends */}

          {/* Contact Section */}
          <div className="flex items-center cursor-pointer mb-2 gap-4">
            <div className="flex items-center gap-1 flex-col ">
              <div className="flex items-center mb-3 gap-2">
                <Props text="5" />
                <div
                  className="flex gap-1 text-blue-950 items-center cursor-pointer"
                  onClick={() => {
                    if (!document.startViewTransition) {
                      setContactToggle(!contactToggle);
                      setHeroToggle(false);
                      setWelcomeToggle(false);
                      setHeaderToggle(false);
                      setTeacherToggle(false);
                    } else {
                      document.startViewTransition(() => {
                        setContactToggle(!contactToggle);
                        setHeroToggle(false);
                        setWelcomeToggle(false);
                        setHeaderToggle(false);
                        setTeacherToggle(false);
                      });
                    }
                  }}
                >
                  <div>Contact Section</div>
                  {contactToggle ? (
                    <FaAngleUp className="mt-1" />
                  ) : (
                    <FaAngleDown className="mt-1" />
                  )}
                </div>
              </div>
              <div className="">
                {contactToggle && (
                  <div className=" flex justify-center items-center flex-col">
                    <div className="flex justify-between  items-center gap-2">
                      <div>Phone Number</div>
                      <Input type="number" placeholder="+234-500-4500" />
                    </div>
                    <div className="w-full flex justify-between items-center gap-2">
                      <div>Address</div>
                      <Input type="text" placeholder="45, Apapa, Lagos" />
                    </div>
                    <div className="w-full  flex justify-between  items-center gap-2">
                      <div>Email</div>
                      <Input type="email" placeholder="contactme@mail.com" />
                    </div>
                    <div className="w-full  flex justify-between  items-center gap-2">
                      <div>Fax</div>
                      <Input type="text" placeholder="4879399137" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Contact Section Ends */}
        </div>
      </div>
    );
  };
  //  className="w-full rounded-lg border grid col-span-3 min-h-[100px] text-blue-950 "
  return (
    <div className="w-[130%] px-4 bg-white relative rounded-lg border grid col-span-3 min-h-[100px] text-blue-950 ">
      <div className="mb-5 text-blue-950 text-[25px]">Theme</div>
      <div className="mb-5 text-blue-950">
        Manage Your Themes or Select a new one
      </div>
      <div className="mb-10 w-full border-b  flex justify-start items-center gap-10 transition-all duration-300">
        <div
          className={`h-full ml-[10px] pb-1  cursor-pointer text-blue-950 flex items-center gap-2 ${
            viewMode
              ? "border-b text-black border-blue-950 transition-all duration-300"
              : ""
          }`}
          onClick={handleViewMode}
        >
          <GrView />
          View Demo Pages
        </div>
        <div
          className={`h-full cursor-pointer pb-1 text-blue-950 flex items-center gap-2 ${
            viewMode
              ? ""
              : "border-b border-blue-950 transition-all duration-300"
          }`}
          onClick={handleEditMode}
        >
          <FiEdit />
          Edit Demo Pages
        </div>
      </div>

      {/* View HeroPage Section */}
      <ViewHeropage />

      {/* Edit HeroPage Section */}
      <EditHeropage />
    </div>
  );
};

export default SchoolTheme;
