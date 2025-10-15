import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"; // backend port

    try {
        // Hit backend /health endpoint
        const backendRes = await fetch(`${apiBase}/health`);
        const backendData = await backendRes.json();

        // Map backend response to UI format
        res.status(200).json({
            backend: backendData.server === "up" ? "UP" : "DOWN",
            database: backendData.database === "connected" ? "UP" : "DOWN",
            frontend: "UP",
        });
    } catch {
        // If backend or DB fails
        res.status(500).json({
            backend: "DOWN",
            database: "DOWN",
            frontend: "UP",
        });
    }
}
