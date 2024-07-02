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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../database/db"));
const userService_1 = require("../database/services/userService");
const userService_2 = require("../database/services/userService");
const todoService_1 = require("../database/services/todoService");
const todoService_2 = require("../database/services/todoService");
const todoService_3 = require("../database/services/todoService");
const app = (0, express_1.default)();
app.use(
  (0, cors_1.default)({
    origin: "https://keepit-thuj.onrender.com", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent with the requests
  })
);
app.use(express_1.default.json());
const port = 3001;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", () => {
    console.log("server running");
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Post requested on signup");
    yield db_1.default;
    const email = req.body.email;
    const password = req.body.password;
    const user = yield (0, userService_2.findUser)(email);
    if (user) {
        res.status(200).json({ status: 0, message: "User already exists" });
    }
    else {
        yield (0, userService_1.createUser)(email, password);
        res.status(200).json({ status: 1, message: "Sign up successful" });
    }
}));
app.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default;
    console.log("Add reaquest made");
    try {
        const email = req.body.email;
        const text = req.body.text;
        const user = yield (0, userService_2.findUser)(email);
        if (user) {
            console.log("PPP " + user._id + " " + text);
            const todo = yield (0, todoService_1.createTodo)(user._id, text);
            console.log("Successfully added todo" + todo);
            res.status(200).json({ status: 1, message: "To do added" });
        }
    }
    catch (_a) {
        console.log("Error adding task");
    }
}));
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Post request of /todos");
    yield db_1.default;
    try {
        const email = req.body.email;
        const user = yield (0, userService_2.findUser)(email);
        if (user) {
            const todos = yield (0, todoService_2.retriveTodos)(user._id);
            if (todos) {
                const texts = todos.map((todo) => todo.text);
                res.status(200).json({ status: 1, todos: texts });
            }
        }
    }
    catch (_a) {
        console.log("Error retriving todos");
    }
}));
app.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Post request /delete made");
    yield db_1.default;
    try {
        const email = req.body.email;
        const note = req.body.note;
        const user = yield (0, userService_2.findUser)(email);
        if (user) {
            const result = yield (0, todoService_3.deleteTodo)(user._id, note);
            console.log("Todo deleted: " + result);
            res.status(200).json({ status: 1 });
        }
    }
    catch (_a) {
        console.log("Error retriving todos");
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default;
    const email = req.body.email;
    const password = req.body.password;
    const user = yield (0, userService_2.findUser)(email);
    if (user) {
        if (user.password === password) {
            res.status(200).json({ status: 1, message: "Successful login" });
        }
        else {
            res.status(200).json({ status: 0, message: "Wrong password" });
        }
    }
    else {
        res.status(200).json({ status: -1, message: "Email not found" });
        console.log("Error in signin");
    }
}));
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map