import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { UpdateTask } from "./UpdateTask";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTaskFromTodoList,
  setSelectedTask,
  getTasksFromServer,
  deleteTaskToServer,
} from "../redux/slices/taskSlice";

export const TableC = () => {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const { tasksList, isError } = useSelector((state) => state.tasks);

  const updateTask = (task) => {
    dispatch(setSelectedTask(task));
    setModalShow(true);
  };

  const deleteTask = (task) => {
    // dispatch(removeTaskFromTodoList(task));
    dispatch(deleteTaskToServer(task))
  };

  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);

  return (
    <>
      <UpdateTask show={modalShow} onHide={() => setModalShow(false)} />
      <div className="d-flex justify-content-center my-5">
        {isError ? isError : null}
      </div>
      <div className="d-flex justify-content-center my-5">
        <Table className="w-50" bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasksList &&
              tasksList.map((task, index) => {
                return (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.text}</td>
                    <td>
                      <Button
                        variant="primary"
                        className="mx-2"
                        onClick={() => updateTask(task)}
                      >
                        Update
                      </Button>
                      <Button variant="danger" onClick={() => deleteTask(task)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
};
