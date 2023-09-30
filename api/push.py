import pandas as pd
from pymongo import MongoClient
import secrets
import string

# Define the length of the desired string
string_length = 16

# Generate a random 16-character string
random_string = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(string_length))


# MongoDB connection settings
mongo_host = "mongodb+srv://bs027527:Bharat123@cluster0.vrbrlbm.mongodb.net/?retryWrites=true&w=majority"
mongo_port = 27017
mongo_db_name = "mydb"  # Replace with your database name
mongo_collection_name = "requestcollection"  # Replace with your collection name

# Connect to MongoDB
client = MongoClient(mongo_host, mongo_port)
db = client[mongo_db_name]
collection = db[mongo_collection_name]

# Excel file path
xlsx_file_path = "yourdata.xlsx"  # Replace with the path to your Excel file

# Read the Excel file into a DataFrame
df = pd.read_excel(xlsx_file_path)

# Rename columns (key names) as needed
df = df.rename(columns={
    'User ID': 'userId',
    'Timestamp (UTC)': 'date',
    'Message Body': 'message'
})

# Iterate through each row and save to the MongoDB collection
for index, row in df.iterrows():
    random_string = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(string_length))
    # Add the 'response' and 'responderid' fields with default values
    row['messageId'] = random_string
    row['response_status'] = 'no response'
    row['responderId'] = 'none'
    row['responseId'] = 'none'

    # Convert date to a datetime object if needed
    # You may need to use a specific date format based on your Excel data
    # Example: row['date'] = pd.to_datetime(row['date'], format='%Y-%m-%d')

    # Insert each row as a document into the MongoDB collection
    collection.insert_one(row.to_dict())

print("Excel data has been imported into MongoDB with renamed field names.")
