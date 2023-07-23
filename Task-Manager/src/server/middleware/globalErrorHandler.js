import config from "../config/config.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (config.NODE_ENV == "dev" || config.NODE_ENV == "test") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err, 
    });
  } else if (config.NODE_ENV == "prod") {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }else {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'something went wrong!'
      })
    }
  }
};
