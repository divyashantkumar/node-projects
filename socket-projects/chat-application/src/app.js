import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import logger from "./utils/logger.js";
import { BASE_ROUTE } from './constants.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.middleware.js';
import { 
    cookieParserOptions, 
    corsOptions, 
    helmetOptions, 
    morganOptions 
} from './utils/middleware.options.js';
import helmet from 'helmet';
import { createServer } from 'http';

import { initSocket } from './server.socket.js'

// Create Express App
const app = express();

// Create HTTP Server
const server = createServer(app);

initSocket(server);

// Custom Morgan Format for logging requests and responses in the console 
const morganFormat = ":method :url :status :response-time ms";
// 1. Logging Middleware
app.use(morgan(morganFormat, morganOptions));


//  2. Security Middleware
app.use(helmet(helmetOptions));


// 3. CORS Middleware
app.use(cors(corsOptions));


// 4. Body Parser Middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser(cookieParserOptions))


// 5. Static Files Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set("views", path.join(process.cwd(), "src", "views"));


// 6. Route Middleware
app.use(`${BASE_ROUTE}/user`, (req, res) => { })


// 7. Home Page Handler
app.use(RegExp('/$'), (req, res, next) => {
    try {
        logger.info('Hello Home Page');
        res.status(200).render('index');
    } catch (error) {
        throw error;
    }
});




// 8. Global Error Handlers    
app.use(globalErrorHandler);


// 9. 404 Global Path Handler
app.use((req, res, next) => {
    return res.status(404).send({
        status: "error",
        message: "404 Not Found"
    });
});


export {
    app,
    server
};

