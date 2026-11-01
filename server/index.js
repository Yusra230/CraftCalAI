import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { analyzeCraft } from "./gemini.js";
import { generateStepImage } from "./imageGen.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory or project root
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

// Middleware
app.use(cors({
  origin: ALLOWED_ORIGIN === "*" ? "*" : [ALLOWED_ORIGIN, "http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Increase JSON payload limit to accommodate Base64 images and audio blobs
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Health Check
app.get("/api/health", (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here");
  res.json({
    status: "ok",
    service: "CraftCalc AI Server",
    geminiKeyConfigured: hasKey,
    timestamp: new Date().toISOString()
  });
});

// Primary Multimodal Reverse-Engineering Endpoint
app.post("/api/analyze", async (req, res) => {
  try {
    const { imageBase64, imageMimeType, audioBase64, audioMimeType, textPrompt, language } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        error: {
          code: "MISSING_IMAGE",
          message_ur: "تصویر غائب ہے۔ براہ کرم کپڑے یا ڈیزائن کی تصویر منتخب کریں۔",
          message_en: "No image provided. Please upload a garment or craft photo."
        }
      });
    }

    const blueprint = await analyzeCraft({
      imageBase64,
      imageMimeType: imageMimeType || "image/jpeg",
      audioBase64,
      audioMimeType: audioMimeType || "audio/webm",
      textPrompt,
      language: language || "ur"
    });

    return res.json({
      success: true,
      blueprint
    });

  } catch (err) {
    console.error("API /api/analyze Error:", err);
    const status = err.status || 500;
    return res.status(status).json({
      error: {
        code: err.code || "INTERNAL_ERROR",
        message_ur: err.message_ur || "معذرت، حساب کتاب میں کوئی مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔",
        message_en: err.message_en || "An unexpected error occurred while analyzing the craft."
      }
    });
  }
});

// New AI-Generated Visual Steps Route
app.post("/api/generate-step-image", async (req, res) => {
  try {
    const { prompt, stepNumber, craftType } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: {
          code: "MISSING_PROMPT",
          message_ur: "خاکے کے لیے ہدایات موجود نہیں ہیں۔",
          message_en: "Missing visual diagram prompt."
        }
      });
    }

    const result = await generateStepImage({
      prompt,
      stepNumber: stepNumber || 1,
      craftType: craftType || "Sewing"
    });

    return res.json(result);

  } catch (err) {
    console.error("API /api/generate-step-image Error:", err);
    return res.status(500).json({
      error: {
        code: "IMAGE_GEN_FAILED",
        message_ur: "خاکہ تیار کرنے میں مسئلہ پیش آیا۔",
        message_en: "Failed to generate step visual diagram."
      }
    });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🧵 CraftCalc AI backend running on http://localhost:${PORT}`);
  console.log(`📡 Gemini API Key Status: ${process.env.GEMINI_API_KEY ? "Configured" : "NOT CONFIGURED (Check server/.env)"}`);
});
