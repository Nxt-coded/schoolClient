document.title = "View Students";
// import moment from "moment"
import { useDispatch } from "react-redux";
import pix from "../../../assets/pix.jpg";
import Button from "../../../components/reUse/Button";
import LittleHeader from "../../../components/static/LittleHeader";
import { displayDelay, displayStudent } from "../../../global/reduxState";
import { Link } from "react-router-dom";

const ViewStudent = () => {
  const dispatch = useDispatch();
  const data = Array.from({ length: 7 });

  const handleDisplayStaff = () => {
    if (!document.startViewTransition) {
      dispatch(displayStudent(true));
      dispatch(displayDelay(true));
    } else {
      document.startViewTransition(() => {
        dispatch(displayDelay(true));
        dispatch(displayStudent(true));
      });
    }
  };

  return (
    <div className="">
      {/* header */}
      <div className="mb-0" />
      <LittleHeader name={"viewing all Students"} />

      <div className="mt-10" />

      <div className="flex w-full justify-end">
        <Button
          name="Add a new Student"
          className="uppercase text-[12px] font-medium bg-blue-950 py-4 px-8 hover:bg-blue-900 cursor-pointer transition-all duration-300 "
          onClick={handleDisplayStaff}
        />
      </div>
      <div
        className="py-6 px-2 border rounded-md min-w-[300px] overflow-y-hidden "
        style={{ color: "var(--secondary)" }}
      >
        <div className="text-[gray] w-[1920px] flex  gap-2 text-[12px] font-medium uppercase mb-10 px-4">
          <div className="w-[130px] border-r">Reg. Date</div>
          <div className="w-[100px] border-r">Today's Attendance</div>
          <div className="w-[100px] border-r">This team Attendance Ratio</div>
          <div className="w-[220px] border-r">Session Fee</div>

          <div className="w-[150px] border-r">student Image</div>
          <div className="w-[200px] border-r">student Name</div>

          <div className="w-[100px] border-r">student Class</div>

          <div className="w-[150px] border-r">Parent Contact</div>
          <div className="w-[200px] border-r">Address </div>

          <div className="w-[200px] border-r">Performance Ratio</div>

          <div className="w-[80px] border-r">Rate</div>
          <div className="w-[180px] border-r">View Detail</div>
        </div>

        <div className=" w-[1920px] overflow-hidden">
          {data?.map((props: any, i: number) => (
            <div>
              <div>
                <div
                  key={props}
                  className={`w-full flex items-center gap-2 text-[12px] font-medium  h-16 px-4 my-2  overflow-hidden ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className="w-[130px] border-r">{"22-22-22"}</div>

                  <div
                    className={`w-[100px] border-r ${
                      i % 2 === 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {i % 2 === 0 ? "Absent" : "Present"}
                  </div>

                  <div className="w-[100px] border-r">2:10</div>
                  <div className="w-[220px] border-r flex gap-4">
                    <div className="flex flex-col items-center">
                      <label>1st Term</label>
                      <input
                        type="checkbox"
                        className="toggle toggle-sm mt-2  bg-blue-950 border-blue-950"
                        // checked
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label>2nd Term</label>
                      <input
                        type="checkbox"
                        className="toggle toggle-sm mt-2  bg-neutral-500 border-neutral-500"
                        // checked
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label>3rd Term</label>
                      <input
                        type="checkbox"
                        className="toggle toggle-sm mt-2  bg-neutral-500 border-neutral-500"
                        // checked
                      />
                    </div>
                  </div>

                  {/* name */}
                  <div className="w-[150px] flex justify-center border-r">
                    <img
                      className="w-14 h-14 rounded-md border object-cover"
                      src={pix}
                    />
                  </div>
                  <div className="w-[200px] border-r">name</div>

                  <div className="w-[100px] border-r  ">Role</div>
                  <div className="w-[150px] border-r  ">phone</div>
                  <div className="w-[200px] border-r  ">contact</div>
                  <div className="w-[200px] border-r  ">Suject Taking</div>

                  <div className="w-[80px] border-r">3 of 5</div>

                  <Link
                    to={`student-details/:staffID`}
                    className="w-[180px] border-r"
                  >
                    <Button
                      name="View Detail"
                      className="py-3 w-[85%] bg-black text-white  hover:bg-neutral-800 transition-all duration-300"
                      onClick={() => {}}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
