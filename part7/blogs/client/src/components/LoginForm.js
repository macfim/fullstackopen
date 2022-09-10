import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setUsername("");
    setPassword("");
    dispatch(setUser(username, password));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">log in to application</Typography>
      <br />
      <form onSubmit={handleLogin}>
        <Stack spacing={2}>
          <FormGroup>
            <TextField
              variant="outlined"
              label="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <TextField
              variant="outlined"
              label="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </FormGroup>
        </Stack>
      </form>
    </Container>
  );
};

export default LoginForm;
