import { CustomError } from "../utils/ApiError.js";
import logger from "../utils/logger.js";

export const globalErrorHandler = (err, req, res, next) => {
    
    logger.error("Global Error Handler");
    logger.error(err);

    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .json({
                ...err.serializeError()
            })
    }


    // TODO: Handle Database Error and other types of errors

    return res.status(500).json({
        status: "error",
        message: 'Something went wrong',
        success: false,
        data: null
    })
}

