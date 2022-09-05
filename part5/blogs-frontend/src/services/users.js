import axios from 'axios';

const baseurl = 'http://localhost:3003/api/users';

const getAll = async () => {
  
  const response = await axios.get(baseurl);
  return response.data;
}

const getUserByUsername = async username => {

  const allUsers = await getAll();

  const user = allUsers.find(item => item.username === username);
  return user;
}

export default {
  getAll,
  getUserByUsername
}