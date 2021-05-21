require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3000;
const { sequelize, User } = require("./models");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  return res.send("Hello");
});

// create
app.post("/user", async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// read
app.get("/user", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// update
app.put("/user", async (req, res) => {
  const { email } = req.query;
  try {
    const target = await User.findOne({
      where: {
        email: email,
      },
    });
    target.name = "new name";
    await target.save();
    return res.json(target);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (error) {
    return console.log(error);
  }
  // await sequelize.sync({ force: true });
  console.log(`Running on port: ${PORT}`);
});
