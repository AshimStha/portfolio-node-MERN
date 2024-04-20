// importing MongoClient object from the mongodb driver to create a client
const { MongoClient } = require("mongodb");

// DB settings

// defining the connection URL string for a default db using env variable
const dbURL = `${process.env.DB_HOST}`;
// the client
const client = new MongoClient(dbURL);

// DB helper functions

/*
 * function to establish a connection with the db
 *
 * It selects the PortfolioDB and returns it
 *
 */
async function connection() {
  // select PortfolioDB
  db = client.db("PortfolioDB");
  return db;
}

// function to return every documents from the UserData collection
async function getUserData() {
  db = await connection();
  // selecting all documents
  var userResults = db.collection("UserData").find({});
  // converting the documents list to an array
  usersArray = await userResults.toArray();
  return usersArray;
}

// function to return every documents from the Projects collection
async function getProjects() {
    db = await connection();
    // selecting all documents
    var projectsResults = db.collection("Projects").find({});
    // converting the documents list to an array
    projectsArray = await projectsResults.toArray();
    return projectsArray;
  }

// exporting the functions
module.exports = {
    getUserData,
    getProjects
}