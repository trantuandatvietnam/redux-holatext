import { Divider, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Filters from "./components/Filters";
import { fetchTodos } from "./components/Todo/todoSlice";
import TodoList from "./components/TodoList";
import { setupServer } from "./fakeAPis";
if (process.env.NODE_ENV === "development") {
  // chỉ cấu hình ở môi trường dev
  setupServer();
}
const { Title } = Typography;
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return (
    <div className="App">
      <div
        style={{
          width: 500,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: 20,
          boxShadow: "0 0 10px 4px #bfbfbf",
          borderRadius: 5,
          height: "90vh",
        }}
      >
        <Title style={{ textAlign: "center" }}>TODO APP with REDUX</Title>
        <Filters />
        <Divider />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
