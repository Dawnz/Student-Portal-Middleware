const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

router.post("/authlogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let sql = "SELECT * FROM student WHERE username = ? AND  password = ?;";

  conn.query(sql, [username, password], (err, results) => {
    console.log(results[0]);
    if (results.length <= 0) {
      res.status(401).send(err);
    } else {
      req.session.loggedIn = true;
      req.session.username = results[0].username;
      req.session.firstName = results[0].firstName;
      req.session.userId = results[0].studentId;
      req.session.isAdmin = false;

      res.status(200).json({
        session: req.session,
      });
    }
  });
});

module.exports = router;
