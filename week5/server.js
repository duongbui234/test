const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const globalErrorHandler = require("./middleware/handleError");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.use(cookieParser());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Global error handler
app.all("*", (req, res, next) => {
  next(new Error(`Can't not find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
