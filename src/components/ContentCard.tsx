import { Link } from "react-router-dom";
import { ContentDto } from "../types/types";
import { Rating } from "@mui/material";
import classes from "./ContentCard.module.css";

interface ContentCardProps {
  content: ContentDto;
}

const ContentCard = ({ content }: ContentCardProps) => {
  return (
    <Link to={`content/${content.id}`} className={classes.container}>
      <div className={classes.content}>
        <div className={classes.contentTop}>
          <img
            className={classes.thumbnail}
            src={content.thumbnailUrl}
            alt={`${content.videoTitle} video thumbnail`}
          />

          <div className={classes.contentDetail}>
            <div>
              <h5 className={classes.title}>{content.videoTitle}</h5>
              <h6 className={classes.subtitle}>{content.creatorName}</h6>
            </div>

            <h1 className={classes.comment}>
              &#10077; {content.comment} &#10078;
            </h1>
          </div>
        </div>

        <div className={classes.contentBottom}>
          <p>{content.postedBy.name}</p>
          <div className={classes.rating}>
            <Rating
              name="read-only"
              value={content.rating}
              max={content.rating}
              size="small"
              readOnly
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
