import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
    const dbState = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];

    res.json({
        server: "UP",
        database: states[dbState].toUpperCase(),
        timestamp: new Date().toISOString(),
    });
});

export default router;
