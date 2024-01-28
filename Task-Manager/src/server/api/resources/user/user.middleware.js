import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";

export const isLoggedIn = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return next(
      new AppError("you are not logged in, please login to get access", 401)
    );
  }

  next();
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.session.user.role)) {
      return next(new AppError("permission denied", 403));
    }
    next();
  };
};
