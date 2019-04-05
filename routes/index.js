const express = require("express");
const router = express.Router();
const axios = require("axios");

const moment = require("moment");


/* GET home page. */
router.get("/", (req, res, next) => {
  let { daily } = req.app.locals;
  let imgDaily = daily.replace(" ", ",");
  let today = moment(new Date()).format("dddd, D MMMM YYYY");
  res.render("index", { today, imgDaily });
});

module.exports = router;
