import { removeUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);

  const handleLogout = () => dispatch(removeUser());

  return (
    <AppBar position="static" style={{ background: "lightgrey" }}>
      <ToolBar>
        <Stack
          direction="row"
          spacing={2}
        >
          <NavLink to="/">
            <Typography variant="h6">
              blogs
            </Typography>
          </NavLink>
          <NavLink to="/users">
            <Typography variant="h6">
              users
            </Typography>
          </NavLink>
          <Typography color="primary">{name} logged in</Typography>
          <Button variant="contained" onClick={handleLogout}>
            logout
          </Button>
        </Stack>
      </ToolBar>
    </AppBar>
  );
};

export default NavigationBar;
