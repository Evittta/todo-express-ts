import { RequestHandler } from "express";

import { Todo } from "../models/todo.model";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Date.now(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created the todo.", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id: todoId } = req.params;
  const { text: updatedText } = req.body as { text: string };

  let todoIndex = TODOS.findIndex(({ id }) => id === Number(todoId));

  if (todoIndex < 0) {
    throw new Error("Could not found todo!");
  }

  const updatedTodo = new Todo(Number(todoId), updatedText);
  TODOS[todoIndex] = updatedTodo;

  res.json({ message: "Updated!", updatedTodo });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const { id: todoId } = req.params;

  let todoIndex = TODOS.findIndex(({ id }) => id === Number(todoId));

  if (todoIndex < 0) {
    throw new Error("Could not found todo!");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: "Todo deleted!" });
};
