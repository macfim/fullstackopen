import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotifiation } from '../reducers/notificationReducer';

const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const newAnecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotifiation(`anecdote ${newAnecdote} added`, 5));
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;