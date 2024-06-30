import Todo from "../models/todo";
import mongoose from "mongoose";

export async function createTodo(
  userId: mongoose.Types.ObjectId,
  text: string
) {
  try {
    const todo = new Todo(userId, text);
    await todo.save();
    return todo;
  } catch (err) {
    console.log(err);
  }
}

export async function retriveTodos(userId: mongoose.Types.ObjectId) {
  try {
    const todos = await Todo.find({ userId }).exec();
    return todos;
  } catch (err) {
    console.log(err);
  }
}
