const express = require('express');
const HttpStatusCode = require('../constants/http-status-code');
const { sendResponse } = require('../utils/response');
const router = express.Router();

router.use("/api", require("./candidate.route"));
router.use("/api/admin", require("./admin.route"));

router.get('/', (_, res) => {
   sendResponse(res, HttpStatusCode.OK, true, { messsage: "API is running" })
})

module.exports = router;