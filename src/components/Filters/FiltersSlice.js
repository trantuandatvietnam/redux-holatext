import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  status: "All",
  prioriry: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
    priorityFilterChange: (state, action) => {
      state.prioriry = action.payload;
    },
  },
});

const { reducer } = filtersSlice;
export const { searchFilterChange, statusFilterChange, priorityFilterChange } =
  filtersSlice.actions;
export default reducer;
