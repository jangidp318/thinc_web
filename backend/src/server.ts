import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthRoute from "./routes/health"; // adjust import path
import connectDB from "./config/db";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/health", healthRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
