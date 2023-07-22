// handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`name: ${err.name}, message: ${err.message}`);
    console.log(('uncaughtException, shutting down'));
    process.exit(1);
})

import express from "express";
import config from './config/config.js'
import morgan from "morgan";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import userRoutes from './api/resources/user/user.routes.js'

const app = express();

//middlewares
app.use(express.json());
if(config.NODE_ENV == 'dev' || config.env == 'test') {
    app.use(morgan('dev'))
}
app.use(globalErrorHandler)

//routes
app.use('/api/v1/user', userRoutes)

process.on('unhandledRejection', () => {

})

const PORT =  config.PORT || 8080 
app.listen(8080,() => {
    console.log(`app is listening on port ${PORT}`);
})

// handling unhandled Rejections
process.on('unhandledRejection', (err) => {
    console.log(`name: ${err.name}, message: ${err.message}`);
    console.log(('unhandledRejection, shutting down'));
    server.close(() => {
        process.exit(1);
    })
})