const fs = require("node:fs/promises");

/**
 * Nếu số nhập vào là số nguyên tố thì in ra danh sách tất cả các file ở CWD
 * @param {string} dir current working directory
 */
module.exports = async (dir) => {
  try {
    const files = await fs.readdir(dir);

    await fs.writeFile("text.txt", files.join("\n").toString());
  } catch (err) {
    console.log(err.message);
  }
};
