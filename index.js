const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env
dotenv.config();

// ✅ CORS Setup — Allow requests from your Vercel frontend
app.use(cors({
  origin: ["https://frontend-two-gamma-hk616hmuv7.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware to parse JSON
app.use(express.json({ limit: '10mb' }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.log("❌ NOT CONNECTED TO NETWORK", err));

// ✅ API Routes
app.use("/", Routes);

// ✅ Optional: Health check route
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started at port no. ${PORT}`);
});
