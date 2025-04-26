const express = require("express");
const register = require("./routes/register");
const login = require("./routes/login");
const protectedRoutes = require("./routes/protected");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", register);
app.use("/api/auth", login);
app.use("/api", protectedRoutes);

const port = process.env.port || 5000;
app.listen(port, () => console.log("http server run at " + port));
