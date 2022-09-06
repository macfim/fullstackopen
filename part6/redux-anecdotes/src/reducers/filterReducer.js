import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter (state, action) {
      return action.payload;
    }
  }
})

export const { addFilter } = filterReducer.actions;
export default filterReducer.reducer;