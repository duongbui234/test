const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    await prisma.list.create({
      data: { title, desc: description },
    });
    res.redirect("/todo");
  } catch (error) {
    res.redirect("/todo");
  }
};

exports.updateTask = async (req, res) => {
  try {
    console.log(req.params, req.body);
    await prisma.list.update({
      where: {
        id: +req.params.id,
      },
      data: req.body.title
        ? { title: req.body.title, desc: req.body.desc }
        : { is_done: req.body.is_done ? true : false },
    });
    res.redirect("/todo");
  } catch (error) {
    res.redirect("/todo");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await prisma.list.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.redirect("/todo");
  } catch (error) {
    res.redirect("/todo");
  }
};
