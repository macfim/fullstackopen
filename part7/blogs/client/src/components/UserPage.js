import { useDispatch, useSelector } from "react-redux";
import UserInformation from "./UserInformation";
import Typography from "@mui/material/Typography";

const UserPage = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  return (
    <div>
      <Typography variant="h4">Users</Typography>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => (
            <tr key={i}>
              <UserInformation user={item} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
