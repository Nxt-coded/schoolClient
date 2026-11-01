import LittleHeader from "../components/layout/LittleHeader";
import { Link, useParams } from "react-router-dom";
import { useSchoolArticle, useStudentInfo } from "./hooks/useStudentHook";
import ViewArticleScreen from "./pages/article/ViewArticleScreen";
import moment from "moment";
import articleDummy from "../assets/dummy-article-img.jpg";
import { FaEyeLowVision } from "react-icons/fa6";
import {
  MdBookmark,
  MdBookmarkAdded,
  MdFavorite,
  MdVisibility,
} from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { PiHandsClapping } from "react-icons/pi";
import { UnLazyImage } from "@unlazy/react";
document.title = "School's Article Page";

const Article = () => {
  const { view } = useParams();
  const { studentInfo } = useStudentInfo();

  const { allArticle } = useSchoolArticle(studentInfo?.schoolIDs!);

  const timer = () => {
    return Math.floor(Math.random() * (6 - 2) + 2);
  };

  return (
    <div>
      {view ? (
        <ViewArticleScreen />
      ) : (
        <>
          <LittleHeader name={document.title} />
          <div className="w-full flex justify-end">
            <Link to="/create-article">
              <div className="flex items-center gap-1">
                <IoCreateOutline size={25} />
                <p className="text-[12px] font-bold text-blue-950">
                  Create New Thought
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-10 gap-4">
            {allArticle &&
              allArticle?.map((el: any) => (
                <Link to={`${el?._id}`}>
                  <div className="card rounded-md bg-white border text-zinc-600 cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="card-body">
                      <div className="mt-[-10px] text-[15px] font-medium flex gap-3 ">
                        <div className="flex items-center gap-1 ">
                          <MdVisibility />
                          <p className="text-[12px]">{el?.view?.length}</p>
                        </div>
                        <div className="flex items-center gap-1 ">
                          <PiHandsClapping />
                          {/* <MdFavorite color="red" /> */}
                          <p className="text-[12px]">{el?.like?.length}</p>
                        </div>
                      </div>
                      <h2 className="card-title flex justify-between mt-[5px]">
                        <div className="text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap ">
                          {el?.desc}
                        </div>
                      </h2>
                      <p className="mt-[-10px] text-[10px] font-medium">
                        Writen by {el?.student}
                      </p>
                      <p className="text-[13px] leading-tight">
                        {el?.title?.length > 60
                          ? `${el?.title?.slice(0, 60)}...`
                          : el?.title}
                      </p>
                      <div className="flex justify-between gap-4 items-center h-4">
                        <div className="text-[11px] font-medium capitalize ">
                          {moment(el?.createdAt).fromNow()}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400">
                          {timer()}Mins Read
                        </p>
                      </div>
                    </div>
                    <figure>
                      <UnLazyImage
                        alt={"cover image"}
                        thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
                        src={el?.coverImage}
                        autoSizes
                        className="w-full h-[200px] object-cover"
                      />
                    </figure>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Article;
