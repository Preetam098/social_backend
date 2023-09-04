const validateToken = require("../middleware/verifyToken");
const express = require("express");
const router = express.Router();
const { profile } = require("../controller/userController");

const { CreatePost } = require("../controller/postController");
const { getPost } = require("../controller/postController");
const { updatePost } = require("../controller/postController");
const { deletePost } = require("../controller/postController");

const {Upload} = require ("../fileUploder")

router.route("/profile").get(validateToken, profile);


router.route("/post").post(validateToken,Upload.single('file'),CreatePost);
router.route("/post").get(validateToken,getPost);
router.route("/post").put(validateToken,Upload.single('file'),updatePost);
router.route("/post/:postid").delete(validateToken,deletePost);


module.exports = router;


