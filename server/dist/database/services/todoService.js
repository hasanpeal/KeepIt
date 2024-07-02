"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = createTodo;
exports.deleteTodo = deleteTodo;
exports.retriveTodos = retriveTodos;
const todo_1 = __importDefault(require("../models/todo"));
function createTodo(userId, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("useId received in createTodo " + userId);
            console.log("Text received in createTodo " + text);
            const todo = new todo_1.default({ userId, text });
            yield todo.save();
            return todo;
        }
        catch (err) {
            console.log("Error in createTodo function ");
        }
    });
}
function deleteTodo(userId, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find and delete the todo item
            const result = yield todo_1.default.deleteOne({ userId, text }).exec();
            return result;
        }
        catch (error) {
            console.error("Error deleting todo");
            throw error;
        }
    });
}
function retriveTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield todo_1.default.find({ userId }).exec();
            return todos;
        }
        catch (err) {
            console.log(err);
        }
    });
}
//# sourceMappingURL=todoService.js.map