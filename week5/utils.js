const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const isMatchPassword = async (enterPassword, hashedPassword) => {
  return await bcrypt.compare(enterPassword, hashedPassword);
};

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SK, { expiresIn: "2h" });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH);
};

module.exports = {
  hashPassword,
  isMatchPassword,
  generateAccessToken,
  generateRefreshToken,
};
