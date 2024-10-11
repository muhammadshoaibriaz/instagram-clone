const mysql = require("mysql");
const sq = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "scribblr",
});
sq.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id", sq.threadId);
});

module.exports = sq;
