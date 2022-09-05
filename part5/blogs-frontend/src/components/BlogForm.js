import blogService from '../services/blogs';
import BlogList from './BlogList';
import { useState, useRef } from 'react';
import CreateBlog from './CreateBlog';
import Togglable from './Togglable';

const BlogForm = ({ user, setUser, notifie }) => {

  const [blogs, setBlogs] = useState([]);

  const createblog = useRef();

  const getUserBlogs = async () => {

    const userData = await blogService.getAll();

    setBlogs(userData);
  }

  const incrementLikes = async (blogId, blogLikes) => {
    const response = await blogService
      .updateOne(blogId, {
        likes: blogLikes + 1
      })
    ;
  }

  const toggleCreateForum = () => {
    createblog.current.toggleVisibility()
  }

  const deleteBlog = async blogId => {
    await blogService
      .deleteById(blogId)
    ;
  }

  return (
    <div>
      <h2>
        blogs
      </h2>
      <p>
        {user.name} logged in
        <button
          onClick={() => setUser('')}>
          logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={createblog}>
        <CreateBlog 
          token={user.token} 
          notifie={notifie} 
          toggleCreateForum={toggleCreateForum}
        />
      </Togglable>
      {blogs && <BlogList
        user={user} 
        blogs={blogs} 
        getUserBlogs={getUserBlogs}
        incrementLikes={incrementLikes}
        deleteBlog={deleteBlog}
      />}
    </div>
  );
}

export default BlogForm;