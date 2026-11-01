import { FC } from "react";
import pix from "../../../assets/pix.jpg";

interface iProps {
  props?: any;
  name?: boolean;
  contact?: boolean;
  image?: boolean;
  owner?: boolean;
  cost?: boolean;
  costData?: number;
}

const UserSingleDataActive: FC<iProps> = ({ image, name }) => {
  return (
    <div>
      <div>
        {" "}
        {name && (
          <div>
            {/* {user?.firstName} {user?.lastName}{" "} */}
            name
          </div>
        )}
      </div>
      <div>
        {image && (
          <img className="w-14 h-14 rounded-md border object-cover" src={pix} />
        )}
      </div>
      <div>contact </div>
      <div> owner</div>
    </div>
  );
};

export default UserSingleDataActive;
