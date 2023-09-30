// Import necessary libraries
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');



const MONGO_URL = process.env.MONGO_URL;
// Connect to MongoDB (replace 'your-database-url' and 'your-database-name' with your MongoDB connection details)
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for your data (adjust this based on your needs)
const messageSchema = new mongoose.Schema({
  userID: String,
  isAnswered: Boolean,
  answer: String,
  messageBody: String,
  timestamp: Date,
});

// Create a model based on the schema
const Message = mongoose.model('Message', messageSchema);

// Read and parse the CSV file
fs.createReadStream('your-csv-file.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Create a new document and save it to MongoDB
    const message = new Message({
      userID: row['User ID'],
      messageBody: row['Message Body'],
      answer: '',
      timestamp: row['Timestamp (UTC)'],
      isAnswered: false,
    });

    message.save()
      .then(() => console.log(`Inserted message for user: ${row['User ID']}`))
      .catch((error) => console.error(`Error inserting message: ${error}`));
  })
  .on('end', () => {
    console.log('CSV data successfully inserted into MongoDB');
    mongoose.connection.close(); // Close the MongoDB connection when done
  });
