import { FC, InputHTMLAttributes } from "react";
import MainInput from "./MainInput";

interface iInputLabel extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  placeholder?: string;
  // defaultValue?: string;
}

const InputWithLabel: FC<iInputLabel> = ({
  label,
  placeholder,
  value,
  // defaultValue,
  ...props
}) => {
  return (
    <div>
      <div className="text-[12px] ">
        {label}
        <MainInput
          // defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-auto ml-0"
          value={value}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputWithLabel;
