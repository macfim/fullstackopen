import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserInformation = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const userBlogs = blogs.filter((item) => item.user.id === user.id);

  return (
    <>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{userBlogs.length}</td>
    </>
  );
};

export default UserInformation;
