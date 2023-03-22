const { validationResult } = require("express-validator");
const HttpStatusCode = require("../constants/http-status-code");
const { sendResponse } = require("../utils/response");

const validateBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, HttpStatusCode.UNPROCESSABLE_ENTITY, false, null, errors.array())
    // return res.status(400).json({
    //   success: false,
    //   errors: errors.array().map((error) => {
    //     return {
    //       code: 400,
    //       msg: error.msg,
    //       param: error.param,
    //       location: error.location
    //     }
    //   }),
    //   data: null
    // });
  }

  next();
};

module.exports = {
  validateBody,
};
