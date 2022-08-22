import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  todoList: [],
};

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.status = "idle";
      });
  },
});

// export function addTodoThunkCreator(todo) {
//   // thunk function - thunk action
//   return function addTodosThunk(dispatch, getState) {
//     console.log({ todo });
//     todo.name = "Hello, you passed middleware";
//     dispatch(todoSlice.actions.addTodo(todo));
//   };
// }

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("/api/todoList");
  const data = await res.json();
  console.log(data);
  return res.todoList || [];
});

const { reducer } = todoSlice;
export const { addTodo, statusTodoChange } = todoSlice.actions;

export default reducer;
