import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const create = async (blog) => {

  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, blog, config);

  return response.data;
}

const updateOne = async (id, toUpdate) => {

  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.put(
    `${baseUrl}/${id}`,
    toUpdate,
    config
  );

  return response.data;
}

const deleteById = async id => {

  const config = {
    headers: {Authorization: token}
  }

  await axios.delete(
    `${baseUrl}/${id}`,
    config
  );
}

export default { 
  getAll,
  create,
  updateOne,
  deleteById,
  setToken
 }