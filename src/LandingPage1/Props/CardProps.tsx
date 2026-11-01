import { FC, ReactNode } from "react";
interface iCard {
  text: string;
  icon: ReactNode;
  title?:string
}

const CardProps: FC<iCard> = ({ text, icon, title }) => {
  return (
    <div>
      <div className="h-[400px] py-2 w-full bg-white flex justify-center items-center  shadow-md rounded-md border transition-all duration-500
      hover:text-white hover:bg-blue-950 hover:border-white group">
        <div className="w-[83%] flex justify-center items-center flex-col">
          <div className="border-[1px] mb-2 shadow-sm border-blue-800 py-4 px-5 flex justify-center items-center rounded-full group-hover:border-white text-[20px]">
            {icon}
          </div>
          <h2 className="font-semibold text-blue-950 group-hover:text-white text-[17px]">
            <div>{title}</div>
          </h2>
          <p className="text-center text-blue-950 group-hover:text-white">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardProps;
