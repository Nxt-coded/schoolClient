const TrustedBy = () => {
  const value = [
    "Accountability",
    "Innovation",
    "Efficiency",
    "Productivity",
   
  ];
  return (
    <div className="my-0 flex justify-center w-[95%] ml-8 ">
      <div className="w-full py-10 sm:py-10 ">
        <div className="mx-0 max-full px-6 lg:px-8">
          <h2 className="text-center mb-10 md:text-[24px] font-bold leading-8 text-blue-950 -ml-10 px-5 text-[20px] ">
            Trusted by Schools for the most important Decisions
          </h2>
          <div className="w-full flex justify-center ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-blue-950 gap-5 w-full place-items-center  px-5">
              {value?.map((e, i) => (
                <div
                  key={i}
                  className="w-full h-[200px] border font-medium border-gray-100 rounded-md flex items-center justify-center text-[20px] uppercase"
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
