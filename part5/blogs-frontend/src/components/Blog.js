import { useState } from 'react'

const Blog = ({ blog, incrementLikes, user, deleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog.id)
  }

  return (
    <div className='blog' style={{
      border: 'solid black',
      paddingTop: '.3rem',
      paddingBottom: '.1rem',
      marginBottom: '.3rem',
      paddingInline: '.1rem'
    }}>
      <div className='blog-title-author'>
        {blog.title} {!visible && blog.author}
        <button className='toggleButton' onClick={toggleVisibility}>
          {
            visible ? 'hide' : 'view'
          }
        </button>
      </div>
      {visible &&
        <div className='blog-more-info'>
          {blog.url}<br />
          likes {blog.likes}
          <button className='like-button' onClick={() => incrementLikes(blog.id, blog.likes)}>like</button><br />
          {blog.author}<br />
          {blog.user.username === user.username &&
            <button style={{
              background: 'lightblue',
              borderRadius: '5px',
            }}
              onClick={handleRemove}
            >remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog