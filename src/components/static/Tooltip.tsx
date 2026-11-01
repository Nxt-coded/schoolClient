import { FC, PropsWithChildren } from "react";

interface iProps {
  tip?: string;
  side?: boolean;
}

const Tooltip: FC<PropsWithChildren<iProps>> = ({ children, tip, side }) => {
  return (
    <div className="w-full ">
      <div
        className={`tooltip ${side && "tooltip-bottom "} -mt-5 w-full  `}
        data-tip={tip}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
