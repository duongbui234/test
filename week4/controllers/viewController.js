const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllTaskView = async (req, res) => {
  const { status, title } = req.query;
  let list = await prisma.list.findMany({ orderBy: { id: "asc" } });
  if (title) {
    list = list.filter((todo) => {
      return todo.title.includes(title.trim());
    });
  }
  if (status) {
    list = list.filter((todo) => {
      let isDone = status === "done" ? true : false;
      return todo.is_done === isDone;
    });
  }

  res.status(200).render("overview", { list });
};
exports.editTask = async (req, res) => {
  const task = await prisma.list.findUnique({ where: { id: +req.params.id } });
  res.status(200).render("editTask", { task });
};

exports.loginUser = async (_, res) => {
  res.status(200).render("login");
};
exports.registerUser = async (_, res) => {
  res.status(200).render("register");
};
