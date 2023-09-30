const express = require("express");
const fs = require("fs");
const path = require("path")
const cors = require("cors");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const dbclient = require("./db/connection.js");
const { MongoClient } = require('mongodb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const agent_responsequery = require("./routes/agent/responsequery.js")
const agent_resp_accessqueries = require("./routes/agent/accessqueries.resp.js")
const agent_noresp_accessqueries = require("./routes/agent/accessqueries.noresp.js")
const clientAuth = require("./routes/auth/clientauth.js")
const agentAuth = require("./routes/auth/agentauth.js")

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


//Agent APIs
app.use("/api/agent",agent_responsequery);
app.use("/api/agent",agent_resp_accessqueries);
app.use("/api/agent",agent_noresp_accessqueries);
app.use("/api/agent",agentAuth);


//Client APIs
app.use("/api/client",clientAuth);


const serverStart = async () => {
  try {
    // await dbclient(process.env.MONGO_URI);
    console.log("Connected to the DB");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

serverStart();
