require("dotenv").config();

const express = require('express');
const HttpStatusCode = require("./constants/http-status-code");
const CustomException = require("./exceptions/custom.exception");
const app = express();
const routes = require('./routes/main.route');
const logger = require('./middleware/logger.middleware')
const { sendResponse } = require("./utils/response");
const cors = require('cors');
const helmet = require('helmet');

// Set up middleware
app.use(express.json())
app.use(logger);
app.use(cors());
app.use(helmet({
  hidePoweredBy: true
}));


// Initialize routes
app.use(routes);

// For undefined routes
app.use("*", (_, res) => {
  sendResponse(res, HttpStatusCode.BAD_REQUEST, false, null, [new CustomException('No Such route found')])
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening at port ${process.env.APP_PORT}`)
})