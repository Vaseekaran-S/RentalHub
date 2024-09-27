const router = require("express").Router();
const { createProperty, getProperty, deleteAllProperty, softDeleteProperty, getProperties, updateProperty, getPropertyByUrl } = require("../controller/property.controller");

router.get("/", getProperties)
router.get("/:url", getProperty)
router.get("/url/:url", getPropertyByUrl)
router.post("/", createProperty)
router.put("/:url", updateProperty)
router.delete("/all", deleteAllProperty)
router.delete("/:url", softDeleteProperty)

module.exports = router