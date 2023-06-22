module.exports = globalErrorHandler = (err, req, res, next) => {
  console.log(res.statusCode);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    message: err.message,
  });
};
