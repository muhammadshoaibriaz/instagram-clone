const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const sq = require("./database/db");
const router = require("./routers/route");
require("dotenv").config();
const PORT = 8081;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

// set up routes
// app.use("/auth", require("./routes/auth"));
// app.use("/user", require("./routes/user"));
// app.use("/post", require("./routes/post"));
// app.use("/comment", require("./routes/comment"));
// app.use("/like", require("./routes/like"));
// app.use("/follow", require("./routes/follow"));
// app.use("/notification", require("./routes/notification"));
// app.use("/message", require("./routes/message"));
// app.use("/search", require("./routes/search"));
// app.use("/profile", require("./routes/profile"));
// app.use("/report", require("./routes/report"));
// app.use("/block", require("./routes/block"));
// app.use("/unblock", require("./routes/unblock"));

app.listen(PORT, () => {
  if (sq) {
    console.log("MySQL connected");
  }
  console.log(`Server is running on port ${PORT}`);
});
