import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdote';

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote (state, action) {
      state.push(action.payload);
    },
    incrementVote (state, action) {
      const anecdoteToChange = state.find(item => item.id === action.payload);
      const newAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(
        item => item.id === action.payload
        ? newAnecdote
        : item  
      );
    },
    setAnecdotes (state, action) {
      return action.payload;
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecodte = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecodte));
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(anecdote);
    dispatch(incrementVote(anecdote.id));
  }
}

export const { incrementVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;