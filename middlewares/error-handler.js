const errorHandler = (err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message } = err;
  return res.status(err.statusCode).send({
    message:
      statusCode === 500 ? "An error occurred on the server" : err.message,
  });
};

module.exports = errorHandler;
