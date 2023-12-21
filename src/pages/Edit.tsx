import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { host } from "../constant";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import toast from "react-hot-toast";
import useContent from "../hooks/useContent";
import Loading from "../components/Loading";
import classes from "./Edit.module.css";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { content, isLoading, error } = useContent(id || "");
  const [newRating, setNewRating] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    if (content) {
      setNewComment(content.comment);
      setNewRating(content.rating);
    }
  }, [content]);

  const handleEdit = async (event: FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${host}/content/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: newComment,
          rating: newRating,
        }),
      });
      const data = await response.json();

      if (data.statusCode >= 400) {
        throw new Error(data.message);
      }

      toast.success("Edit successful!");
      navigate(`/content/${id}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Loading />;
  if (error || !content) return <p>{error}</p>;

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Edit content</h1>
      </div>

      <form className={classes.form} onSubmit={handleEdit}>
        <div className={classes.formGroup}>
          <label>Comment (280 characters maximum)</label>
          <input
            type="text"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            required
          />
        </div>

        <div className={classes.ratingContainer}>
          <label>Rating</label>
          <div className={classes.rating}>
            <Rating
              name="simple-controlled"
              value={newRating}
              onChange={(event, newValue) => {
                if (event && newValue !== null) {
                  setNewRating(newValue);
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
          <button>Edit</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
