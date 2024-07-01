import Todo from "../models/todo";
import mongoose from "mongoose";

export async function createTodo(
  userId: mongoose.Types.ObjectId,
  text: string
) {
  try {
    console.log("useId received in createTodo " + userId);
    console.log("Text received in createTodo " + text);
    const todo = new Todo({ userId, text });
    await todo.save();
    return todo;
  } catch (err) {
    console.log("Error in createTodo function ");
  }
}

export async function deleteTodo(userId: mongoose.Types.ObjectId, text: string) {
  try {
    // Find and delete the todo item
    const result = await Todo.deleteOne({ userId, text }).exec();
    return result;
  } catch (error) {
    console.error("Error deleting todo");
    throw error;
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
