import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = [];

const blogsReducer = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return [...state, action.payload];
    },
    removeBlog(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    incrementLikes(state, action) {
      const blog = state.find((item) => item.id === action.payload);
      blog.likes = blog.likes + 1;
    },
    addOneComment(state, action) {
      const blog = state.find((item) => item.id === action.payload.id);
      blog.comments.push(action.payload.comment);
    },
  },
});

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogsService.getAll();
      dispatch(setBlogs(blogs));
    } catch (e) {
      dispatch(
        setNotification({
          content: "fetching failed",
          type: "error",
        })
      );
    }
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const res = await blogsService.create(newBlog);
      dispatch(addBlog(res));
    } catch (e) {
      dispatch(
        setNotification({
          content: e.message,
          type: "error",
        })
      );
    }
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    try {
      const res = await blogsService.deleteById(blogId);
      dispatch(removeBlog(blogId));
    } catch (e) {
      dispatch(
        setNotification({
          content: e.message,
          type: "error",
        })
      );
    }
  };
};

export const like = (blogId, blogLikes) => {
  return async (dispatch) => {
    try {
      await blogsService.updateOne(blogId, {
        likes: blogLikes + 1,
      });
      dispatch(incrementLikes(blogId));
    } catch (e) {
      dispatch(
        setNotification({
          content: e.message,
          type: "error",
        })
      );
    }
  };
};

export const addComment = ({ id, comment }) => {
  return async dispatch => {
    try {
      await blogsService.addComment(id, comment);
      dispatch(addOneComment({id, comment}));
    } catch(e) {
      dispatch(
        setNotification({
          content: e.message,
          type: "error",
        })
      );
    }
  }
}

export const { setBlogs, addBlog, removeBlog, incrementLikes, addOneComment } =
  blogsReducer.actions;
export default blogsReducer.reducer;
