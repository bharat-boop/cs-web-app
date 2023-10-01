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

const clientLoginCheck = async (req, res, next) => {
  try {
    if (req.headers.authorization) {

    await dbclient.connect();
    const db = dbclient.db('mydb');
    const clientData = db.collection("clientdata");

      const token = req.headers.authorization;

      const client = jwt.verify(token, process.env.JWT_client_SECRET_KEY);

      console.log(client);

      const {_id} = client;

      ObjectId = require('mongodb').ObjectId;
      let  o_id = new ObjectId(_id);

      const clientLoggedInData = await clientData.findOne({"_id" : o_id});

      if (!clientLoggedInData) {
        return res.status(400).send({ status: "not ok", msg: "No such user exists" });
      }

      const { username, email } = clientLoggedInData;
      req.user = { username, email, type: "client" };
      console.log(req.user);
    }
    else{
        return res.status(400).send({status : "not ok", msg : "client not logged in."})
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({status : "not ok", msg : "authentication fail."})
  }
  next();
};

module.exports = {clientLoginCheck};
