const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./database");
const parser = require("body-parser");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
app.use(parser.json());

app.get("/", function (req, res) {
  res.send("this is the authenciation system made by pranish");
});

app.post("/signup", async function (req, res) {
  try {
    const { username, password } = req.body;
    const salt = 10;
    const hashedpassword = await bcrypt.hash(password, salt);
    const new_user = new User({ username, password: hashedpassword });
    const response = await new_user.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getuser", async function (req, res) {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "Invalid Username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({error :"invalid password"})
    res.status(200).json({message:"Login Successfull"})
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is listening to the port ", port);
});
