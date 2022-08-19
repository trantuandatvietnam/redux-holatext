import { Col, Row, Input, Button, Select, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../redux/actions";
import Todo from "../Todo";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { searchSelector, todoListSelector } from "../../redux/selectors";

export default function TodoList() {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState("");
  const [prioriry, setPrioriry] = useState("Medium");
  const [todoList, setTodoList] = useState([]);
  const todoListFromStore = useSelector(todoListSelector);
  const search = useSelector(searchSelector);

  const handleAddButtonClick = () => {
    dispatch(
      addTodo({
        id: uuidv4(),
        name: todoName,
        prioriry: prioriry,
        completed: false,
      })
    );
    setPrioriry("Medium");
    setTodoName("");
  };
  const handleChangePriority = (value) => {
    setPrioriry(value);
  };

  useEffect(() => {
    const todoData = todoListFromStore.filter((todo) => {
      const isMatch = todo.name.toLowerCase().includes(search.toLowerCase());
      return isMatch;
    });
    setTodoList(todoData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (todoListFromStore.length < 0) return;
    setTodoList(todoListFromStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList.length > 0 ? (
          todoList.map((todo) => (
            <Todo key={todo.id} name={todo.name} prioriry={todo.prioriry} />
          ))
        ) : (
          <span>Không có công việc nào phù hợp</span>
        )}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <Select
            defaultValue="Medium"
            onChange={handleChangePriority}
            value={prioriry}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button onClick={handleAddButtonClick} type="primary">
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
