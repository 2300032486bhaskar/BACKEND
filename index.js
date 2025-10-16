const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const Routes = require("./routes/route.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// DB Connection
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log("❌ NOT CONNECTED TO NETWORK", err));

// Routes
app.use('/', Routes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server started at port ${PORT}`);
});
