const express = require("express");
const dotenv = require("dotenv");
const fileupload = require('express-fileupload');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const user = require("./Routes/user.Routes");
const JobPost = require("./Routes/JobPost.routes");
const JobApply = require("./Routes/JobApply.routes");


dotenv.config();

app.use(cors({


  origin: "*",
}));


//Check Heroku
app.get("/", (req, res) => {
  res.json("Backend Server has Started ")
});


const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use Routes
app.use("/user", user);
app.use("/jobVacancy", JobPost);
app.use("/JobApply", JobApply);


//DB connection

mongoose.connect(
  process.env.MDB_CONNECT_STRING, {
  //type warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Mongo DB connected successfully");
  })

  .catch((err) => console.log("DB connection failed", err));

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});


