import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification (state, action) {
      return action.payload;
    },
    removeNotification () {
      return ''
    }
  }
})

export const setNotifiation = (message, timeOut) => {
  return async dispatch => {
    dispatch(addNotification(message));
    setTimeout(() => dispatch(removeNotification()), timeOut * 1000);
  }
}

export const { addNotification, removeNotification } = notificationReducer.actions;
export default notificationReducer.reducer;