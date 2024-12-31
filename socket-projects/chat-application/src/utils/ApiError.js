
class CustomError extends Error {
    constructor(statusCode, message, data=null) {
        this.statusCode = statusCode;
        this.success = false;
        this.data = data;
        super(message);
    }

    // TODO: add StackTrace to Error in development mode

    serializeError() {
        return [
            {
                status: "error",
                message: this.message,
                success: this.success,
                data: this.data
            }
        ]; // message:string, property:string
    }
}

export {
    CustomError
}
