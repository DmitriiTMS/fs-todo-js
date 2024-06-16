import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todoController";

const todoRoutes: Router = Router();

todoRoutes.get("/", getTodos);
todoRoutes.get("/:id", getTodoById);
todoRoutes.post("/create", createTodo);
todoRoutes.patch("/:id", updateTodo);
todoRoutes.delete("/:id", deleteTodo);

export default todoRoutes;
