import pix1 from "../../assets/pix1.png";
import pix2 from "../../assets/pix2.png";
import pix3 from "../../assets/pix3.png";
import pix4 from "../../assets/pix4.png";
const PeopleScreen = () => {
  const data = [
    {
      title: "Schools",
      detail:
        "utomate operations, boost efficiency and reduce overheads with the most powerful school management platform by your side.",
      images: pix1,
      color: "#FFFAEB",
    },
    {
      title: "Teachers",
      detail:
        "Create an enriching learning environment through world- class learning content along with digital tools that simplify every classroom operation.",
      images: pix2,
      color: "#EEFDFF",
    },
    {
      title: "Students",
      detail:
        "Never miss a lesson with continuous learning at your fingertips through classroom recordings, unlimited practice questions and much more.",
      images: pix3,
      color: "#F5EEFE",
    },
    {
      title: "Parents",
      detail:
        "Monitor & track your children’s progress with complete transparency and stay on top of all the school updates with ease.",
      images: pix4,
      color: "#FFF3F7",
    },
  ];
  return (
    <div className="mx-2 md:mx-20 mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 3xl:grid-cols-4 gap-4">
      {data?.map((props: any, i: number) => (
        <div
          key={i}
          className={`rounded-md p-4 overflow-hidden h-[250px] brk:h-[300px] border relative`}
          style={{ backgroundColor: `${props?.color}` }}
        >
          <div
            className="absolute top-0 w-full h-full hidden min-[375px]:block"
            style={{
              backgroundPosition: "right",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${props.images})`,
            }}
          />
          <p className="font-bold text-[29px] brk:font-medium brk:text-[25px] mb-5 ">
            {props?.title}
          </p>
          <div className="grid grid-cols-3">
            <p className="span-col-1 mb-40 relative ">
              <p className="absolute top-10 text-[14px] md:text-[18px] w-[300%] block text-black brk:w-[170%]">
                {props?.detail}
              </p>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleScreen;
