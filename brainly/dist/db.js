"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.TagsModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//create user models/schema
//const mongoose = require("mongoose");
const Schema = mongoose_1.default.Schema;
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const User = new Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
const Tags = new Schema({
    title: { type: String, required: true, unique: true },
});
const Contents = new Schema({
    link: { type: String, unique: true },
    type: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tag" }],
    title: { type: String, required: true },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
});
const Link = new Schema({
    hash: { type: String, required: true },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true,
    },
});
exports.UserModel = mongoose_1.default.model("users", User);
exports.TagsModel = mongoose_1.default.model("tags", Tags);
exports.ContentModel = mongoose_1.default.model("contents", Contents);
exports.LinkModel = mongoose_1.default.model("links", Link);
