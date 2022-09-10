import BlogPage from "./BlogPage";
import UserPage from "./UserPage";
import SingleUserPage from "./SingleUserPage";
import SingleBlogPage from "./SingleBlogPage";
import NavigationBar from "./NavigationBar";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../reducers/blogsReducer";
import { useEffect } from "react";
import { fetchUsers } from "../reducers/usersReducer";

const Home = () => {
  const dispatch = useDispatch();

  //fetching blogs & users
  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/:id" element={<SingleUserPage />} />
        <Route path="/" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<SingleBlogPage />} />
      </Routes>
    </div>
  );
};

export default Home;
