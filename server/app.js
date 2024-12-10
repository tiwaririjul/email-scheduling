const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./cron/emailJob");

const PORT = process.env.PORT || 4000;

const emailRoutes = require("./routes/emailRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/emails", emailRoutes);
app.get("/working", (req, res) => {
  res.json({ message: "server is working" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
