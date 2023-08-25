const express = require("express");

const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, default: "" },
  dob: { type: String, default: "" },
});



module.exports = mongoose.model("users", Users);
