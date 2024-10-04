const router = require("express").Router();
const { createEquipment, getEquipmentsByAdminMail, deleteAllEquipment, softDeleteEquipment, getEquipments, updateEquipment, getEquipmentByUrl, getAdminEquipmentById, getEquipmentsSizeByAdminMail, getEquipmentByMailAndUrl } = require("../controller/equipment.controller");

router.get("/", getEquipments)

router.get("/:adminMail", getEquipmentsByAdminMail)
router.get("/:adminMail/length", getEquipmentsSizeByAdminMail)

router.get("/:adminMail/:url", getEquipmentByMailAndUrl)
router.get("/admin/:id", getAdminEquipmentById)

router.get("/url/:url", getEquipmentByUrl)

router.post("/", createEquipment)
router.put("/:url", updateEquipment)
router.delete("/all", deleteAllEquipment)
router.delete("/:url", softDeleteEquipment)

module.exports = router