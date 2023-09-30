const express = require("express");
const router = express.Router();

const {accessqueries} = require('../../controllers/agent/accessqueries.resp.js')
const {agentLoginCheck} = require('../../middlewares/agentlogincheck.js')

router.route("/queries/resp").get(agentLoginCheck,accessqueries);

module.exports = router;