const sq = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "shoaibriaze@gmail.com",
//     pass: "iamshabii1A",
//   },
// });
// const generateOtp = () => {
//   return Math.floor(Math.random() * 900000).toString();
// };

const CreateUser = async (req, res) => {
  const { username, email, password, image } = req.body;
  // const otp = generateOtp();
  // Check if all fields are provided
  if (!username || !email || !password || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const query = "SELECT * FROM users WHERE email = ?";
    sq.query(query, [email], async (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      // const mailOptions = {
      //   from: `shoaibriaze@gmail.com`,
      //   to: email,
      //   subject: "Your OTP Code",
      //   text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
      // };

      // transporter.sendMail(mailOptions, (err, info) => {
      //   if (err) {
      //     console.error("Error sending email:", err);
      //     return res.status(500).json({ message: "Failed to send OTP" });
      //   }
      //   console.log("Email sent: " + info.response);
      // });

      if (result.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Insert the new user
      const query1 = "INSERT INTO users SET ?";
      sq.query(
        query1,
        {
          username: username,
          email: email,
          password: hashedPassword,
          image: image,
        },
        (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
          }
          return res.status(201).json({ message: "User created successfully" });
        }
      );
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const auth = req.user;
    const { email, username, image, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    sq.query(
      "UPDATE users SET ? WHERE id = ?",
      [
        {
          email: email,
          username: username,
          image: image,
          password: hashedPassword,
        },
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(201).json({ message: "User updated successfully" });
      }
    );
  } catch (error) {
    console.log("Error while updating user ", error);
  }
};

const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if email exists
    sq.query(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      async (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (result.length === 0) {
          return res.status(400).json({ message: "Email not found" });
        }
        // Check if password is correct
        const user = result[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Invalid password" });
        }
        // Generate JWT
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return res.status(200).json({ token, user });
      }
    );
  } catch (err) {
    console.log("Error while logging in ", err);
  }
};

const DeleteUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  try {
    sq.query(
      "DELETE FROM likes WHERE user_id= ?",
      [userId],
      async (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ message: "Internal server error while deleting likes" });
        }
      }
    );
    sq.query("DELETE FROM posts WHERE user_id = ?", [userId], (err, result) => {
      if (err) {
        console.log("Database error", err);
        return res.status(500).json("Internal server error");
      }
    });
    sq.query("DELETE FROM users WHERE id= ?", [userId], async (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ message: "Internal server error while deleting user" });
      }
    });
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const GetUser = async (req, res) => {
  try {
    sq.query("SELECT * FROM users", (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json(result);
    });
  } catch (err) {
    console.log("Error while getting users");
  }
};

const CreatePost = async (req, res) => {
  try {
    const { image, content } = req.body;
    let userId = req.user;
    const user_id = userId;
    if (!image || !content) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    sq.query(
      `INSERT INTO posts (content, image, user_id) VALUES (?, ?, ?)`,
      [content, image, user_id],
      async (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        console.log("Post Created Successfully");
        return res
          .status(200)
          .json({ message: "Post created successfully", result });
      }
    );
  } catch (err) {
    console.error("Error while creating post", err);
    return res.status(500).json({ message: "Error while creating post" });
  }
};

const DeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    let user_id = req.user;
    // console.log(id, user_id);
    if (!id) {
      return res.status(400).json({ message: "Please provide id" });
    }
    sq.query("DELETE FROM likes WHERE post_id = ?", [id], (err, result) => {
      if (err) {
        console.log("Database error ", err);
        res
          .status(500)
          .json("Internal server error while deleting post likes ");
      }
    });
    sq.query(
      `DELETE FROM posts WHERE id = ? AND user_id = ?`,
      [id, user_id],
      async (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Post not found Or UnAuthorized user" });
        }
        console.log("Post Deleted Successfully");
        return res.status(200).json({ message: "Post deleted successfully" });
      }
    );
  } catch (err) {
    console.log("Error while deleting post ");
    return res.status(500).json({ message: "Error while deleting post" });
  }
};

const GetPosts = async (req, res) => {
  try {
    sq.query("SELECT * FROM posts", (err, result) => {
      if (err) {
        console.log("Error while getting posts");
        return res.status(500).json({ message: "Internal server error" });
      }
      console.log("Posts fetched successfully");
      return res.status(200).json({ result });
    });
  } catch (error) {
    console.log("Error while getting posts");
    return res.status(400).json({ message: "Cannot get post right now" });
  }
};

const LikePost = async (req, res) => {
  try {
    const { id } = req.params;
    let user_id = req.user;
    if (!id) {
      return res.status(400).json({ message: "Please provide id" });
    }
    sq.query(
      `SELECT * FROM likes WHERE post_id = ? AND user_id = ?`,
      [id, user_id],
      async (err, result) => {
        if (err) {
          console.log("Error while liking post", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (result.length === 0) {
          sq.query(
            `INSERT INTO likes (post_id, user_id) VALUES (?, ?)`,
            [id, user_id],
            async (err, result) => {
              if (err) {
                console.log("Error while liking post", err);
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }
              console.log("Post liked successfully");
              return res
                .status(200)
                .json({ message: "Post liked successfully" });
            }
          );
        } else {
          sq.query(
            `DELETE FROM likes WHERE post_id = ? AND user_id = ?`,
            [id, user_id],
            async (err, result) => {
              if (err) {
                console.log("Error while unliking post");
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }
              console.log("Post unliked successfully");
              return res
                .status(200)
                .json({ message: "Post unliked successfully" });
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Follow = async (req, res) => {
  const { user_id, follower_id } = req.body;
  console.log(user_id, follower_id);
  try {
    if (!user_id || !follower_id) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const checkUsersExistQuery = "SELECT id FROM users WHERE id IN (?, ?)";
    sq.query(checkUsersExistQuery, [user_id, follower_id], (err, result) => {
      if (err) {
        console.log("Error while following user", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length !== 2) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }
      const checkFollowerQuery =
        "SELECT * FROM followers WHERE user_id = ? AND follower_id = ?";
      sq.query(
        checkFollowerQuery,
        [user_id, follower_id],
        async (err, result) => {
          if (err) {
            console.log("Error while following user 1", err);
            return res.status(500).json({ message: "Internal server error" });
          }
          if (result.length > 0) {
            sq.query(
              `DELETE FROM followers WHERE user_id = ? AND follower_id = ?`,
              [user_id, follower_id],
              async (err, result) => {
                if (err) {
                  console.log("Error while un following user");
                  return res
                    .status(500)
                    .json({ message: "Internal server error" });
                }
                console.log("User un followed successfully");
                return res
                  .status(200)
                  .json({ message: "User un followed successfully" });
              }
            );
          } else {
            sq.query(
              `INSERT INTO followers (user_id, follower_id) VALUES (?, ?)`,
              [user_id, follower_id],
              async (err, result) => {
                if (err) {
                  console.log("Error while following user 2", err);
                  return res
                    .status(500)
                    .json({ message: "Internal server error" });
                }
                console.log("User followed successfully");
                return res
                  .status(200)
                  .json({ message: "User followed successfully" });
              }
            );
          }
        }
      );
    });
  } catch (err) {
    console.log("Error while following user", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const GetFollowers = async (req, res) => {
  try {
    const user_id = req.params.id;
    sq.query(
      `SELECT * FROM users INNER JOIN followers ON users.id = ?`,
      [user_id],
      (err, result) => {
        if (err) {
          console.log("Error while getting followers");
          return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json(result);
      }
    );
  } catch (err) {
    console.log("Error while getting followers", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
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
};

// Shabii token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoic2hhYmlpQGdtYWlsLmNvbSIsImlhdCI6MTcyMTcwODM4NCwiZXhwIjoxNzIxNzk0Nzg0fQ.LOSZno5dm7UUfRHj3QnQV_H4hWaSyJyTyBVoJeLDLCU

// Nisha Token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoibmlzaGFAZ21haWwuY29tIiwiaWF0IjoxNzIxNzA4NDgzLCJleHAiOjE3MjE3OTQ4ODN9.LAinT7eopFMV3vLRxmgIaGyJE4PlwsZdnzFftPUnIQI
