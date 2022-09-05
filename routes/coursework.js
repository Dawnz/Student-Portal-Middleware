const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

router.post("/add/:id", (req, res) => {
  let courseId = req.params.id;
  file = req.files.file;
  file.mv("../src/assets/uploads/" + file.name);
  let data = {
    courseId: courseId,
    name: file.name,
  };
  let sql = "INSERT INTO course_work SET ?";
  conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.status(201).json({
      results,
    });
  });
});

router.get("/:id", (req, res) => {
  let courseId = req.params.id;
  let sql = `Select * from course_work WHERE courseId = ${courseId}`;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      result: result,
    });
  });
});

module.exports = router;
