const express = require("express");
const mongoose = require("mongoose");
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = {};

const PORT = process.env.PORT || 8081;
const app = express();
app.use(express.json());

const uri = "mongodb://localhost:27017/"
const db = "sessionDB"

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(uri + db);
  console.log("connected to mongodb");
}
app.get("/ip", (req,res) => {
  require('dns').lookup(require('os').hostname(), (err, serverIP, fam) => {
    if (err) console.log(err);
    res.send({server: serverIP});
  });
});

app.get("/time", (req,res) => {
  const d = new Date();
  const H = d.getHours().toString();
  const m = d.getMinutes().toString();
  const s = d.getSeconds().toString();
  const HH = (H.length === 1) ? "0" + H : H;
  const mm = (m.length === 1) ? "0" + m : m;
  const ss = (s.length === 1) ? "0" + s : s;
  res.send(`${HH}:${mm}:${ss}`)
});

app.get("/name", (req,res) => {
  res.send({
    first: "Dean",
    last: "Yang"
  });
});

app.route("/db")
.get(async (req, res) => {
  await Session.findOne({username: "John Doe"}, (err, foundSession) => {})
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
