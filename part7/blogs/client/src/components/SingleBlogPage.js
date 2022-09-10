import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { like } from "../reducers/blogsReducer";
import AddComment from "./AddComment";

const SingleBlogPage = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((item) => item.id === id)
  );

  if (!blog) return;

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url} rel="noopener noreferrer">
          {blog.url}
        </a>
        <div>
          {blog.likes} likes{" "}
          <button onClick={() => dispatch(like(blog.id, blog.likes))}>
            like
          </button>
        </div>
        added by {blog.author}
        <div>
          <h3>comments</h3>
          <AddComment blogId={blog.id} />
          <ul>
            {blog.comments.length > 0
              ? blog.comments.map((item, i) => <li key={i}>{item}</li>)
              : "no comments"}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
