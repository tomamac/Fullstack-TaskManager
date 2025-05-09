const express = require("express");
const auth = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api", protectedRoutes);

const port = process.env.port || 8001;
app.listen(port, () => console.log("http server run at " + port));

// const dbUrl = "mongodb://localhost:27017/taskitDB";
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log("Database connection error: ", err));
