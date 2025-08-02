const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

// Helper functions
const extractAmount = (text) => {
  const match = text.match(/(?:Rs\.?|₹)\s?(\d+(?:\.\d{1,2})?)/i);
  return match ? parseFloat(match[1]) : null;
};

const extractDate = (text) => {
  const match = text.match(/\b(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})\b/);
  return match ? match[1].replace(/\//g, "-") : null;
};

const extractVendor = (text) => {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines[0]?.slice(0, 50) || "Unknown";
};

const guessCategory = (vendor) => {
  const map = {
    swiggy: "Food",
    ola: "Travel",
    dmart: "Grocery",
    amazon: "Shopping",
  };
  for (const key in map) {
    if (vendor.toLowerCase().includes(key)) return map[key];
  }
  return "Others";
};

// Main controller function
exports.processReceipt = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const formData = new FormData();
    formData.append("file", fs.createReadStream(file.path));
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");

    const { data } = await axios.post("https://api.ocr.space/parse/image", formData, {
      headers: {
        apikey: "K89611266888957", // works for testing — replace with your real key if needed
        ...formData.getHeaders(),
      },
    });

    fs.unlinkSync(file.path); // Clean up file after use

    const parsedText = data?.ParsedResults?.[0]?.ParsedText || "";

    const amount = extractAmount(parsedText);
    const date = extractDate(parsedText);
    const vendor = extractVendor(parsedText);
    const category = guessCategory(vendor);

    res.json({ amount, date, description: vendor, category });
  } catch (err) {
    console.error("OCR ERROR:", err.message);
    res.status(500).json({ message: "OCR failed", error: err.message });
  }
};
