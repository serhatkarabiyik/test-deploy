import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import userRoutes from "./routes/userRoutes.js";
import timerRoutes from "./routes/timerRoutes.js";
import cors from "cors";
import swaggerDocs from "../swagger.js";

dotenv.config();

const app = express();

app.use(cors());
swaggerDocs(app);

connectDB();

app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/timer", timerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
