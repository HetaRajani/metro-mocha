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
console.log("MONGO_URI =", process.env.MONGO_URI);

if (!mongoUri) {
  console.error("❌ MONGO_URI is not set. Add it in Render Environment Variables.");
  process.exit(1);
}

console.log(
  "🔧 Using MongoDB URI:",
  mongoUri.startsWith("mongodb+srv")
    ? "mongodb+srv://*****"
    : mongoUri
);

// ================= SCHEMA =================
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
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

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log("✅ DATA SAVED TO MONGODB");
    res.status(200).json({ success: "Message Sent Successfully!" });

  } catch (error) {
    console.error("❌ SAVE ERROR:", error);
    res.status(500).json({
      error: "Database Error",
      details: error.message
    });
  }
});

// ================= START SERVER AFTER DB CONNECTS =================
const PORT = process.env.PORT || 8000;

mongoose.connect(mongoUri)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  console.log("MONGO_URI =", process.env.MONGO_URI);

  mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));