const sendResponse = (res, statusCode, success, data, errors = []) => {
    if (success) {
        return res.status(statusCode).json({
            success: true,
            data,
            errors: null
        });
    } else {
        return res.status(statusCode).json({
            success: false,
            data: null,
            errors: errors.map(error => {
                return {
                    code: error.code || statusCode,
                    message: error.msg || error.message,
                    param: error.param,
                    location: error.location
                };
            })
        });
    }
}

module.exports = {
    sendResponse
};