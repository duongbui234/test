const fs = require("node:fs/promises");

/**
 * kiểm tra số nguyên dương
 * @param {number} value Gia trị truyền vào từ tham số dòng lệnh
 * @returns nếu là số nguyên dương return true, else return false
 */

const checkPositiveInteger = (value) => {
  return Number.isInteger(value) && value > 0;
};

/**
 * kiểm tra xem là file hay ko
 * @param {string} name ten file hoặc thư mục
 * @param {string} parentPath ten đường dẫn
 * @returns if path is file return true, else return false
 */
const isFile = async (name, parentPath) => {
  try {
    const stats = await fs.lstat(`${parentPath}\\${name}`);
    return stats.isFile();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Kiểm tra số nguyên tố
 * @param {number} value gia trị truyền vào
 * @returns check if value is prime, return true else return false
 */
const isPrime = (value) => {
  // flag = true => is prime
  // flag = false => is not prime
  let flag = true;
  if (value < 2) return (flag = false);

  let i = 2;
  while (i < value) {
    if (value % i === 0) {
      flag = false;
      break;
    }
    i++;
  }
  return flag;
};

module.exports = { checkPositiveInteger, isPrime, isFile };
