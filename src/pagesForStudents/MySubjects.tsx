import MySubjectsProps from "./static/MySubjectsProps";
import pix2 from "../assets/math bg.jpg";

const MySubjects = () => {
  const data = [
    {
      topic: "Talk to the Statue of Liberty...",
      subject: "ENGLISH",
      nextT: "Next Topics....",
      // img: pix1,
      bg: "#256349",
    },
    {
      topic: "Solving Problems....",
      subject: "MATHEMATICS",
      nextT: "Next Topics....",
      // img: pix2,
      bg: "#25aa73",
    },
    {
      topic: "Mixing Chemicals in the Laboratory...",
      subject: "Chemistry",
      nextT: "Next Topics....",
      // img: pix3,
      bg: "#005331",
    },
    {
      topic: "Knowing more about your nationality...",
      subject: "GOVERNMENT",
      nextT: "Next Topics....",
      bg: "#3e4e91",
    },
    {
      topic: "Balancing and keeping records...",
      subject: "ACCOUNT",
      nextT: "Next Topics....",
      bg: "#000f53",
    },
    {
      topic: "Managing Businesses...",
      subject: "COMMERCE",
      nextT: "Next Topics....",
      bg: "#0054b4",
    },
    {
      topic: "Study of Life...",
      subject: "BIOLOGY",
      nextT: "Next Topics....",
      // img: pix1,
      bg: "#26979b",
    },
    {
      topic: "Reading about extra-ordinary things...",
      subject: "LIT IN ENG",
      nextT: "Next Topics....",
      img: pix2,
      bg: "#00687a",
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="w-[96%] h-[100%] flex justify-center items-center ">
        <div className="w-[100%] h-[100%] grid grid-cols-2 lg:grid-cols-3 gap-7 cursor-pointer">
          {data?.map((el) => (
            <MySubjectsProps
              topic={el.topic}
              subject={el.subject}
              nextT={el.nextT}
              img={el.img}
              bg={el.bg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySubjects;
