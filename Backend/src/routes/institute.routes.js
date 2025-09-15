const express = require("express");
const router = express.Router();
const instituteController = require("../controllers/instituteController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", instituteController.getInstitutes);
router.get("/:id", instituteController.getInstituteById);

// Protected routes (only admins/gov/faculty can modify)
router.post("/", authMiddleware, instituteController.createInstitute);
router.put("/:id", authMiddleware, instituteController.updateInstitute);
router.delete("/:id", authMiddleware, instituteController.deleteInstitute);

module.exports = router;
