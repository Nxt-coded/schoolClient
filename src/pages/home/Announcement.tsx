import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  useSchoolAnnouncement,
  useSchoolData,
  useSchoolEvent,
  useViewSingleSession,
} from "../hook/useSchoolAuth";
import lodash from "lodash";
import moment from "moment";
import { MdChecklist } from "react-icons/md";

const Announcement = () => {
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  const { schoolAnnouncement, mutate } = useSchoolAnnouncement();
  const { schoolEvent } = useSchoolEvent();
  const { data: schoolData } = useSchoolData();
  const { sessionData } = useViewSingleSession(schoolData?.presentSessionID!);

  const termData = sessionData?.term?.[0];

  let announce = schoolAnnouncement?.announcements
    ?.filter((el: any) => {
      if (termData?.createdAt) {
        return moment(el.createdAt).isSameOrAfter(
          moment(termData?.createdAt).subtract(1, "day")
        );
      }
      return true;
    })
    ?.slice(0, 5);
  let eve = schoolEvent?.events
    ?.filter((el: any) => {
      if (termData?.createdAt) {
        return moment(el.createdAt).isSameOrAfter(
          moment(termData?.createdAt).subtract(1, "day")
        );
      }
      return true;
    })
    ?.slice(0, 5);

  let reader: Array<{}> = [];
  let value = reader.concat(announce, eve);

  const data: any = lodash.shuffle(value)?.slice(0, 5);
  const data1: any = Array.from({ length: 2 });
  // mutate(`api/view-announcement/${dataID}`, announcementData, false);
  return (
    <div className="w-90% mx-7">
      {data?.length > 0 ? (
        <Slider {...settings}>
          {data?.map((props: any, i: number) => (
            <div className="px-5" key={i}>
              <h3 className="text-[30px] ">{props?.title}</h3>
              <h3 className="text-[10px] mb-2 -mt-1 opacity-75 capitalize">
                {props?.date} &middot; {props?.status} &middot; posted data:{" "}
                {moment(props?.createdAt).fromNow()}
              </h3>
              <h3 className="text-[13px] opacity-60 font-normal h-[60px] ">
                {props?.details}
              </h3>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <MdChecklist />
          <p className="text-[12px] mt-3 capitalize">
            no Announcement or Event yet
          </p>
        </div>
      )}
    </div>
  );
};

export default Announcement;
