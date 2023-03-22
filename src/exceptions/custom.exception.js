class CustomException extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code || 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomException