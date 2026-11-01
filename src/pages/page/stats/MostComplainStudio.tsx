import moment from "moment";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
// import Button from "../../components/reUse/Button";
// import { deleteUserAPI } from "../../api/studioAPI/studioAPI";
// import { useAllClients } from "../../hooks/useStudio";

const MostComplainScreen = () => {
  // const { data } = useAllClients();
  const data = Array.from({ length: 2 });

  return (
    <div
      className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
      style={{ color: "var(--secondary)" }}
    >
      {/* header */}
      <div className="text-[gray] w-[800px] flex items-center gap-2 text-[12px] font-medium uppercase mb-10 px-4">
        <div className="w-[130px] border-r">Date</div>
        <div className="w-[150px] border-r">Studio Image</div>
        <div className="w-[200px] border-r">Studio Owner</div>
        <div className="w-[130px] border-r">Complain Logs</div>
        <div className="w-[180px] border-r">Action</div>
      </div>

      <div className=" w-[800px] overflow-hidden">
        {data?.map((props: any, i: number) => (
          <div>
            {i === 1 && (
              <div>
                <div
                  key={props}
                  className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="w-[130px] border-r">
                    {moment(props.createdAt).format("ll")}
                  </div>
                  {/* name */}
                  <div className="w-[150px] flex justify-center border-r">
                    <img
                      className="w-14 h-14 rounded-md border object-cover"
                      src={props.avatar ? props.avatar : pix}
                    />
                  </div>

                  <div className="w-[200px] border-r">
                    {props.firstName} {props.lastName}
                  </div>

                  <div className="w-[130px] border-r font-bold text-[20px]">
                    {props.complain ? props.complain : 0}
                  </div>

                  <div className="w-[180px] border-r">
                    <Button
                      name="Resolved"
                      className="py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                      onClick={() => {
                        // deleteUserAPI(props._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostComplainScreen;
