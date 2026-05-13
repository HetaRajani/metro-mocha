const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extra safety

// ================= MONGODB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// ================= SCHEMA =================
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// ================= HEALTH CHECK ROUTE =================
app.get("/", (req, res) => {
  res.json({ status: "Server is running!" });
});

// ================= CONTACT ROUTE =================
app.post("/contact", async (req, res) => {
  console.log("REQUEST BODY:", req.body);

  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log("DATA SAVED SUCCESSFULLY");
    res.status(200).json({ success: "Message Sent Successfully!" });
  } catch (error) {
    console.log("SAVE ERROR:", error);
    res.status(500).json({ error: "Error Saving Data" });
  }
});

// ================= SERVER =================
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});