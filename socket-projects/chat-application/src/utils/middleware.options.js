import logger from "./logger.js";

// Morgan Logger Options
export const morganOptions = {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(" ")[0],
                url: message.split(" ")[1],
                status: message.split(" ")[2],
                responseTime: message.split(" ")[3],
            };
            logger.info(JSON.stringify(logObject));
        },
    },
}

// Helmet Options
export const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],
            "script-src": [
                "'self'",
                "https://cdn.jsdelivr.net/npm/socket.io-client@4.8.1/dist/socket.io.min.js"
            ],
        },
    },
}

// Rate Limiter Options
export const rateLimiterOptions = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}

// hpp options
export const hppOptions = {}


// CORS Options
export const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if the origin is allowed
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

        // //regEx to test for divyashant.in subdomains 
        // const allowedOriginsRegex = /^https?:\/\/([a-z0-9-]+\.)?divyashant\.in(:\d+)?$/;

        logger.info('Request origin:', origin);

        if (allowedOrigins.indexOf(origin) === -1 /* && !allowedOriginsRegex.test(origin) */) {
            const error = new Error('Not allowed by CORS');
            error.status = 403;
            return callback(error);
        }
        return callback(null, true);
    },

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allow only these methods
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "device-remember-token",
        "Access-Control-Allow-Origin",
        "Origin",
        "Accept",
    ], // Allow only these headers
    exposedHeaders: ['Content-Length'], // Expose these headers to the client
    credentials: true, // Allow cookies and authentication headers to be sent across domains
    maxAge: 3600, // Cache CORS preflight requests for 1 hour
    optionsSuccessStatus: 204,
}

// Cookie Parser Options
export const cookieParserOptions = {};

