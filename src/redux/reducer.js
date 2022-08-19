const initState = {
  filters: {
    search: "",
    status: "All",
    prioriry: [],
  },
  todoList: [
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
  ],
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "todoList/addTodo":
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case "filter/searchFilterChange":
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
