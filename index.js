const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js"); // Your routes file

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env
dotenv.config();

// CORS setup - allow your frontend deployed URL
app.use(cors({
  origin: ["https://frontend-two-gamma-hk616hmuv7.vercel.app"], // Replace with your actual frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ NOT CONNECTED TO NETWORK", err));

// Use your routes
app.use("/", Routes);

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
});
