import axios from 'axios';

const baseurl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseurl);
  return response.data;
}

const createNew = async anecdote => {
  const response = await axios.post(baseurl, {
    content: anecdote,
    id: getId(),
    votes: 0
  });
  return response.data;
}

const update = async (anecdote) => {
  const response = await axios.put(`${baseurl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1
  })
  return response.data;
}

export default { 
  getAll ,
  createNew,
  update
}