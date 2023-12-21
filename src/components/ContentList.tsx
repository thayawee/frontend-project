import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import useContentList from "../hooks/useContentList";
import Loading from "./Loading";
import ContentCard from "./ContentCard";
import classes from "./ContentList.module.css";

const ContentList = () => {
  const { isLoggedIn } = useAuth();
  const { contentList, isLoading, error } = useContentList();

  if (isLoading) return <Loading />;
  if (error || !contentList) return <p>{error}</p>;

  return (
    <>
      <div className={classes.containerButton}>
        {isLoggedIn && (
          <Link to="/create" className={classes.button}>
            Create New Content
          </Link>
        )}
      </div>

      <div className={classes.content}>
        {contentList.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </>
  );
};

export default ContentList;
