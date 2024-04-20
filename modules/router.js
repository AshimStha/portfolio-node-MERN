const express = require("express");
// the app router
const router = express.Router();
// importing the db.js file to use the functions
const model = require("../database/db.js");

// API ROUTES

// Get user data
router.get("/user", async (req, res) => {
  try {
    const userData = await model.getUserData();
    res.json(userData[0]); // Assuming there is only one user document
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Server Error");
  }
});

// Get project data by project ID
router.get("/projects/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const projectData = await model.getProjectsData();
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

// exporting the router
module.exports = router;
