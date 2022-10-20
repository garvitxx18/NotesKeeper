const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/room-data");

// middle ware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.post("/data", async (req, res) => {
  // console.log(req.body);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      notes: req.body.notes,
    });
    res.json({ status: "OK" });
  } catch {
    res.json({ status: "Error", error: "Duplicate email" });
  }
});
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    // password: req.body.password,
  });
  console.log(user);
  // console.log(user);
  if (user) {
    const token = {
      name: user.name,
      email: user.email,
      password: user.password,
      notes: user.notes,
    };
    res.json({ status: "OK", user: token });
  } else {
    res.json({ status: "Error", user: false });
  }
});
app.post("/update", async (req, res) => {
  const email = req.body.email;
  await User.updateOne({ email: email }, { $set: { notes: req.body.temp } });
  console.log(req.body);
  res.json("updated");
  console.log("success");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
