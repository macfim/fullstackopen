import BlogService from "../services/blogs";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";

const CreateBlog = ({ toggleCreateForum }) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(createBlog(blog));

    dispatch(
      setNotification({
        content: `a new blog ${blog.title} by ${blog.author} added`,
        type: "ok",
      })
    );
    setBlog({
      title: "",
      author: "",
      url: "",
    });
    toggleCreateForum();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            label="title"
            type="text"
            name="title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <TextField
          label="author"
            type="text"
            name="author"
            value={blog.author}
            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <TextField
          label="url"
            type="text"
            name="url"
            value={blog.url}
            onChange={(e) => setBlog({ ...blog, url: e.target.value })}
          />
        </FormGroup>
        <div>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
