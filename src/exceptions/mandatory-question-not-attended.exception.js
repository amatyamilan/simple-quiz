const InAppErrorCode = require("../constants/in-app-error-code");
const CustomException = require("./custom.exception");

class MandatoryQuestionNotAttendedException extends CustomException {
    constructor() {
        super('Mandatory questions are missing answers');
        this.name = this.constructor.name;
        this.code = InAppErrorCode.MANDATORY_QUESTION_NOT_ATTENDED;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = MandatoryQuestionNotAttendedException