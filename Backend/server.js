const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= MONGODB CONNECTION =================
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ MONGO_URI is not set. Add it to Render Environment Variables or your local .env file.");
  process.exit(1);
}

console.log("🔧 Using MongoDB URI:", mongoUri.startsWith("mongodb+") ? mongoUri.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+(@.*)/, "$1*****$2") : mongoUri);

mongoose.connect(mongoUri)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ================= SCHEMA =================
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  message: { type: String, required: [true, "Message content is required"] },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.json({ 
    status: "Server is running!",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

app.post("/contact", async (req, res) => {
  console.log("Incoming Request Body:", req.body);

  const { name, email, message } = req.body;

  // Manual Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields (name, email, message) are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Please provide a valid email address" });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log("✅ DATA SAVED TO MONGODB");
    res.status(200).json({ success: "Message Sent Successfully!" });
  } catch (error) {
    // Log the full error to the terminal so you can read it
    console.error("❌ SAVE ERROR DETAIL:", error);

    // Send the specific error message back to the frontend for debugging
    res.status(500).json({ 
      error: "Database Error", 
      details: error.message 
    });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});