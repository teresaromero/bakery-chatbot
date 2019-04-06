const express = require("express");
const router = express.Router();

const moment = require("moment");

const store = require("../lib/redux/store");

/* GET home page. */
router.get("/", (req, res, next) => {
  let { daily } = store.getState();
  let imgDaily = daily.replace(" ", ",");
  let today = moment(new Date()).format("dddd, D MMMM YYYY");
  res.render("index", { today, imgDaily, daily });
});

module.exports = router;
