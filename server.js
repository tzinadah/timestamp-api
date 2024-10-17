import express from "express";
import dotenv from "dotenv";
const __dirname = import.meta.dirname;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date ? isNaN(Number(req.params.date)) ? new Date(req.params.date) : new Date(Number(req.params.date)) : new Date();
  isNaN(date.getTime()) ? res.json({error: "Invalid Date"}) : res.json({unix: date.getTime(), utc: date.toUTCString()})
});

app.listen(PORT, (err, res) => {
  if (!err) console.log(`Server is listening to port ${PORT}`);
});
