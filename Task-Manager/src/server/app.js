import express from "express";
import config from "./config/config.js";
import morgan from "morgan";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import restRouter from "./api/api.routes.js";
import AppError from "./utils/appError.js";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";

const app = express();

//config redis
const redisClient = createClient({
  url: `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`
});

await redisClient
  .connect()
  .then(() => {
    console.log("connected to redis");
  })
  .catch(() => {
    console.log("failed to connect to redis");
  });

const cookieConfig = {
  secure: false,
  httpOnly: true,
  maxAge: 1000 * 60 * 5, // 5min
};
if (config.env === "prod") {
  cookieConfig.secure = true;
}

// middleware
app.use(express.json());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: cookieConfig,
  })
);
if (config.NODE_ENV == "dev" || config.env == "test") {
  app.use(morgan("dev"));
}

//routes
app.use("/api", restRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//global error handler
app.use(globalErrorHandler);


export default app;


