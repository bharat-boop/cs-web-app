// const mongoose = require('mongoose')

// module.exports = (url) => {
// mongoose.connect(url,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     family: 4 // Use IPv4, skip trying IPv6
// })
// .then(console.log("connection success!!"))
// .catch((err)=>console.log(err));
// }


const { MongoClient } = require('mongodb');
require("dotenv").config();

const uri = process.env.MONGO_URI;

module.exports = new MongoClient(uri);