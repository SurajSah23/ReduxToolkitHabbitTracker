import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habit-slice";

// Configure the store
const store = configureStore({
  reducer: {
    habits: habitReducer,
  },
});

// Export the store
export default store;
