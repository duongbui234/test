const { PrismaClient, Prisma } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const {
  hashPassword,
  isMatchPassword,
  generateAccessToken,
  generateRefreshToken,
} = require("../utils");

let refreshTokens = [];

const prisma = new PrismaClient();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await prisma.user.findMany({ where: { email } });
  if (user.length && (await isMatchPassword(password, user[0].password))) {
    const authToken = generateAccessToken(user[0].id);
    const refreshToken = generateRefreshToken(user[0].id);
    refreshTokens.push(refreshToken);
    console.log(refreshTokens);
    return res.json({
      status: "success",
      data: { user, authToken, refreshToken },
    });
  } else {
    res.status(400).json({ message: "Incorrect email or password" });
  }
};
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await prisma.user.findMany({ where: { email } });
    if (users.length) {
      return res.status(400).json({ message: "Email đã được đăng ký" });
    }
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: await hashPassword(password),
      },
    });
    res.json({ status: "success", data: { newUser } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.refreshToken;

  //send error if there is no token or it's invalid
  if (!refreshToken)
    return res.status(401).json({ message: "You are not authenticated!" });
  console.log(refreshTokens, refreshToken);
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { email: true, id: true },
    });
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);
    refreshTokens.push(newRefreshToken);
    res.status(200).json({
      user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

exports.logout = (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
};
