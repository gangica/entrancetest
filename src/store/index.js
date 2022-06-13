import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { loadState, saveState } from "../helpers";
import userReducer from './reducers/userReducer';

const reducer = {
  user: userReducer
}

const middleware = [thunk];

const persistedState = loadState();

export const store = configureStore({
  reducer,
  middleware,
  preloadedState: persistedState
})

store.subscribe(() => {
  saveState(store.getState());
});