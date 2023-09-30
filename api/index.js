// const express = require("express");
// const app = express();
// const cors = require("cors");
// const authRoutes = require("./routers/route");




// const dbconnect = require("./db/dbconnect.js");

// require("dotenv").config();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());


// app.use(authRoutes);

// const serverStart = async () => {
//   try {
//     await dbconnect(process.env.MONGO_URL);
//     console.log("Connected to the DB");
//     app.listen(PORT, () => {
//       console.log(`http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// serverStart();
const express = require("express");
const fs = require("fs");
const path = require("path")
const cors = require("cors");
const crypto = require("crypto");
const bodyParser = require("body-parser");
// const dbconnect = require("./db/connection.js");
// const clientModel = require("./db/clientmodel.js");
// const agentModel = require("./db/agentmodel.js");
const { MongoClient } = require('mongodb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


const uri = process.env.MONGO_URL;
const dbclient = new MongoClient(uri);

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

app.get('/api/client', async (req, res) => {
        try {
          // Connect to MongoDB
          await dbclient.connect();
      
          const db = dbclient.db('mydb');
          const collectionName = 'mycollection';
          const collection = db.collection(collectionName);

          const allData = await collection.find().toArray();
          await dbclient.close();
          res.send(allData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      });

app.post('/api/agent', async(req,res) => {
    try{
        await dbclient.connect();
        const db = dbclient.db('mydb');
        const clientcollection = db.collection("mycollection");
        const agentcollection = db.collection("agentcollection");

        const response_id = generateRandomString(16);

        const {response,messageId,userId,agentId} = req.body;

        let agentData = await agentcollection.insertOne({
            messageId : messageId,
            userId : userId,
            agentId : agentId,
            response_id : response_id,
            response : response
        })

        if(agentData){
            console.log("agent Data added");
        }

        const filter = { messageId}; 

        const update = {
            $set: {
                response_status: "responded",
                response_id: response_id,
                responder_id: agentId,
            },
            };
        
        const options = {
              returnOriginal: false, // Set to false to return the updated document
            };
        


            try {
              // Perform the update operation
              const result = await clientcollection.findOne(filter);
              console.log(result);
          
              if (result) {
                let addedData = await clientcollection.findOneAndUpdate(filter,update,options);
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




        }catch(error){
        res.send("Error is the, problem is the : " + error);
    }
})





const serverStart = async () => {
  try {
    // await dbconnect(process.env.MONGO_URI);
    console.log("Connected to the DB");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

serverStart();