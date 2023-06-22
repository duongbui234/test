const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const viewRoutes = require("./routes/viewRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/", viewRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
