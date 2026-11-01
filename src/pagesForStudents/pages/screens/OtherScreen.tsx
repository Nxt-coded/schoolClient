import React from "react";
import RecentPurcentScreen from "./RecentPurchases";
import { MdPlaylistAddCheck } from "react-icons/md";
import { Link } from "react-router-dom";

const OtherScreen = () => {
  return (
    <div>
      <div className="mb-5">
        <hr />
      </div>
      <div className=" rounded-md w-full  ">
        <div className="mb-4 text-[12px] text-medium capitalize">
          Top 5 Recent Purchases{" "}
          <span className="font-bold ml-5">
            <Link to="/purchase-history">View All </Link>
          </span>
        </div>

        <div className="border p-4 rounded-md">
          <RecentPurcentScreen />
        </div>
      </div>
    </div>
  );
};

export default OtherScreen;
