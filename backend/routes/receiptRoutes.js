const express = require("express");
const multer = require("multer");
const protect = require("../middleware/authMiddleware"); // ✅ Fix: import as default

// ✅ Import the controller function properly
const { processReceipt } = require("../controllers/receiptController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Route using protect + multer + OCR controller
router.post("/upload", protect, upload.single("receipt"), processReceipt);

module.exports = router;
