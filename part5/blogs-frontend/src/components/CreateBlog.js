import BlogService from '../services/blogs';
import { useState } from 'react';

const CreateBlog = ({token, notifie, toggleCreateForum}) => {

  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  });

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await BlogService.create(blog, token);

      notifie(`a new blog ${blog.title} by ${blog.author} added`, 'ok')
      setBlog({
        title: '',
        author: '',
        url: ''
      });
      toggleCreateForum();
    } catch(e) {
      
      notifie('missing fields', 'error');
    }
  } 

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={e => setBlog({...blog, title: e.target.value})}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              name="author"
              value={blog.author}
              onChange={e => setBlog({...blog, author: e.target.value})}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              name="url"
              value={blog.url}
              onChange={e => setBlog({...blog, url: e.target.value})}
            />
          </label>
        </div>
        <div>
          <button type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;