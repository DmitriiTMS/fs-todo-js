import { Request, Response } from "express";
import { prismaClient } from "..";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prismaClient.todo.findMany();

  return res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, text } = req.body;

  const todo = await prismaClient.todo.create({
    data: {
      title,
      text,
    },
  });

  return res.json(todo);
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const response = await prismaClient.todo.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!response) {
      res.status(404).json({ message: "Задачи с таким id нет" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ msg: "Ошибка сервера при получении одной" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { title, text } = req.body;
  try {
    const todo = await prismaClient.todo.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title,
        text,
      },
    });
    return res.status(200).json(todo);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Не удалось обновить todo. Ошибка на сервере" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
   console.log(req.params);
   
  try {
    const todo = await prismaClient.todo.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({ msg: "Не удалось удалить todo. Ошибка на сервере" });
  }
};
