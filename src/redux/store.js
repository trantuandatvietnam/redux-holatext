import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../components/Filters/filtersSlice";
import todoListReducer from "../components/Todo/todoSlice";

// REDUX TOOLKIT
const store = configureStore({
  reducer: {
    filters: filtersReducer,
    todoList: todoListReducer,
  },
});

export default store;
