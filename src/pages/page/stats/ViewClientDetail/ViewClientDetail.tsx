import pix from "../../../assets/logo.png";
// import LittleHeader from "../../../components/layout/LittleHeader";
// import { useUser } from "../../../hooks/useUserID";
import { FaCheckDouble } from "react-icons/fa6";
import LittleHeader from "../../../../components/layout/LittleHeader";

const ViewClientDetail = () => {
  let counter = 0;

  return (
    <div
      className="text-blue-950 flex flex-col h-full"
      style={{ color: "var(--secondary)" }}
    >
      <LittleHeader name={` name's Details Screen`} />

      <div className="grid grid-cols-1 md:grid-cols-7 w-full gap-2 ">
        <div
          className="border rounded-md p-2  text-[13px] max-h-[400px] sticky top-5 col-span-1 sm:col-span-2 w-full
        "
        >
          <p className="mb-8">
            <span className="font-bold text-[12px] ">
              Profile: {Math.ceil(((7.1 * counter) / 100) * 280)}% completed
            </span>
            <div className="w-full h-[5px] relative">
              <div className="w-full h-full bg-neutral-200 rounded-md absolute top-0" />
              <div
                className={`h-full bg-green-500 rounded-md  absolute top-0`}
                style={{
                  width: `${Math.ceil(((7.1 * counter) / 100) * 280)}%`,
                }}
              />
            </div>
          </p>

          <div className="mb-2">
            {" "}
            Name: <span className="font-medium">name</span>
          </div>

          <div className="mb-2">
            {" "}
            Client's ID: <span className="font-medium">{"user?.code"}</span>
          </div>

          <div className="mb-2">
            {" "}
            Client's Studios:{" "}
            <span className="font-medium">{"user?.studio?.length"}</span>
          </div>

          <div className="mb-2">
            {" "}
            Client's Phone:{" "}
            <span className="font-medium">{"user?.phoneNumber"}</span>
          </div>

          <div className="mb-2">
            {" "}
            Client's email:{" "}
            <span className="font-medium break-words">{"user?.email"}</span>
          </div>

          <div className="w-full flex justify-end">
            <img
              className="h-12 w-12 rounded-full object-cover border"
              src={pix}
            />
          </div>
        </div>

        <div className="border rounded-md p-2 col-span-5">
          <div>
            <div className="flex flex-col h-full items-center justify-center p-4 pt-20">
              <FaCheckDouble />
              <p className="mt-4 text-[12px] font-medium">
                No Studio Created yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClientDetail;
