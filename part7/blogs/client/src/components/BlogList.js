import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  if (user) return (
    <div style={{ background: 'lightgrey' }}>
      {blogs
        .filter((item) => item.user.id === user.id)
        .map((item, i) => (
          <Blog key={i} blog={item} />
        ))
      }
    </div>
  );

  return (
    <div>
      {blogs
        // .sort()
        .map((item, i) => (
          <Blog key={i} blog={item} />
        ))}
    </div>
  );
};

export default BlogList;
