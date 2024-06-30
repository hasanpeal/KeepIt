import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "../database/db";
import { createUser } from "../database/services/userService";
import { findUser } from "../database/services/userService";
import { createTodo } from "../database/services/todoService";
import { retriveTodos } from "../database/services/todoService";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", () => {
    console.log("server running");
})

app.post("/signup", async (req, res) => {
  console.log("Post requested on signup");
  await db;
  const email: string = req.body.email;
  const password: string = req.body.password;
  const user = await findUser(email);
  if (user) {
    res.status(200).json({ status: 0, message: "User already exists" });
  } else {
    await createUser(email, password);
    res.status(200).json({ status: 1, message: "Sign up successful" });
  }
});

app.get("/add", async (req, res) => {
  await db;
  try {
    const email: string = req.body.email;
    const text: string = req.body.text;
    const user = await findUser(email);
    if (user) {
      const todo = await createTodo(user._id, text);
      console.log("Successfully added todo" + todo);
      res.status(200).json({ status: 1, message: "To do added" });
    }
  } catch {
    console.log("Error adding task");
  }
});

app.get("/todos", async (req, res) => {
    await db;
    try{
        const email: string = req.body.email;
        const user = await findUser(email);
        if (user) {
            const todos = await retriveTodos(user._id);
            res.status(200).json({status: 1, todos: todos});
        }
    } catch {
        console.log("Error retriving todos")
    }
});

app.post("/signin", async (req, res) => {
  await db;
  const email: string = req.body.email;
  const password: string = req.body.password;
  const user = await findUser(email);
  if (user) {
    if(user.password === password){
        res.status(200).json({ status: 1, message: "Successful login"});
    } else {
        res.status(200).json({ status: 0, message: "Wrong password" });
    }
  } else {
    res.status(200).json({ status: -1, message: "Email not found" });
    console.log("Error in signin");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
