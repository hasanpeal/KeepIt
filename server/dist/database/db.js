"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));

const username = "pealh0320";
const pass = "245810";
const MONGO_URL = `mongodb+srv://${username}:${pass}@todo.uhmep5x.mongodb.net/?retryWrites=true&w=majority&appName=Todo`;
mongoose_1.default.connect(MONGO_URL);
const db = mongoose_1.default.connection;
db.on("connected", () => {
    console.log("Connected to MongoDB Atlas");
});
db.on("error", () => {
    console.log("error connecting to data base");
});
exports.default = db;
//# sourceMappingURL=db.js.map