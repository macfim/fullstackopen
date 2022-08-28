import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl);

const createPerson = newPerson => axios.post(baseUrl, newPerson);

const updatePerson = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson);

const deletePerson = id => axios.delete(`${baseUrl}/${id}`);

export default {getAll, createPerson, updatePerson, deletePerson};