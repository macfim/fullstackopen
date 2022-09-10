import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";
import blogsService from '../services/blogs';

const initialState = {
  username: "",
  name: "",
  token: "",
  isLogged: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      return {
        isLogged: true,
        ...action.payload,
      };
    },
    removeUser(state, action) {
      return initialState;
    },
  },
});

export const setUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(addUser(user));
      blogsService.setToken(user.token);
    } catch (e) {
      dispatch(setNotification({
        content: 'wrong username or/and password',
        type: 'error'
      }))
    }
  };
};

export const { addUser, removeUser } = userReducer.actions;
export default userReducer.reducer;
