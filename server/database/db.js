"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var username = process.env.MONGO_USERNAME;
var pass = process.env.MONGO_PASSWORD;
var MONGO_URL = "mongodb+srv://".concat(username, ":").concat(pass, "@todo.uhmep5x.mongodb.net/?retryWrites=true&w=majority&appName=Todo");
mongoose_1.default.connect(MONGO_URL);
var db = mongoose_1.default.connection;
db.on("connected", function () {
    console.log("Connected to MongoDB Atlas");
});
db.on("error", function () {
    console.log("error connecting to data base");
});
exports.default = db;
