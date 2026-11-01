import { Link, useParams } from "react-router-dom";
import moment from "moment";
import articleDummy from "../../../assets/dummy-article-img.jpg";
import { UnLazyImage } from "@unlazy/react";
import { useSchoolArticle } from "../../../pagesForStudents/hooks/useStudentHook";
import { PiHandsClapping } from "react-icons/pi";
import { MdVisibility } from "react-icons/md";
import { useTeacherInfo } from "../../hooks/useTeacher";
document.title = "School's Article Page";

const MainArticleHolderScreen = () => {
  const { view } = useParams();
  const { teacherInfo } = useTeacherInfo();

  const { allArticle } = useSchoolArticle(teacherInfo?.schoolIDs!);

  return (
    <div>
      {/* {view ? (
        <ViewArticleScreen />
      ) : ( */}
      <>
        <div className="w-full mt-6">
          <p className="text-[12px] mb-5">
            Recent Articles{" "}
            <Link to={`/view-articles`} className="font-semibold text-[14px]">
              View All
            </Link>
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {allArticle &&
              allArticle?.map((el: any, i: any) => (
                <div>
                  {i < 2 && (
                    <div className="my-2">
                      <Link className="" to={`/view-articles/${el?._id}`}>
                        <UnLazyImage
                          alt={"cover image"}
                          thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
                          src={el?.coverImage}
                          autoSizes
                          className="w-full h-[250px] rounded-t-md object-cover border"
                        />
                        <div className="p-2 border-r border-l border-b">
                          <div className="flex mt-2 gap-2 mb-3">
                            <img
                              alt="image"
                              src={el?.avatar}
                              className="w-[40px] h-[40px] rounded-[50%] object-cover border"
                            />
                            <div>
                              <p className="capitalize text-[12px] font-semibold">
                                {el?.student}
                              </p>
                              <p className="text-[12px]">
                                {moment(el?.createdAt).fromNow()}
                              </p>
                            </div>
                          </div>{" "}
                          <p className="font-semibold leading-tight mb-4">
                            {el?.desc}
                          </p>
                          <p className="text-[14px] mb-5">
                            {el?.title.length > 40
                              ? `${el?.title.slice(0, 40)}...`
                              : el?.title}
                          </p>
                          <div className="flex gap-3 text-blue-950">
                            <p className="flex items-center gap-1">
                              <PiHandsClapping />
                              <span className="font-semibold text-[12px]">
                                {el?.like?.length}
                              </span>
                            </p>

                            <p className="flex items-center gap-1">
                              <MdVisibility />
                              <span className="font-semibold text-[12px]">
                                {el?.view?.length}
                              </span>
                            </p>
                          </div>
                        </div>
                        {/* stop */}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </>
      {/* // )} */}
    </div>
  );
};

export default MainArticleHolderScreen;
