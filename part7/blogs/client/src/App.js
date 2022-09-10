import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import { useSelector } from "react-redux";

const App = () => {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <>
      <Notification />
      {isLogged ? <Home /> : <LoginForm />}
    </>
  );
};

export default App;
