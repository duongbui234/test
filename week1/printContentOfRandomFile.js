const fs = require("node:fs/promises");
const { isFile } = require("./utils");

/**
 * Nếu số nhập vào không phải là số nguyên tố thì in ra nội dung của 1 file bất kì ở thư mục cha của CWD
 * @param {string} dir thư mục cha của CWD
 */
module.exports = async (dir) => {
  let files = await fs.readdir(dir);
  files = await Promise.all(
    files.map(async (f) => {
      return {
        name: f,
        isFile: await isFile(f, dir),
      };
    })
  );
  files = files
    .filter((f) => {
      return f.isFile;
    })
    .map((el) => el.name);

  const random = Math.floor(Math.random() * files.length);
  const contentOfRandomFile = await fs.readFile(`${dir}\\${files[random]}`, {
    encoding: "utf-8",
  });
  await fs.writeFile("text.txt", contentOfRandomFile);
};
