import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getCountryCallingCode } from "libphonenumber-js";
import "../../../index.css";

type PhoneNumberInputProps = {
  onChange?: (phone: string | undefined) => void;
};

const PhoneNumberInput = ({ onChange }: PhoneNumberInputProps) => {
  const [value, setValue] = useState<string | undefined>("");

  const handlePhoneChange = (phone: string | undefined) => {
    const country = "NG";
    const maxLength = 1 + 10 + getCountryCallingCode(country).length;

    if (phone && phone?.length > maxLength) {
      return;
    }

    setValue(phone);
    if (onChange) {
      onChange(phone);
    }
  };

  return (
    <div className="w-[70%] ">
      <label
        htmlFor="phone-input"
        className="block text-sm font-medium text-gray-700 mb-2 outline-none "
      >
        Phone Number
      </label>
      <PhoneInput
        id="phone-input"
        international
        defaultCountry="NG"
        value={value}
        onChange={handlePhoneChange}
        className="w-full p-3 !outline-none border border-gray-300 rounded-md focus:ring-2 focus:border-blue-500 text-sm h-full focus:outline-none focus:ring-blue-500 focus:bg-red-200 "
        placeholder="Enter your phone number "
      />
    </div>
  );
};

export default PhoneNumberInput;
