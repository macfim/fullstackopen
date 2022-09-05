import Blog from './Blog';
import { useEffect } from 'react';

const BlogList = ({ blogs, getUserBlogs, incrementLikes, user, deleteBlog }) => {

  useEffect(() => {
    getUserBlogs()
  }, [])

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((item, i) => (
          <Blog
            key={i}
            blog={item}
            incrementLikes={incrementLikes}
            user={user}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
}

export default BlogList;