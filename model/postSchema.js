const express = require("express");

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  attachment: { type: String, required: true },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
