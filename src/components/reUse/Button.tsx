import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface iButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: any;
  icon?: ReactNode;
}

const Button: FC<iButtonProps> = ({ icon, name, className, ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(
        `px-5 py-2 border rounded-md m-2 overflow-hidden flex items-center justify-center text-white text-[11px] md:text-[13px]`,
        className
      )}
    >
      <div className="mr-2 text-[30px] py-0">{icon}</div>
      <div className="">{name}</div>
    </button>
  );
};

export default Button;
