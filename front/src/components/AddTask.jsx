import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTaskToServer, addTaskTodoList } from "../redux/slices/taskSlice";
import { useDispatch } from "react-redux";

export const AddTask = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const addTitle = (e) => {
    setTitle(e.target.value);
  };
  const addText = (e) => {
    setText(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    // dispatch(
    //   addTaskTodoList({
    //     title,
    //     text,
    //   })
    // );
    dispatch(
      addTaskToServer({
        title,
        text,
      })
    );
    setTitle("");
    setText("");
  };
  return (
    <div className="d-flex justify-content-center">
      <Form className="w-25 mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={addTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Text"
            value={text}
            onChange={addText}
          />
        </Form.Group>

        <Button variant="success" type="submit" onClick={addTask}>
          Add Task
        </Button>
      </Form>
    </div>
  );
};
