import { Button, Col, Input, Row, Select, Tag } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../redux/actions";
import { todoRemainingSelector } from "../../redux/selectors";
import Todo from "../Todo";

export default function TodoList() {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState("");
  const [prioriry, setPrioriry] = useState("Medium");
  const todoList = useSelector(todoRemainingSelector);

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

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList.length > 0 ? (
          todoList.map((todo, index) => (
            <Todo
              todoId={todo.id}
              key={todo.id}
              name={todo.name}
              prioriry={todo.prioriry}
              completed={todo.completed}
            />
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
