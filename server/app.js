require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 8080 || process.env.PORT;

app.use(cors());
app.use(express.json());

const chatRoutes = require("./routes/api");

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
