import { FC, PropsWithChildren } from "react";

interface iProps {
  tip?: string;
}

const Tooltip: FC<PropsWithChildren<iProps>> = ({ children, tip }) => {
  return (
    <div>
      <div className="md:tooltip -mt-5" data-tip={tip}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
