import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {

  const username = useSelector((state) => state.user.username);

  // const handleRemove = () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     dispatch(deleteBlog(blog.id));
  //     toggleVisibility();
  //   }
  // };

  return (
    <div
      className="blog"
      style={{
        border: "solid black",
        paddingTop: ".3rem",
        paddingBottom: ".1rem",
        marginBottom: ".3rem",
        paddingInline: ".1rem",
      }}
    >
      <div className="blog-title-author">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {" "}
      </div>
    </div>
  );
};

export default Blog;
