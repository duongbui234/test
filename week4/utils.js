const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const isMatchPassword = async (enterPassword, hashedPassword) => {
  return await bcrypt.compare(enterPassword, hashedPassword);
};

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

module.exports = { hashPassword, isMatchPassword, generateAuthToken };
