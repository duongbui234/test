const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllTask = async (req, res) => {
  console.log(req.user);
  try {
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
    res.json({ status: "success", data: { list } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    const task = await prisma.list.findUnique({
      where: { id: +req.params.id },
    });
    if (task) {
      return res.json({ status: "success", data: { task } });
    }
    res.status(404).json({ message: "Không tìm thấy task" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.user.id);
    const newTask = await prisma.list.create({
      data: { title, desc: description, user_id: req.user.id },
    });
    res.json({ status: "success", data: { newTask } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await prisma.list.findUnique({
      where: { id: +req.params.id },
    });
    if (task.user_id != req.user.id) {
      return res
        .status(401)
        .json({ message: "Bạn không có quyền sửa task này" });
    }
    const updateTask = await prisma.list.update({
      where: {
        id: +req.params.id,
      },
      data: req.body.title
        ? { title: req.body.title, desc: req.body.desc }
        : { is_done: req.body.is_done ? true : false },
    });
    res.json({ status: "success", data: { updateTask } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await prisma.list.findUnique({
      where: { id: +req.params.id },
    });
    if (task.user_id != req.user.id) {
      return res
        .status(401)
        .json({ message: "Bạn không có quyền sửa task này" });
    }
    const deleteTasked = await prisma.list.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ status: "success", data: { deleteTasked } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
