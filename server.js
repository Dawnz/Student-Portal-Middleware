const express = require("express");
const cors = require("cors");
const app = express();
const students = require("./routes/students");
const coursework = require("./routes/coursework");
const auth = require("./routes/auth");
const conn = require("./lib/db");
const fileUpload = require("express-fileupload");
const session = require("express-session");

app.use(
   express.urlencoded({
      extended: true,
   })
);
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
   fileUpload({
      createParentPath: true,
   })
);

app.use(
   session({
      secret: process.env.SECRET,
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 120000 },
   })
);
app.use(cors());
//connection info
app.use("/login", auth);
app.use("/students", students);
app.use("/coursework", coursework);

app.listen(process.env.PORT, (req, res) => {
   console.log(`Express running on port ${process.env.PORT}`);
});

