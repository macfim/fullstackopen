import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";
import { setNotification } from "./notificationReducer";

const initialState = [];

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    addUser(state, action) {
      return [...state, action.payload];
    },
  },
});

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const res = await usersService.getAll();
      dispatch(setUsers(res));
    } catch (e) {
      dispatch(
        setNotification({
          content: e.message,
          type: "error",
        })
      );
    }
  };
};

export const addNewUser = (newUser) => {
  return async (dispatch) => {
    try {
      const res = await usersService.create(newUser);
      dispatch(addUser(res));
    } catch (e) {
      dispatch(
        setNotification({
          content: e.message,
          type: "error",
        })
      );
    }
  };
};

export const { setUsers, addUser } = usersReducer.actions;
export default usersReducer.reducer;
