const HttpStatusCode = require("../constants/http-status-code");
const InAppErrorCode = require("../constants/in-app-error-code");
const CustomException = require("./custom.exception");

class EntityNotFoundException extends CustomException {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.code = InAppErrorCode.ENTITY_NOT_FOUND;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = EntityNotFoundException