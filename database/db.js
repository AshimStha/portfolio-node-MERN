// importing MongoClient object from the mongodb driver to create a client
const { MongoClient } = require("mongodb");

// DB settings

// defining the connection URL string for a default db using env variable
const dbURL = `${process.env.DB_HOST}`;

// the client
const client = new MongoClient(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// function to establish a connection with the db
async function connection() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to the database");
    // select PortfolioDB
    const db = client.db("PortfolioDB");
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

// function to return every document from the UserData collection
async function getUserData() {
  try {
    const db = await connection();
    // selecting all documents
    const userResults = await db.collection("UserData").find({}).toArray();
    return userResults;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// function to return every document from the Projects collection
async function getProjectsData() {
  try {
    const db = await connection();
    // selecting all documents
    const projectsResults = await db.collection("Projects").find({}).toArray();
    return projectsResults;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    throw error;
  }
}


// exporting the functions
module.exports = {
  getUserData,
  getProjectsData
};
