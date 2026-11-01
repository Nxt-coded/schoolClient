import AnimatedBackground from "@/components/AnimatedBG";
import React from "react";

const ImportanceScreen = () => {
  const arr = [
    {
      id: 1,
      title: "Cognitive Development",
      description:
        "STEM education helps students develop problem-solving skills by encouraging them to think critically, analyze data, and devise innovative solutions to complex problems. ",
      description2:
        "By fostering creativity and critical thinking, STEM education equips students with the cognitive tools necessary to tackle challenges in their personal lives, careers, and society as a whole.",
    },
    {
      id: 2,
      title: "Career Opportunities",
      description:
        "As the global demand for STEM professionals continues to grow, there is an increasing need for skilled workers in various industries, such as healthcare, information technology, and renewable energy. ",
      description2:
        "STEM education prepares students for high-paying jobs by providing them with the knowledge and skills required to excel in these competitive fields.",
    },
    {
      di: 3,
      title: "Economic Impact",
      description:
        "STEM is a driving force for innovation, fueling advancements in technology and scientific discoveries that improve our quality of life and economic prosperity. ",
      description2:
        "By investing in STEM education, countries can boost their national competitiveness and ensure a sustainable future.",
    },
  ];
  return (
    <div className="mx-5 md:mx-20 md:flex gap-12 my-10 justify-center ">
      <AnimatedBackground
        className="rounded-lg bg-zinc-100 dark:bg-zinc-800 "
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
        }}
        enableHover
      >
        {arr.map((el, index) => (
          <div
            key={index}
            data-id={`card-${index}`}
            className="my-10 md:my-0 border-t-[3px] border-black w-[95%] p-2 cursor-move"
          >
            <p className="mt-5 font-semibold text-[28px] ">{el.title}</p>
            <p className="text-[16px] mt-3">{el.description}</p>
            <p className="text-[16px] mt-5">{el.description2}</p>
          </div>
        ))}
      </AnimatedBackground>
    </div>
  );
};

export default ImportanceScreen;
