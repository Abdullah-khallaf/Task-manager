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

const PORT =  config.PORT || 8080 
app.listen(8080,() => {
    console.log(`app is listening on port ${PORT}`);
})