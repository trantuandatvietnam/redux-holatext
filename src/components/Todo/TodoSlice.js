const initState = [
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
const todoListReducer = (state = initState, action) => {
  switch (action.type) {
    case "todoList/addTodo":
      return [...state, action.payload];
    case "todoList/statusTodoChange": {
      const { index, checked } = action.payload;
      const newTodoList = [...state];
      newTodoList[index].completed = checked;
      return newTodoList;
    }
    default:
      return state;
  }
};

export default todoListReducer;
