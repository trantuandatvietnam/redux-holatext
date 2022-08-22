import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Learn yoga",
    completed: false,
    prioriry: "Medium",
  },
  {
    id: 2,
    name: "Learning",
    completed: false,
    prioriry: "Medium",
  },
  {
    id: 3,
    name: "Learn Gym",
    completed: true,
    prioriry: "High",
  },
];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    statusTodoChange: (state, action) => {
      const todoId = action.payload;
      const index = state.findIndex((item) => item.id === todoId);
      state[index].completed = !state[index].completed;
    },
  },
});

const { reducer } = todoSlice;
export const { addTodo, statusTodoChange } = todoSlice.actions;

export default reducer;
