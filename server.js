const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});
// SignUp API 
app.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO login (`username`, `email`, `password`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];
  console.log(values);
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ success: true, data });
  });
});
//Login API
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `username`= ? AND `password`= ?";
  const values = [req.body.username, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length > 0) {
      // You might want to send more details like user information or a token here
      return res.json({ success: true, user: data[0] });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
