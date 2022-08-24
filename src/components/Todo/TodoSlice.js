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
      })
      .addCase(addNewTodos.fulfilled, (state, action) => {
        state.todoList.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const indexUpdate = state.todoList.findIndex(
          (item) => item.id === action.payload.id
        );
        state.todoList[indexUpdate] = action.payload;
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
  return data.todos || [];
});

export const addNewTodos = createAsyncThunk(
  "todos/addNewTodos",
  async (todoData) => {
    const res = await fetch("/api/todoList", {
      method: "POST",
      body: JSON.stringify(todoData),
    });
    const data = await res.json();
    return data.todos;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    const res = await fetch("/api/updateTodo", {
      method: "POST",
      body: JSON.stringify(updatedTodo),
    });
    const data = await res.json();
    return data.todos;
  }
);

const { reducer } = todoSlice;
export const { addTodo, statusTodoChange } = todoSlice.actions;

export default reducer;
