const { PrismaClient, Prisma } = require("@prisma/client");
const {
  hashPassword,
  isMatchPassword,
  generateAuthToken,
} = require("../utils");

const prisma = new PrismaClient();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await prisma.user.findMany({ where: { email } });
  console.log(user);
  if (user.length && (await isMatchPassword(password, user[0].password))) {
    const authToken = generateAuthToken();
    res.cookie("AuthToken", authToken);
    res.redirect("/todo");
    return;
  }
  res.status(200).render("login", { message: "Incorrect account or password" });
};
exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await prisma.user.findMany({ where: { email } });
  if (user.length) {
    return res
      .status(200)
      .render("register", { message: "Email đã được đăng ký" });
  }
  await prisma.user.create({
    data: {
      email: email,
      password: await hashPassword(password),
    },
  });
  res.redirect("/login");
};

exports.logout = (req, res) => {
  console.log(req.cookies);
  res.clearCookie("AuthToken");
  res.redirect("/login");
};

exports.protect = async (req, res, next) => {
  if (req.cookies["AuthToken"]) {
    return next();
  } else {
    res.redirect("/login");
  }
};

exports.checkLoggedIn = async (req, res, next) => {
  if (req.cookies["AuthToken"]) {
    return res.redirect("/todo");
  }
  next();
};
