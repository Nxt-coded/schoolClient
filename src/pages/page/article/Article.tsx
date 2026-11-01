document.title = "Articles";
import LittleHeader from "../../../components/static/LittleHeader";
import articleDummy from "../../../assets/dummy-article-img.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import ViewArticleScreen from "./ViewArticleScreen";
import moment from "moment";
import { useSchoolCookie } from "../../hook/useSchoolAuth";
import { MdDelete } from "react-icons/md";
import { useSchoolArticle } from "../../../pagesForStudents/hooks/useStudentHook";
import { deleteArticle } from "../../api/schoolAPIs";

const Article = () => {
  const { view } = useParams();
  const { dataID } = useSchoolCookie();
  const { allArticle } = useSchoolArticle(dataID);
  const navigate = useNavigate();

  return (
    <div>
      {view ? (
        <ViewArticleScreen />
      ) : (
        <>
          <LittleHeader name={document.title} />
          <div className="w-full flex justify-end"></div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-10 gap-4">
            {allArticle &&
              allArticle?.map((el: any) => (
                <Link to={`${el?._id}`}>
                  <div className="card bg-white border text-zinc-600 cursor-pointer hover:shadow-xl transition-all duration-300 h-[360px] group">
                    <div className="card-body">
                      <h2 className="card-title flex justify-between">
                        <div className="text-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap tooltip">
                          {el?.title}
                        </div>
                      </h2>
                      <p className="">{el?.desc}</p>
                      <div className="text-[15px] w-full flex items-center justify-between">
                        <div>{moment(el?.createdAt).fromNow()}</div>
                        <div
                          className="hidden group-hover:flex duration-300 transition-all"
                          onClick={() => {
                            deleteArticle(dataID, el?.student, el?._id).then(
                              (res) => {
                                navigate("/view-articles");
                              }
                            );
                          }}
                        >
                          <MdDelete size={21} />
                        </div>
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
