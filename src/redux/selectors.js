import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => state.todoList.todoList;
export const searchSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const priorityStatusSelector = (state) => state.filters.prioriry;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  searchSelector,
  filterStatusSelector,
  priorityStatusSelector,
  (todoList, searchTextSelector, status, priorities) => {
    return todoList.filter((todo) => {
      let statusFilter = "All";
      if (status === "Completed") {
        statusFilter = true;
      }
      if (status === "Todo") {
        statusFilter = false;
      }
      const prioriryFilter =
        priorities.length > 0 ? priorities.includes(todo.prioriry) : true;
      const isMatch =
        todo.name.toLowerCase().includes(searchTextSelector.toLowerCase()) &&
        (statusFilter === "All" ? true : todo.completed === statusFilter) &&
        prioriryFilter;
      return isMatch;
    });
  }
);
