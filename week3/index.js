const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const formatDate = require("./formatDate");

const app = express();

app.use(expressLayouts);
app.set("layout", "./layout/base");
app.set("view engine", "ejs");

app.get("/", function (_req, res) {
  res.render("pages/index");
});
app.get("/time", function (_req, res) {
  res.render("pages/time", { content: formatDate(new Date(Date.now())) });
});
app.get("/time/day", function (_req, res) {
  res.render("pages/day", { content: new Date(Date.now()).getDay() + 1 });
});
app.get("*", function (_req, res) {
  res.end("<h1>Page not found</h1>");
});

app.listen(8000);
