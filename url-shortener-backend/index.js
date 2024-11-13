const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const moment = require("moment");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//--------- MongoDB Connection -------------------

mongoose.connect(
  "mongodb+srv://fjollaaliu:MyMongoDb123@url-shortener.3xvkq.mongodb.net/?retryWrites=true&w=majority&appName=url-shortener"
);
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//----------- Managing ShortLinks -------------

const ShortLink = require("./shortlinks.model");

const linksRoutes = express.Router();
app.use("/shortlinks", linksRoutes);

//-------------- GET Method --------------------

linksRoutes.route("/").get(async (req, res) => {
  try {
    const links = await ShortLink.find();
    res.json(links);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------ POST Method -----------------------

linksRoutes.route("/").post(async (req, res) => {
  try {
    const { originalUrl, expiry } = req.body;

    if (!expiry) {
      return res.status(400).json({ error: "Please select an expiry date." });
    }

    // Generating a short code
    const shortCode = Math.random().toString(36).substring(2, 8);

    const expirationTimeInMinutes = expiry ? parseInt(expiry, 10) : null;
    let expirationDate = null;

    if (expirationTimeInMinutes) {
      const currentTime = moment().utcOffset(60);

      expirationDate = currentTime.add(expirationTimeInMinutes, "minutes");
    }
    const newLink = new ShortLink({
      originalUrl,
      shortCode,
      expirationTime: expirationDate,
    });

    await newLink.save();
    res.json({ shortLink: `https://short.link/${shortCode}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create short link" });
  }
});

linksRoutes.route("/:shortCode").get(async (req, res) => {
  const shortCode = req.params.shortCode;

  try {
    const originalLink = await ShortLink.findOne({ shortCode });

    if (!originalLink) {
      return res.status(404).json({ error: "Link not found." });
    }

    if (
      originalLink.expirationTime &&
      new Date(originalLink.expirationTime) < new Date()
    ) {
      return res.status(400).json({ error: "Link has expired." });
    }

    res.redirect(originalLink.originalUrl);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

//---------------  DELETE Method  ----------------------------

linksRoutes.route("/:shortCode").delete(async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const result = await ShortLink.deleteOne({ shortCode });

    if (result.deletedCount === 0) {
      return res.status(404).send("Link not found.");
    }

    res.send("Link deleted successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
