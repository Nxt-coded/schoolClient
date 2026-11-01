import React from "react";

const UnlockScreen = () => {
  const data = [
    {
      count: 1200,
      title: "Satisfied Customers",
    },
    {
      count: 25,
      title: "Schools",
    },

    {
      count: 2,
      title: "Communities Entered",
    },
    // {
    //   count: 100,
    //   title: "Teachers",
    // },
  ];
  return (
    <div className="mt-5 text-blue-950 w-[95%]">
      <div className="mx-2 md:mx-20 grid grid-cols-1 md:grid-cols-5 gap-2 w-[94%] ">
        <div className="col-span-2 rounded-lg  gap-2">
          <div className="flex col-span-2 ">
            <p className=" border-l-2 pl-2 border-blue-950 text-[18px] capitalize font-extralight mb-5">
              Unlocking the true potential of Education with cutting edge
              technology
            </p>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-2 sm:grid-cols-3 ">
          {data?.map((props: any) => (
            <div className=" m-2 px-2 flex flex-col items-center l">
              <p className="font-semibold text-[25px] mt-2">{props.count}+</p>
              <p className="text-[15px] text-center mt-2 break-words">
                {props?.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnlockScreen;
