"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var todoSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true }
});
var Todo = mongoose_1.default.model("Todo", todoSchema);
exports.default = Todo;
