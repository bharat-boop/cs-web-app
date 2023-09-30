const express = require("express");
const router = express.Router();

const {responsequery} = require('../../controllers/agent/responsequery.js')
const {agentLoginCheck} = require('../../middlewares/agentlogincheck.js')


router.route("/respq").post(agentLoginCheck,responsequery);

module.exports = router;