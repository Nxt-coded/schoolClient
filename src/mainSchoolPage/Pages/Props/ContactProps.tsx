import { FC, ReactNode } from "react";

interface iContactProps {
  maintext: string;
  primarytext: string;
  secondarytext: string;
  icon: ReactNode;
}

const ContactProps: FC<iContactProps> = ({
  maintext,
  primarytext,
  secondarytext,
  icon,
}) => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <div className="h-[70px] w-[70px] rounded-[50%] shadow-md ring-offset-2 flex justify-center items-center mb-[30px] cursor-pointer hover:border-[4px]">
          {icon}
        </div>
        <div className="text-center text-blue-950">
          <div className="font-semibold text-[22px]">{maintext}</div>
          <div className="font-medium">{secondarytext}</div>
          <div className="font-medium">{primarytext}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactProps;
