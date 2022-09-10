import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    blogs: blogsReducer
  }
})

export default store;