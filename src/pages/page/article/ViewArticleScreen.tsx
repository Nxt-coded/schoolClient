import dummy from "../../../assets/dummy.jpg";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import LittleHeader from "../../../components/layout/LittleHeader";
import {
  useOneArticle,
  useSchoolArticle,
  useStudentInfoData,
} from "../../../pagesForStudents/hooks/useStudentHook";
import { PiHandsClapping } from "react-icons/pi";
import {
  likeArticle,
  viewArticle,
} from "../../../pagesForStudents/api/studentAPI";
import { mutate } from "swr";
import { useSchool, useSchoolData } from "../../hook/useSchoolAuth";
import { useEffect } from "react";
import { MdVisibility } from "react-icons/md";

document.title = "Viewing Article";

const ViewArticleScreen = () => {
  const { view } = useParams();

  const { data } = useSchoolData();

  const { oneArticle } = useOneArticle(view!);
  const { allArticle } = useSchoolArticle(oneArticle?.schoolID!);
  const { studentInfoData } = useStudentInfoData(oneArticle?.schoolID);

  const myArticale = allArticle?.filter((el: any) => {
    return el.studentID === oneArticle?.studentID;
  });

  let getData = oneArticle?.like;

  let readArr = getData?.some((el: any) => {
    return el === data?._id;
  });
  let numb: number = 0;

  if (readArr) {
    numb = getData?.length - 1;
  } else {
    numb = getData?.length;
  }

  useEffect(() => {
    viewArticle(view, data?._id);
  }, []);
  return (
    <div>
      <LittleHeader name={document.title} />

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
            className="w-full text-black  mt-20"
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
                likeArticle(view, data?._id).then(() => {
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
              More from Khushi_developer
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-4">
              {myArticale?.map((props: any) => (
                <Link
                  to={`/articles/${props?._id}`}
                  key={props._id}
                  className="m-2 sm:w-[300px]"
                >
                  <img
                    alt="image"
                    src={props?.coverImage}
                    className="w-full  rounded-t-md sm:w-[300px] sm:h-[200px] object-cover border"
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
                    <p className="text-[14px] mb-5">{props?.title}</p>
                    <div className="flex gap-3">
                      <p className="flex items-center gap-1">
                        <PiHandsClapping />
                        <span className="font-semibold text-[12px]">
                          {props?.like?.length}
                        </span>
                      </p>

                      <p className="flex items-center gap-1">
                        <MdVisibility />
                        <span className="font-semibold text-[12px]">
                          {props?.view?.length}
                        </span>
                      </p>
                    </div>
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
