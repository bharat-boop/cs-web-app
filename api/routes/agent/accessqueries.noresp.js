const express = require("express");
const router = express.Router();

const {accessqueries} = require('../../controllers/agent/accessqueries.noresp.js')
const {agentLoginCheck} = require('../../middlewares/agentlogincheck.js')

router.route("/queries/noresp").get(agentLoginCheck,accessqueries);

module.exports = router;