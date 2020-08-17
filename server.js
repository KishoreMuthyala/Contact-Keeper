const express = require("express");
const db = require("./config/db");
const app = express();

//db Connection
db();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));

app.get("/", (req, res) => {
  res.send("Hello Coders...");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
