import dummy from "../../../assets/dummy.jpg";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  useOneArticle,
  useSchoolArticle,
  useStudentInfo,
  useStudentInfoData,
} from "../../hooks/useStudentHook";
import { MdFavoriteBorder } from "react-icons/md";
document.title = "Viewing Article";
import { PiHandsClapping } from "react-icons/pi";
import axios from "axios";
import { likeArticle, viewArticle } from "../../api/studentAPI";
import { mutate } from "swr";
import { useEffect } from "react";

const ViewArticleScreen = () => {
  const { view } = useParams();
  const { studentInfo } = useStudentInfo();

  const { oneArticle } = useOneArticle(view!);
  const { studentInfoData } = useStudentInfoData(oneArticle?.studentID);
  const { allArticle } = useSchoolArticle(oneArticle?.schoolID!);

  const myArticale = allArticle?.filter((el: any) => {
    return el.studentID === oneArticle?.studentID;
  });

  let getData = oneArticle?.like;

  let readArr = getData?.some((el: any) => {
    return el === studentInfo?._id;
  });
  let numb: number = 0;

  if (readArr) {
    numb = getData?.length - 1;
  } else {
    numb = getData?.length;
  }

  useEffect(() => {
    viewArticle(view, studentInfo?._id);
  }, []);

  return (
    <div>
      <LittleHeader
        name={`viewing ${oneArticle?.student?.split(" ")[0]} Article`}
      />

      <div className="w-full flex justify-center">
        <div className="space-y-4 md:w-[95%]">
          <div className="text-[28px] text-black font-bold capitalize leading-tight">
            <strong>{oneArticle?.desc}</strong>
          </div>

          <div className="flex items-center gap-4 text-black font-semibold">
            <div className="">
              <img
                src={oneArticle?.avatar ? oneArticle?.avatar : dummy}
                alt=""
                className="avatar rounded-full h-[50px] w-[50px] object-cover"
              />
            </div>
            <div>
              <div>{oneArticle?.student ? oneArticle?.student : "s"}</div>
              <div className="">
                <span className="text-zinc-500 text-[12px]">Published:</span>{" "}
                <span className="capitalize  text-[12px]">
                  {moment(oneArticle?.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
          <div
            className="w-full text-black grid grid-cols-1  mt-20"
            dangerouslySetInnerHTML={{ __html: oneArticle?.content }}
          />
          <br />
          <br />
          <br />
          <br />
          <div className="mt-32">
            <hr />
          </div>
          <div className="flex items-center gap-2">
            {/* <MdFavoriteBorder  /> */}
            <div
              className="relative flex"
              onClick={() => {
                likeArticle(view, studentInfo?._id).then(() => {
                  mutate(`api/viewing-one-article/${view}`);
                });
              }}
            >
              <PiHandsClapping className="cursor-pointer absolute " />
              <PiHandsClapping className="text-red-500 cursor-pointer animate-ping opacity-40 absolute" />

              <span className="text-[12px] font-semibold ml-5">
                {" "}
                {readArr && "You"}{" "}
                {numb >= 1
                  ? `${readArr ? "and" : ""} ${numb} person${
                      numb > 1 ? "s" : ""
                    } have loved this write up`
                  : `have love this write up`}
              </span>
            </div>
          </div>
          <div className="mt-g32">
            <hr />
          </div>
          <div>
            <p className="text-[12px] font-semibold mb-5 underline">
              More from {oneArticle?.student}
            </p>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
              {myArticale?.map((props: any) => (
                <Link
                  to={`/articles/${props?._id}`}
                  key={props._id}
                  className="m-2 w-full lg:w-[300px]"
                >
                  <img
                    alt="image"
                    src={props?.coverImage}
                    className="w-full  rounded-t-md lg:w-[300px] lg:h-[200px] object-cover border"
                  />
                  <div className="p-2 border-r border-l border-b">
                    <div className="flex mt-2 gap-2 mb-3">
                      <img
                        alt="image"
                        src={props?.avatar}
                        className="w-[40px] h-[40px] rounded-[50%] object-cover border"
                      />
                      <div>
                        <p className="capitalize text-[12px] font-semibold">
                          {props?.student}
                        </p>
                        <p className="text-[12px]">
                          {moment(props?.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>{" "}
                    <p className="font-semibold leading-tight mb-4">
                      {props?.desc}
                    </p>
                    <p className="text-[14px] mb-5">
                      {" "}
                      {props?.title?.length > 60
                        ? `${props?.title?.slice(0, 60)}...`
                        : props?.title}
                    </p>
                    <p className="flex items-center gap-1">
                      <PiHandsClapping />
                      <span className="font-semibold text-[12px]">
                        {props?.like?.length}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewArticleScreen;
