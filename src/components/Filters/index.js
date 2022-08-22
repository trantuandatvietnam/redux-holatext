import { Col, Row, Input, Typography, Radio, Select, Tag } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  priorityFilterChange,
  searchFilterChange,
  statusFilterChange,
} from "./filtersSlice";

const { Search } = Input;

export default function Filters() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [priorities, setPrioriries] = useState([]);
  const dispatch = useDispatch();

  const handleChangeSeachValue = (e) => {
    const currentValue = e.target.value;
    setSearch(currentValue);
    dispatch(searchFilterChange(currentValue));
  };

  const handleChangeStatus = (e) => {
    const currentFilter = e.target.value;
    setFilterStatus(currentFilter);
    dispatch(statusFilterChange(currentFilter));
  };

  const handleChangePriority = (value) => {
    setPrioriries(value);
    dispatch(priorityFilterChange(value));
  };
  return (
    <Row justify="center">
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search
          value={search}
          onChange={handleChangeSeachValue}
          placeholder="input search text"
        />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={filterStatus} onChange={handleChangeStatus}>
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Todo">To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
          style={{ width: "100%" }}
          onChange={handleChangePriority}
          value={priorities}
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
      </Col>
    </Row>
  );
}
