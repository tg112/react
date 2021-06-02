import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import fetchReducer from '../features/fetch/fetchSlice';
import taskReducer from '../features/task/TaskSlice';

// configureStore内に、reducerを追加していく。裏でcombimneReducerが走っている。
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
    fetch: fetchReducer
  },
});
