const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const client = require("./configs/db.js");
const cli = require("nodemon/lib/cli");
const authRoutes = require("./routes/auth");
const add_checkRoutes = require("./routes/add_check");

app.use(express.json());
app.use(cors());

client.connect(() => {
  console.log("connected to db");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}......`);
});

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!!");
});

app.use("/auth", authRoutes);
app.use("/add_check", add_checkRoutes);
