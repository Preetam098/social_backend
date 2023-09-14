const { fileToDeletePath } = require("../middleware/deletefile");
const { Post } = require("../model/postSchema");

/// CREATEPOST

const CreatePost = (req, res) => {
  const { title, description } = req.body;
  const attachment = req.file ? req.file.path : null;
  const newPost = new Post({
    userId: req.user.userId,
    title,
    description,
    attachment,
  });

  newPost
    .save()
    .then((post) => {
      res
        .status(201)
        .json({ success: true, message: "Update successful", data: post });
    })
    .catch((error) => {
      console.error("Error adding post:", error);
      res
        .status(500)
        .json({ error: "An error occurred while adding the post." });
    });
};

///   GET Post DATA

const getPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const getData = await Post.find({ userId });
    if (!getData) {
      return res.status(404).json({ message: "Post not found" }); // Respond with a JSON message
    }
    res.status(200).json(getData);
  } catch (error) {
    console.error("Error getting post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the post." });
  }
};

///  UPDATE Post

const updatePost = async (req, res) => {
  const userId = req.user.userId;
  const postId = req.params.postid;
  try {
    const dataToUpdate = await Post.findById(postId);
    if (!dataToUpdate) {
      return res.status(404).json({ error: "Data not found" });
    }
    if (req.file && req.file.path) {
      fileToDeletePath(dataToUpdate.attachment);
    }
    if (dataToUpdate.userId.toString() !== userId) {
      return res.status(403).json({
        error: "User doesn't have permission to update other user's data",
      });
    }
    dataToUpdate.title = req.body.title;
    dataToUpdate.description = req.body.description;
    if (req.file) {
      dataToUpdate.attachment = req.file.path;
    }
    const updatedData = await dataToUpdate.save();
    res
      .status(200)
      .json({ success: true, message: "Update successful", data: updatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

///  DELETE Post

const deletePost = async (req, res) => {
  const postId = req.params.postid;
  console.log("postId" ,postId);
  try {
    const dataToDelete = await Post.findByIdAndDelete(postId);

    if (!dataToDelete) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ success: true, message: "Delete successful" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad Request" });
  }
};

module.exports = { CreatePost, getPost, updatePost, deletePost };
