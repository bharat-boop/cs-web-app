const express = require("express");
const fs = require("fs");
const path = require("path")
const cors = require("cors");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const dbclient = require("../../db/connection.js");
const { MongoClient } = require('mongodb');
require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  try {

    await dbclient.connect();
    const db = dbclient.db('mydb');
    const agentData = db.collection("agentdata");

    const {username, password} = req.body;
    const agent = await agentData.findOne({username});
    if (!agent) {
      return res.status(400).send({ status: "not ok", msg: "agent not found" });
    }
    const match = await bcrypt.compareSync(password,agent.password);
    if(match){
        const { _id} = agent;
        const token = jwt.sign({ _id, username }, process.env.JWT_agent_SECRET_KEY);
        return res.status(200).send({ status: "ok", token });
    }
    else{
        return res.status(400).send({ status: "not ok" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res) => {
  try {

    await dbclient.connect();
    const db = dbclient.db('mydb');
    const agentData = db.collection("agentdata");
  
    const {name, username, password : plainTextPassword, email} = req.body;

    let uniqueCheck = await agentData.find({username}).toArray();
    if(uniqueCheck.length >= 1){
      return res.status(400).send({ status: "not ok", msg: "user not created as username already exists." });
    }

    // if(key !== process.env.CREATE_AGENT_SECRET_KEY)
    // {
    //   return res.status(400).send({ status: "not ok", msg: "user not created" });
    // }

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(String(plainTextPassword), salt);
    const agent = await agentData.insertOne({name, username, password, email});
    if (!agent) {
      return res.status(400).send({ status: "not ok", msg: "agent not created" });
    }
    return res.status(200).send({ status: "ok", msg: "agent created" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Register, Login };
