const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// Initialize the main project folder
app.use(express.static("website"));

// Require Express to run server and routes
app.get("/data", async (req, res, next) => {
  try {
    res.send(projectData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.post("/data", async (req, res, next) => {
  try {
    const { temperature, date, userResponse } = req.body;
    projectData = {
      temperature,
      date,
      userResponse,
    };
    res.send(projectData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Setup Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
