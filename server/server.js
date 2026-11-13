
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Feedback Route
const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
    res.send("Feedback Management Backend is Running!");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((error) => console.log("MongoDB Error:", error.message));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
