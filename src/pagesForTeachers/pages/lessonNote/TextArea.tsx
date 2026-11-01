import { FC, TextareaHTMLAttributes } from "react";

interface iTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
}

const TextArea: FC<iTextArea> = ({
  // defaultValue,
  label,
  value,
  placeholder,
  ...props
}) => {
  return (
    <div>
      <div className="mb-1 text-[12px]">{label}</div>
      <textarea
        // defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        className="w-full col-span-1 bg-white border transition-all duration-300 focus:outline-1 focus:outline outline-blue-950 rounded-md py-1 px-2 text-[13px] h-[100px] resize-none"
        {...props}
      />
    </div>
  );
};

export default TextArea;
