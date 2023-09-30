const express = require("express");
const fs = require("fs");
const path = require("path")
const cors = require("cors");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const dbclient = require("../../db/connection.js");
const { MongoClient } = require('mongodb');
require("dotenv").config();

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

const responsequery = async (req,res) => {
    try{
        console.log("API IS WORKING!!")
        console.log(req)

        await dbclient.connect();
        const db = dbclient.db('mydb');
        const requestcollection = db.collection("requestcollection");
        const responsecollection = db.collection("responsecollection");

        const responseId = generateRandomString(16);

        const {response,messageId,userId,agentId} = req.body;

        let message = await requestcollection.findOne({messageId,userId});
        if(!message)
        {
            res.send({error : "No such client data found!"});
        }
        else if(message.response_status === "responded")
        {
            res.send({error : "already responded!!"})
        }

        else{

        let agentData = await responsecollection.insertOne({
            messageId : messageId,
            userId : userId,
            agentId : agentId,
            responseId : responseId,
            response : response
        })

        if(agentData){
            console.log("agent Data added");
        }
        const filter = {messageId}; 

        const update = {
            $set: {
                response_status: "responded",
                responseId: responseId,
                responderId: agentId,
            },
            };
        
        const options = {
              returnOriginal: false, // Set to false to return the updated document
            };
        


            try {
              // Perform the update operation
            const result = await requestcollection.findOne(filter);
            console.log(result);
        
            if (result) {
                let addedData = await requestcollection.findOneAndUpdate(filter,update,options);
                res.send({
                response_status: "responded",
                });
            } else {
                res.status(404).send({ error: "Document not found" });
            }
            } catch (error) {
            console.error("Error updating document:", error);
            res.status(500).send({ error: "Internal Server Error" });
            }
}

        }catch(error){
        res.status(404).send("Hello" + error);
    }
}

module.exports = {responsequery};