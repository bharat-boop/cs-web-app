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

// const userModel = require("../models/user.model");

const Login = async (req, res) => {
  try {
    await dbclient.connect();
    const db = dbclient.db('mydb');
    const clientData = db.collection("clientdata");

    const {username, password} = req.body;
    const user = await clientData.findOne({username});

    if (!user) {
      return res.status(400).send({ status: "not ok", msg: "user not found" });
    }
    const match = await bcrypt.compareSync(password,user.password);
    if(match){
        const { _id} = user;
        const token = jwt.sign({ _id, username }, process.env.JWT_USER_SECRET_KEY);
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
    const clientData = db.collection("clientdata");

    const {name, username, password : plainTextPassword, email} = req.body;

    let uniqueCheck = await clientData.find({username}).toArray();
    if(uniqueCheck.length >= 1){
      return res.status(400).send({ status: "not ok", msg: "user not created as username already exists." });
    }

    else{
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(String(plainTextPassword), salt);
    const user = await clientData.insertOne({name, username, password, email});
    if (!user) {
      return res.status(400).send({ status: "not ok", msg: "user not created" });
    }
    return res.status(200).send({ status: "ok", msg: "user created" });
  }} catch (error) {
    console.log(error);
  }
};

module.exports = { Register, Login };
