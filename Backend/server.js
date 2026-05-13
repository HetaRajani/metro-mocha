const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

// ================= MONGODB CONNECTION =================

mongoose.connect(
  "mongodb://127.0.0.1:27017/metro-mocha"
)

.then(() => {
  console.log("MongoDB Connected");
})

.catch((err) => {
  console.log(err);
});

// ================= SCHEMA =================

const ContactSchema = new mongoose.Schema({

  name:String,

  email:String,

  message:String

});

const Contact = mongoose.model(
  "Contact",
  ContactSchema
);

// ================= ROUTE =================

app.post("/contact", async (req,res)=>{

  try{

    const newContact =
    new Contact(req.body);

    await newContact.save();

    res.send(
      "Message Sent Successfully!"
    );

  }

 catch(error){

  console.log(error);

  res.status(500).send(
    "Error Saving Data"
  );

}
});

// ================= SERVER =================

const PORT = 8000;

app.listen(PORT, ()=>{

  console.log(
    `Server running on port ${PORT}`
  );

});