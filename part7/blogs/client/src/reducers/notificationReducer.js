import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: '',
  type: ''
};

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification (state, action) {
      return action.payload;
    },
    removeNotification (state, action) {
      return initialState;
    }
  }
});

export const setNotification = (obj) => {
  return async dispatch => {
    dispatch(addNotification(obj));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000)
  }
}

export const { addNotification, removeNotification } = notificationReducer.actions;
export default notificationReducer.reducer;