const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routers/route");




const dbconnect = require("./db/dbconnect.js");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use(authRoutes);

const serverStart = async () => {
  try {
    await dbconnect(process.env.MONGO_URL);
    console.log("Connected to the DB");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
serverStart();