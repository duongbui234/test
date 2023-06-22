const jwt = require("jsonwebtoken");
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("ehllo");
    try {
      token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SK, async (err, decoded) => {
        if (err) {
          res.status(401);
          return next(new Error(err.message));
        } else {
          req.user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { email: true, id: true },
          });
          next();
        }
      });
    } catch (error) {
      res.status(401);
      return next(new Error("No authorized, token failed"));
    }
  }
  if (!token) {
    res.status(401);
    return next(new Error("No authorized, no token"));
  }
};
