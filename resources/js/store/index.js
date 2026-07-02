// resources/js/store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import projectReducer from '../store/slices/projectSlice';
import projectDetailReducer from '../store/slices/projectDetailSlice';

// ตัวอย่าง reducer (คุณสามารถสร้าง reducer ของคุณเอง)
const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'increment':
      return { value: state.value + 1 };
    case 'decrement':
      return { value: state.value - 1 };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;