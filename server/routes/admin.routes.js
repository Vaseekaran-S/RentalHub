const router = require("express").Router();
const { adminLogin, verifyAdminToken, getAdminProfile, createAdmin, updateAdmin } = require("../controller/admin.controller");

router.get("/:adminId", getAdminProfile)
router.post("/", createAdmin)
router.put("/:adminId", updateAdmin)
router.post("/login", adminLogin)
router.post("/verify", verifyAdminToken)

module.exports = router