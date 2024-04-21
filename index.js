//include required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
const port = process.env.PORT || "8000";

const dbUrl = `mongodb://localhost:27017`;
const client = new MongoClient(dbUrl);

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


app.use(cors({
  origin: "*"
}));

//API endpoints

app.get("/user", async (req, res) => {
  try {
    const userData = await getUserData();
    res.json(userData[0]); // Assuming there is only one user document
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Server Error");
  }
});

// Get all the projects
app.get("/projects", async (req, res) => {
  try {
    const projectsData = await getProjectsData();
    res.json(projectsData);
  } catch (error) {
    console.error("Error fetching projects data:", error);
    res.status(500).send("Server Error");
  }
});

// Get project data by project ID
app.get("/projects/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const projectData = await getProjectsData();
    const project = projectData.find(project => project._id.toString() === projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
    res.status(500).send("Server Error");
  }
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
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