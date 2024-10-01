const router = require("express").Router();
const { adminLogin, verifyAdminToken, getAdminProfile, createAdmin, updateAdmin, createNewAdmin } = require("../controller/admin.controller");

router.get("/:adminEmail", getAdminProfile)
router.post("/", createAdmin)
router.put("/:adminEmail", updateAdmin)
router.post("/login", adminLogin)
router.post("/signup", createNewAdmin)

router.post("/verify", verifyAdminToken)

module.exports = router