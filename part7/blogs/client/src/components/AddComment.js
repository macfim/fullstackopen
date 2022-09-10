import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogsReducer";
import { useState } from "react";

const AddComment = ({ blogId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addComment({
        id: blogId,
        comment: comment,
      })
    );
    setComment("");
  };

  const handleChange = ({ target }) => setComment(target.value);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={handleChange}
        placeholder="insert comment here.."
      />
      <button type="submit">add comment</button>
    </form>
  );
};

export default AddComment;
