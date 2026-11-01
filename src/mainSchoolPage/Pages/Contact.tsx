import {
  AiFillDatabase,
  AiFillHome,
  AiFillPhone,
  AiOutlineAreaChart,
  AiOutlineMail,
  AiOutlinePicture,
} from "react-icons/ai";
import ContactProps from "./Props/ContactProps";
import { FaFax, FaLocationArrow } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[95%] py-[90px] flex justify-center items-center flex-col">
        <div className="text-[25px] font-bold text-blue-950">GET IN TOUCH</div>
        <div className="font-medium text-center text-blue-950 ">
          Uaerat litora, taciti quaerat dolor ligula laoreet omnis aut
          scelerisque ex fuga platea eveniet pulvinar praesent molestiae
          maiores, quidem cumque!
        </div>
        <div className="w-full py-[50px] gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center ">
          <div className="w-[100%] bg-white flex justify-center items-center flex-col">
            <ContactProps
              maintext="Number Phone"
              secondarytext="Phone 1: 0(1234) 567 89012"
              primarytext="Phone 2: 0(987) 567 890"
              icon={<AiFillPhone className="text-blue-500 text-[25px]" />}
            />
          </div>
          <div className="w-[100%] bg-white flex justify-center items-center flex-col">
            <ContactProps
              maintext="AddressStreet"
              secondarytext="Address : No 40 Baria Sreet 133/2"
              primarytext="Lagos, LG, Nigeria."
              icon={<FaLocationArrow className="text-blue-500 text-[25px]" />}
            />
          </div>
          <div className="w-[100%] bg-white flex justify-center items-center flex-col">
            <ContactProps
              maintext="Email"
              secondarytext="brighterdayscolledge@gmail.com"
              primarytext="brighterdayscolledgeforyou@gmail.com"
              icon={<AiOutlineMail className="text-blue-500 text-[25px]" />}
            />
          </div>
          <div className="w-[100%] bg-white flex justify-center items-center flex-col">
            <ContactProps
              maintext="Fax"
              secondarytext="(1234) 567 89012****"
              primarytext="(987) 567 890"
              icon={<FaFax className="text-blue-500 text-[25px]" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
