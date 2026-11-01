import pix from "../assets/pix.jpg";
import Button from "../components/reUse/Button";

const SchoolPageHeroScreen = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-5 -z-10 gap-5 px-20 md:">
      <div className="col-span-2">
        <p className="text-[60px] font-bold leading-tight">
          Creating inspiring and engaging educational situations
        </p>
        <p>
          Our intuitive and scalable digital services promote sharing and
          collaboration among all members of the educational community.
        </p>
        <Button name="Discover us" className="bg-blue-950" />
      </div>

      <div className="col-span-3 relative">
        <div className="absolute h-full w-[100px] bg-blue-950 top-0 right-0" />
        <img
          className="w-full h-[500px] object-cover rounded-tl-full"
          src={pix}
        />
      </div>
    </div>
  );
};

export default SchoolPageHeroScreen;
