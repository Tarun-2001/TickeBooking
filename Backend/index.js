const express = require("express");
const dotenv = require("dotenv").config();
const cors = require('cors')
const { dbConnection } = require("./Db_Connection");
const { error } = require("./middleware/error-handle");
const { protect } = require("./middleware/authentication");
const auth = require('./routs/auth')
const bookTickets = require('./routs/booking')
const port = 5000 || process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/api/auth",auth);
app.use("/api/book", protect, bookTickets);
app.use(error);

app.listen(port, async () => {
  dbConnection(process.env.MONGOURL);
  console.log("Server Started sucessufully");
});
