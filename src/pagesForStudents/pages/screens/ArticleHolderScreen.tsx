import { Link, useParams } from "react-router-dom";
import moment from "moment";
import articleDummy from "../../../assets/dummy-article-img.jpg";
import { useSchoolArticle, useStudentInfo } from "../../hooks/useStudentHook";
import ViewArticleScreen from "../article/ViewArticleScreen";
document.title = "School's Article Page";

const ArticleHolderScreen = () => {
  const { view } = useParams();
  const { studentInfo } = useStudentInfo();

  const { allArticle } = useSchoolArticle(studentInfo?.schoolIDs!);

  return (
    <div>
      {/* {view ? (
        <ViewArticleScreen />
      ) : ( */}
      <>
        <div className="w-full mt-6">
          {allArticle &&
            allArticle?.map((el: any, i: any) => (
              <div>
                {i < 1 && (
                  <Link to={`/articles/${el?._id}`}>
                    <div className="card  rounded-md bg-white border text-zinc-600 cursor-pointer hover:shadow-xl transition-all duration-300">
                      <div className="card-body">
                        <h2 className="card-title flex justify-between">
                          <div className="text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap">
                            {el?.desc}
                          </div>
                        </h2>
                        <p className="text-[13px]">{el?.title}</p>
                        <div className="text-[12px] font-semibold">
                          {moment(el?.createdAt).fromNow()}
                        </div>
                      </div>
                      <figure>
                        <img
                          src={el?.image ? el?.image : articleDummy}
                          alt="Article"
                          className="w-full h-full "
                        />
                      </figure>
                    </div>
                  </Link>
                )}
              </div>
            ))}
        </div>
      </>
      {/* // )} */}
    </div>
  );
};

export default ArticleHolderScreen;
