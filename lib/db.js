const mysql = require("mysql");
require("dotenv/config");
const conn = mysql.createConnection({
   host: process.env.HOST,
   user: process.env.USER,
   password: process.env.PASSWORD,
   database: process.env.DATABASE,
});
conn.connect((err) => {
   if (!err) console.log("Connected to database Successfully");
   else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

module.exports = conn;
