import app from "./app.js";
import config from "./config/config.js";

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`name: ${err.name}, message: ${err.message}`);
  console.log("uncaughtException, shutting down");
  process.exit(1);
});

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
