import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import { useState, useEffect } from 'react';

const App = () => {

  const [user, setUser] = useState('');
  const [message, setMessage] = useState({});
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {

    isLogged ? setIsLogged(false) : setIsLogged(true);
  }, [user])

  const notifie = (message, type) => {
    setMessage({
      message,
      type
    });
    setTimeout(() => {
      setMessage({})
    }, 5000)
  }

  return (
    <>
      <Notification message={message} />
      {isLogged
        ? <BlogForm 
          user={user} 
          setUser={setUser} 
          notifie={notifie}
        />
        : <LoginForm
          setUser={setUser}
          notifie={notifie}
        />
      }
    </>
  );
}

export default App;