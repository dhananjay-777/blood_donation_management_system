const express = require("express");
const {
  add,
  update,
  check,
  add_camp,
  find_camps,
} = require("../controllers/add_check");
const router = express.Router();

router.post("/add", add);
router.post("/add_camp", add_camp);
router.post("/update", update);
router.post("/check", check);
router.post("/find_camps", find_camps);

module.exports = router;
