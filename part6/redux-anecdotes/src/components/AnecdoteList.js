import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotifiation } from '../reducers/notificationReducer';

const AnecdoteList = () => {

  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => {
      if (state.filter === '')
        return anecdote
      else
        return anecdote.content.toLowerCase()
          .includes(state.filter);
    })
  });

  return (
    <>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>

          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                dispatch(vote(anecdote));
                dispatch(setNotifiation(`you voted '${anecdote.content}'`, 5));
              }}>
                vote
              </button>
            </div>
          </div>
        )
      }
    </>
  );
}

export default AnecdoteList;