const express = require("express");
const router = express.Router();
const {
  CreateUser,
  DeleteUser,
  GetUser,
  LogIn,
  CreatePost,
  DeletePost,
  GetPosts,
  LikePost,
  UpdateUser,
  Follow,
  GetFollowers,
} = require("../controllers/controllers");
const auth = require("../middlewares/auth");

router.route("/api/users").post(CreateUser);
router.route("/api/login").post(LogIn);
router.route("/api/users").get(GetUser);
router.route("/api/users/:id").delete(auth, DeleteUser);
router.route("/api/users/:id").put(auth, UpdateUser);

// follow endpoint
router.route("/api/users/follow").post(auth, Follow);
router.route("/api/users/:id/followers").get(auth, GetFollowers);

// Posts endpoints
router.route("/api/post").post(auth, CreatePost);
router.route("/api/post/:id").delete(auth, DeletePost);
router.route("/api/post").get(GetPosts);
router.route("/api/post/like/:id").post(auth, LikePost);

module.exports = router;
