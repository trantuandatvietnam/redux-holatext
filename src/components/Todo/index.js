import { Checkbox, Row, Tag } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "./todoSlice";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ name, prioriry, completed, todoId }) {
  const [checked, setChecked] = useState(completed);
  const dispatch = useDispatch();
  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(updateTodo(todoId));
  };

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[prioriry]} style={{ margin: 0 }}>
        {prioriry}
      </Tag>
    </Row>
  );
}
