import { Link, useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Rating } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ReactPlayer from "react-player";
import moment from "moment";
import useContent from "../hooks/useContent";
import Loading from "../components/Loading";
import classes from "./Content.module.css";

const Content = () => {
  const { id } = useParams();
  const { username } = useAuth();
  const { content, isLoading, error } = useContent(id || "");

  if (isLoading) return <Loading />;
  if (error || !content) return <p>{error}</p>;

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h4 className={classes.title}>{content.videoTitle}</h4>
        <p className={classes.subtitle}>{content.creatorName}</p>
        <div className={classes.videourl}>
          <ReactPlayer url={content.videoUrl} />
        </div>

        <div className={classes.commentAll}>
          <p>&#10077; {content.comment} &#10078;</p>

          <div className={classes.commentDetail}>
            <div>
              <Rating
                name="read-only"
                value={content.rating}
                max={content.rating}
                readOnly
              />
            </div>

            <p>by {content.postedBy.name}</p>
            <p>{moment(content.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>

            {username === content.postedBy.username && (
              <Link to={`/edit/${id}`}>
                <div className={classes.edit}>
                  <EditIcon />
                  <p>Edit</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
