import mainpic from "../assets/Child1.jpg";
// import mainpic2 from "../assets/mainimgs/Child4.jpg";
import { AiFillMessage } from "react-icons/ai";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BtnProps from "./Props/BtnProps";

const Hero = () => {
  // let images = [mainpic, mainpic2];
  // const settings = {
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   pauseOnHover: true,
  // };

  return (
    <div className=" w-full overflow-hidden">
      {/* <div className="h-full">
        <div>
          <img
            src={mainpic}
            alt=""
            className="w-full h-[90vh] object-cover dark"
          /> 
        </div>
      </div> */}
      <div></div>

      <div className="w-full flex justify-center items-center flex-col absolute top-[50%] left-[50%] doublet mt-10">
        <h1 className="text-[35px] lg:text-[50px] text-white md:text-[60px] font-bold text-center ">
          Making education a breeze for everyone!
        </h1>
        <h3 className="text-center text-white lg:text-[22px] mb-5 ">
          Check out our cool lineup of services and features crafted just for
          you. Our mission? To supercharge students and <b>YOUR</b> school with
          awesome tools and resources, making the academic hustle a whole lot
          smoother. Learn the tricks to amp up productivity, stay organized, and
          boost those learning outcomes with the magic of technology!
        </h3>
        <BtnProps text="Get Started" />
      </div>

      <div className="w-full bg-white flex justify-center items-center text-blue-950">
        <div className="w-[85%]  ">
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">
                    Transactions every 24 hours
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    44 million
                  </dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">
                    Assets under holding
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    ₦119 million
                  </dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">
                    New users annually
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    46,000
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
