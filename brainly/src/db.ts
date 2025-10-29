import mongoose from "mongoose";

//create user models/schema
//const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

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
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  title: { type: String, required: true },
  filePath: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Link = new Schema({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
});

export const UserModel = mongoose.model("users", User);
export const TagsModel = mongoose.model("tags", Tags);
export const ContentModel = mongoose.model("contents", Contents);
export const LinkModel = mongoose.model("links", Link);
