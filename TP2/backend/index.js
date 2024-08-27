require("dotenv").config();
const path = require("path");

const express = require("express");
const connectDB = require("./db");

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const contactRoutes = require("./routes/contact");
app.use("/api/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
