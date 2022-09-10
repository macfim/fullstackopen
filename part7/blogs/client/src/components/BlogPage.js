import BlogList from "./BlogList";
import { useRef } from "react";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

const BlogPage = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const createblog = useRef();

  const toggleCreateForum = () => {
    createblog.current.toggleVisibility();
  };

  return (
    <div>
      <Typography variant="h4">Blog app</Typography>
      <Togglable buttonLabel="new blog" ref={createblog}>
        <CreateBlog toggleCreateForum={toggleCreateForum} />
      </Togglable>
      {blogs && <BlogList />}
    </div>
  );
};

export default BlogPage;
