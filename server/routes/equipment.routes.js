const router = require("express").Router();
const { createEquipment, getEquipmentByAdminMail, deleteAllEquipment, softDeleteEquipment, getEquipments, updateEquipment, getEquipmentByUrl, getAdminEquipmentByUrl } = require("../controller/equipment.controller");

router.get("/", getEquipments)
router.get("/:adminMail", getEquipmentByAdminMail)
router.get("/admin/:url", getAdminEquipmentByUrl)

router.get("/url/:url", getEquipmentByUrl)

router.post("/", createEquipment)
router.put("/:url", updateEquipment)
router.delete("/all", deleteAllEquipment)
router.delete("/:url", softDeleteEquipment)

module.exports = router