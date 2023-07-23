// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`name: ${err.name}, message: ${err.message}`);
  console.log("uncaughtException, shutting down");
  process.exit(1);
});

import express from "express";
import config from "./config/config.js";
import morgan from "morgan";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import userRoutes from "./api/resources/user/user.routes.js";
import taskRoutes from "./api/resources/task/task.routes.js";
import AppError from "./utils/appError.js";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";

const app = express();

//config redis
const redisClient = createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
});

redisClient
  .connect(() => {
    if (config.env == "dev" || config.env == "test") {
      console.log("connected to redis");
    }
  })
  .catch((err) => {
    if (config.env == "dev" || config.env == "test") {
      console.log("failed to connect to redis");
      console.log(err);
    }
  });

// middleware
const cookieConfig = {
  secure: false,
  httpOnly: true,
  maxAge: 1000 * 60, // 1min
};
if (config.env === "prod") {
  cookieConfig.secure = true;
}
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: cookieConfig,
  })
);
app.use(express.json());
if (config.NODE_ENV == "dev" || config.env == "test") {
  app.use(morgan("dev"));
}

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

//start server
const PORT = config.PORT || 8080;
app.listen(8080, () => {
  console.log(`app is listening on port ${PORT}`);
});

// handling unhandled Rejections
process.on("unhandledRejection", (err) => {
  console.log(`name: ${err.name}, message: ${err.message}`);
  console.log("unhandledRejection, shutting down");
  server.close(() => {
    process.exit(1);
  });
});
