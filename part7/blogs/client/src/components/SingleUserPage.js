import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleUserPage = () => {
  const id = useParams().id;
  const user = useSelector((state) =>
    state.users.find((item) => item.id === id)
  );

  if (!user) return;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.length
          ? user.blogs.map((item, i) => <li key={i}>{item.title}</li>)
          : "no blogs created by this user"}
      </ul>
    </div>
  );
};

export default SingleUserPage;
