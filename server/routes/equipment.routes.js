const router = require("express").Router();
const { createEquipment, getEquipment, deleteAllEquipment, softDeleteEquipment, getEquipments, updateEquipment, getEquipmentByUrl } = require("../controller/equipment.controller");

router.get("/", getEquipments)
router.get("/:url", getEquipment)
router.get("/url/:url", getEquipmentByUrl)
router.post("/", createEquipment)
router.put("/:url", updateEquipment)
router.delete("/all", deleteAllEquipment)
router.delete("/:url", softDeleteEquipment)

module.exports = router