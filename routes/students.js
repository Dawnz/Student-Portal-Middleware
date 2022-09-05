const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

router.get("/", function (req, res) {
  let mySql = "SELECT * FROM student";
  conn.query(mySql, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      results: results,
    });
  });
});

router.get("/enroll/:studentId", function (req, res) {
  const studentId = req.params.studentId;
  let sql = `select sc.studentToCourseId,sc.studentId,course.courseId, course.name as subject,tutor.title, tutor.firstName, tutor.lastName,schedule.startTime,schedule.endTime,sc.finalGrade, sc.completedClasswork, sc.incompleteClasswork
  from student_to_course as sc
  inner join course on course.courseId = sc.courseId
  inner join schedule on schedule.scheduleId = sc.scheduleId
  inner join tutor on course.tutorId = tutor.tutorId
  WHERE sc.studentId = ${studentId} `;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      result: result,
    });
  });
});
router.get("/:studentId", function (req, res) {
  const studentId = req.params.studentId;
  let sql = `Select * from student WHERE studentId = ${studentId}`;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      result: result[0],
    });
  });
});
// router.delete("/:studentId", function (req, res) {
//   const studentId = req.params.userId;
//   let sql = `DELETE from student WHERE id = ${studentId}`;
//   let query = conn.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(200).json({
//       result: result[0],
//     });
//   });
// });

router.post("/", function (req, res) {
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  };
  let userSql = "INSERT INTO student SET ?";
  let query = conn.query(userSql, data, (err, results) => {
    if (err) throw err;
    res.status(201).json({
      results,
    });
  });
});

// router.put("/:userId", function (req, res) {
//   const userId = req.params.userId;
//   let userSql =
//     "UPDATE user SET username ='" +
//     req.body.username +
//     "', password ='" +
//     req.body.password +
//     "' where id =" +
//     userId;

//   let query = conn.query(userSql, (err, results) => {
//     if (err) throw err;
//     res.status(200).json();
//   });
// });

module.exports = router;
