import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const reducer = {
  user: userReducer
}

const middleware = [thunk];

export const store = configureStore({
  reducer,
  middleware
})