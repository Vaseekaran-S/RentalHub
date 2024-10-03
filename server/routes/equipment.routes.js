const router = require("express").Router();
const { createEquipment, getEquipmentByAdminMail, deleteAllEquipment, softDeleteEquipment, getEquipments, updateEquipment, getEquipmentByUrl, getAdminEquipmentById, getEquipmentsSizeByAdminMail } = require("../controller/equipment.controller");

router.get("/", getEquipments)

router.get("/:adminMail", getEquipmentByAdminMail)
router.get("/:adminMail/length", getEquipmentsSizeByAdminMail)
router.get("/admin/:id", getAdminEquipmentById)

router.get("/url/:url", getEquipmentByUrl)

router.post("/", createEquipment)
router.put("/:url", updateEquipment)
router.delete("/all", deleteAllEquipment)
router.delete("/:url", softDeleteEquipment)

module.exports = router