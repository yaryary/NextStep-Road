import dotenv from "dotenv";

// Loads dotenv variables
dotenv.config();

export const env = {
    port: process.env.PORT || 8000,
    nodeEnv: process.env.NODE_ENV || "development",
    clientUrls: (process.env.CLIENT_URL || "http://localhost:5173")
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
    gemini: {
        apiKey: process.env.GEMINI_API_KEY || "",
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    },
};

export const isProd = env.nodeEnv === "production";