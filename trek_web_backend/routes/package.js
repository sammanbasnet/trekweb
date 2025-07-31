const express = require("express");
const router = express.Router();
const packageController = require("../controllers/package");
const upload = require("../middleware/uploads");

router.post("/", upload.single("image"),packageController.createPackage);
router.get("/", packageController.getAllPackages);
router.get("/:id", packageController.getPackageById);
router.put("/:id", packageController.updatePackage);
router.delete("/:id", packageController.deletePackage);

module.exports = router;






