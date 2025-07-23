class ApiError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}


export class ConflictError extends ApiError {
    constructor(message = 'Resource already exists') {
        super(409, message);
    }
}