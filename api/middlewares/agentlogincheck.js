const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const dbclient = require("../db/connection");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const agentLoginCheck = async (req, res, next) => {
  try {
    if (req.headers.authorization) {

    await dbclient.connect();
    const db = dbclient.db('mydb');
    const agentData = db.collection("agentdata");

      const token = req.headers.authorization;

      const agent = jwt.verify(token, process.env.JWT_agent_SECRET_KEY);

      console.log(agent);

      const {_id} = agent;

      ObjectId = require('mongodb').ObjectId;
      let  o_id = new ObjectId(_id);

      const agentLoggedInData = await agentData.findOne({"_id" : o_id});

      if (!agentLoggedInData) {
        return res.status(400).send({ status: "not ok", msg: "No such user exists" });
      }

      const { username, email } = agentLoggedInData;
      req.user = { username, email, type: "agent" };
      console.log(req.user);
    }
    else{
        return res.status(400).send({status : "not ok", msg : "agent not logged in."})
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({status : "not ok", msg : "authentication fail."})
  }
  next();
};

module.exports = {agentLoginCheck};
