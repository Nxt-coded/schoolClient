import pix from "../assets/Dash.png";
import TableTag from "./TableTag";

const ViewReport = () => {
  return (
    <div className=" w-full flex justify-center items-center py-3">
      <div className=" w-[90%] md:w-[700px] rounded-lg  min-h-[300px] border-2 p-4 overflow-x-auto text-blue-950">
        <div className=" flex gap-4 mb-6">
          <div className=" w-[25%] h-[100px]">
            <img src={pix} alt="" className=" object-cover" />
          </div>
          <div className=" w-[70%] flex justify-center items-center flex-col">
            <div className=" font-bold text-lg font-serif ">
              CodeLab SkillHub College
            </div>
            <div>31 Haruna Estate Olodi-Apapa,Lagos</div>
            <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <div>Tel:09079980203,+23480234587</div>
              <div>Email:cyprianzubby01@gamil.com</div>
            </div>
          </div>
        </div>
        <div className=" flex gap-2">
          <div className=" w-[70%] ">
            <div className=" font-bold text-lg underline text-center">
              Lorem ipsum dolor sit amet.
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className=" flex ">
                Name:
                <div className="ml-1 border-b-2 capitalize flex-1 md:w-[250px]">
                  Lorem, ipsum anads.
                </div>
              </div>
              <div className=" flex">
                Gender:
                <div className=" ml-1 border-b-2 capitalize flex-1 md:w-[80px]"></div>
              </div>
            </div>
            <div className=" grid grid-cols-2 ">
              <div className="flex">
                Class:
                <div className=" ml-1 border-b-2 capitalize flex-1"></div>
              </div>
              <div className="flex">
                Session:
                <div className=" ml-1 border-b-2 capitalize flex-1"></div>
              </div>
              {/* <div className=" flex ">
                Adims NO.:
                <div className=" ml-1 border-b-2 capitalize w-[100px]"></div>
              </div> */}
            </div>
            <div className=" grid grid-cols-2 md:grid-cols-4">
              <div className="flex">
                D.O.B:
                <div className=" ml-1 border-b-2 capitalize flex-1 md:w-[100px]"></div>
              </div>
              <div className="flex">
                AGE:
                <div className=" ml-1 border-b-2 capitalize flex-1 md:w-[50px]"></div>
              </div>
              <div className=" flex">
                HT:
                <div className=" ml-1 border-b-2 capitalize flex-1 md:w-[50px]"></div>
              </div>
              <div className=" flex">
                WT:
                <div className=" ml-1 border-b-2 capitalize flex-1 md:w-[50px]"></div>
              </div>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-3">
              <div className="flex col-span-2">
                Club:
                <div className=" ml-1 border-b-2 capitalize flex-1 md:w-[250px]"></div>
              </div>
              <div className="flex">
                FAV.COL:
                <div className=" ml-1 border-b-2 capitalize flex-1 md:w-[100px]"></div>
              </div>
            </div>
          </div>
          <div className=" w-[180px] border-2 h-[130px] rounded-md">
            <img src="" alt="" />
          </div>
        </div>
        <TableTag />
      </div>
    </div>
  );
};

export default ViewReport;
