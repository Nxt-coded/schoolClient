import useEmblaCarousel from "embla-carousel-react";
import autoPlay from "embla-carousel-autoplay";
import pic from "../../../public/pix.jpg";
import { motion } from "framer-motion";
import "./css/embla.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import { useCallback } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
// import { useGetProperties } from "../../hooks/useProperty";

const TestimoniaSlider = () => {
  //   const { data } = useGetProperties();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoPlay({ delay: 5000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla mt-20">
      <div className="mx-20 flex items-center">
        <div className="w-[50px] h-[4px] bg-blue-950 mr-5" />
        <span className="font-dinot text-[20px] md:text-[28px]">
          What People are saying
        </span>
      </div>
      <div
        className="relative embla__viewport max-w-full mt-5 mx-auto h-[400px] p-4 rounded-md "
        ref={emblaRef}
      >
        <div className="embla__container h-full w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-gradient-to-r from-transparent ">
          {Array.from({ length: 6 })?.map((el: any, i: number) => (
            <div
              key={`${i}${el}`}
              className="embla__slide rounded-md mx-1 h-[90%] flex justify-center items-center overflow-hidden  bg-gradient-to-r from-transparent via-white to-transparent relative"
            >
              <div className="absolute top-0 left-0 bg-blue-950 h-full w-full flex flex-col items-start p-4 text-white justify-center ">
                <p>
                  Awesome Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Animi magni dignissimos vero in hic vel accusantium
                  doloribus beatae ut sit incidunt iste, eaque dolore ratione
                  unde voluptatum sunt, id nam.
                </p>

                <p className="mt-5 text-[20px] font-bold">
                  Mrs Jame Okah
                  <p className="text-[15px] font-normal -mt-2 opacity-65">
                    Parent
                  </p>
                </p>
                <div className="absolute top-5 left-20 text-[40px] rotate-360 text-white">
                  <FaQuoteLeft
                    className="text-white"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="absolute bottom-5 right-20 text-[40px] rotate-180">
                  <FaQuoteLeft />
                </div>
              </div>
              {/* <img
                src={pic}
                className="object-cover w-full h-full rounded-md"
              /> */}
            </div>
          ))}
        </div>

        <motion.button
          className="embla__prev absolute top-1/3 shadow-lg border left-2  w-[100px] bg-white h-[100px] cursor-pointer rounded-full *:hover:font-semibold uppercase transition-all duration-300 flex items-center justify-center text-[28px] "
          onClick={scrollPrev}
        >
          <p className="transition-all duration-300 ">
            <IoIosArrowRoundBack />
          </p>
        </motion.button>
        <button
          className="embla__prev absolute top-1/3 shadow-lg border right-2  w-[100px] bg-white h-[100px] cursor-pointer rounded-full *:hover:font-semibold uppercase transition-all duration-300 flex items-center justify-center text-[28px] "
          onClick={scrollNext}
        >
          <p className="transition-all duration-300 ">
            <IoIosArrowRoundForward />
          </p>
        </button>
      </div>
    </div>
  );
};

export default TestimoniaSlider;
