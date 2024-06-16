import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useSelector, useDispatch } from "react-redux";
import {
  updateTaskToServer,
  updateTaskTodoList,
} from "../redux/slices/taskSlice";

export const UpdateTask = (props) => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.selectedTask);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState(0);

  const addTitle = (e) => {
    setTitle(e.target.value);
  };
  const addText = (e) => {
    setText(e.target.value);
  };

  const updateTask = (e) => {
    e.preventDefault();
    // dispatch(updateTaskTodoList({ id, title, text }));
    dispatch(updateTaskToServer({ id, title, text }));
    props.onHide();
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setText(task.text);
      setId(task.id);
    }
  }, [task]);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="w-25 mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title || ""}
                onChange={addTitle}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Text"
                value={text || ""}
                onChange={addText}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={updateTask}>
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
