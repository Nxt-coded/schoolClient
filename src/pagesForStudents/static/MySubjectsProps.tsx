import { FC } from "react";

interface iSubject {
  subject?: string;
  topic?: string;
  nextT?: string;
  img?: string;
  bg?: string;
}

const MySubjectsProps: FC<iSubject> = ({ subject, topic, nextT, img, bg }) => {
  return (
    <div
      className=" min-h-[160px] border rounded-[10px] flex justify-between flex-col p-[12px] text-white"
      style={{ backgroundImage: `url(${img})`, backgroundColor: bg }}
    >
      <div>
        <h1 className="text-[25px]">{subject}</h1>
        <p className="text-[15px]">{topic}</p>
      </div>
      <p className="text-[13px]">{nextT}</p>
    </div>
  );
};

export default MySubjectsProps;
