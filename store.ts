import {configureStore} from '@reduxjs/toolkit';
import quotes from './sclice/crudSclice';

const rootReducers = {
  quotes,
};

const store = configureStore({
  reducer: rootReducers,
});

export type AppDispatch = typeof store.dispatch;
export default store;
