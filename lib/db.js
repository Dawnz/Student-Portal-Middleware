const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_portal",
  dateStrings: true,
});
conn.connect((err) => {
  if (!err) console.log("Connected to database Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

module.exports = conn;
