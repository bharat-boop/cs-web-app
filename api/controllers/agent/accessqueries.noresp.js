
const express = require("express");
const fs = require("fs");
const path = require("path")
const cors = require("cors");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const dbclient = require("../../db/connection.js");
const { MongoClient } = require('mongodb');
require("dotenv").config();

const accessqueries = async (req,res) => {
    try {
        await dbclient.connect();
        const db = dbclient.db('mydb');

        const requestcollection = db.collection("requestcollection");
        const responsecollection = db.collection("responsecollection");

        const allData = await requestcollection.find({response_status : "no response"}).toArray();
        await dbclient.close();
        res.send(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = {accessqueries};
