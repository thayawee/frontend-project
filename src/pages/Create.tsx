import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { host } from "../constant";
import toast from "react-hot-toast";
import classes from "./Create.module.css";
import StarIcon from "@mui/icons-material/Star";

const Create = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await fetch(`${host}/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoUrl,
          comment,
          rating,
        }),
      });

      toast.success("Create successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.messege);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Create new content</h1>
      </div>

      <form className={classes.form} onSubmit={handleCreate}>
        <div className={classes.formGroup}>
          <label>Video URL</label>
          <input
            type="text"
            onChange={(event) => setVideoUrl(event.target.value)}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label>Comment (280 characters maximum)</label>
          <input
            type="text"
            onChange={(event) => setComment(event.target.value)}
            required
          />
        </div>

        <div className={classes.ratingContainer}>
          <label>Rating</label>
          <div className={classes.rating}>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                if (event && newValue !== null) {
                  setRating(newValue);
                }
              }}
              emptyIcon={
                <StarIcon
                  style={{ opacity: 0.55, color: "#eae0d5" }}
                  fontSize="inherit"
                />
              }
            />
          </div>
        </div>

        <div className={classes.formGroup}>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
