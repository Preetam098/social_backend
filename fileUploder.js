const multer = require('multer');
const express = require("express");
const {Post} = require("./model/postSchema")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const Upload = multer({ storage: storage });



  module.exports  = { Upload }