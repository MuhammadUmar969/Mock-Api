// store.js
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/student.slice";

const store = configureStore({
  reducer: {
    student: studentReducer,
  },
  devTools: true,
});

export default store;
