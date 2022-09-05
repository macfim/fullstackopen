import { useState } from 'react';
import loginService from '../services/login';
import blogsService from '../services/blogs';
import PropTypes from 'prop-types';

const LoginForm = ({ setUser, notifie }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });
      setUser(user);
      setUsername('');
      setPassword('');
      blogsService.setToken(user.token);
    } catch (e) {
      notifie('Wrong username or password', 'error');
    }
  };

  return (
    <div style={{
      marginBlock: '1rem'
    }}>
      <h2>
        log in to application
      </h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username
            <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes =  {
  setUser: PropTypes.func.isRequired,
  notifie: PropTypes.func.isRequired
}

export default LoginForm;