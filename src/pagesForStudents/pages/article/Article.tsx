document.title = "Articles";
import LittleHeader from "../../../components/static/LittleHeader";
import articleDummy from "../../../assets/dummy-article-img.jpg";
import { Link, useParams } from "react-router-dom";
import ViewArticleScreen from "./ViewArticleScreen";
import { useSchoolArticle, useStudentInfo } from "../../hooks/useStudentHook";
import moment from "moment";

const Article = () => {
  const { view } = useParams();
  const { studentInfo } = useStudentInfo();

  const { allArticle } = useSchoolArticle(studentInfo?.schoolIDs!);

  return (
    <div>
      {view ? (
        <ViewArticleScreen />
      ) : (
        <>
          <LittleHeader name={document.title} />
          <div className="w-full flex justify-end">
            <Link to="/create-article">
              <button className="btn text-white bg-blue-950 hover:bg-blue-900 border-none text-[16px]">
                Add Article
              </button>
            </Link>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-10 gap-4">
            {allArticle &&
              allArticle?.map((el: any) => (
                <Link to={`${el?._id}`}>
                  <div className="card bg-white border text-zinc-600 cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="card-body">
                      <h2 className="card-title flex justify-between">
                        <div className="text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap">
                          {el?.title}
                        </div>
                      </h2>
                      <p className="">{el?.desc}</p>
                      <div className="text-[15px]">
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
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Article;
