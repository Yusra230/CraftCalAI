import { GoogleGenerativeAI } from "@google/generative-ai";
import { craftBlueprintSchema } from "./schema.js";

const SYSTEM_INSTRUCTION = `
You are CraftCalc AI (کرافٹ کیلک) — an elite master artisan and master tailor (استاد درزی / باجی) with decades of precision pattern drafting, zero-waste upcycling, and crochet/knitting expertise.

Your users are mothers, local Pakistani/South Asian tailors (darzis), and passionate home crafters.
They communicate naturally in conversational Urdu or Roman Urdu (e.g. "Beta, iske liye kitna kapra chahiye aur laptop fit hona chahiye?", "Astar kitna lagega?", "8cm denim squares se laptop bag banana hai").

Your Core Missions:
1. Reverse-engineer the provided reference image (garment, accessory, crochet piece, or upcycled item).
2. Listen carefully to the user's spoken voice note (or read their typed constraint).
3. Calculate mathematically precise cut lists and material yardages:
   - Always factor in 0.5-inch (1.25 cm) seam allowances unless zero-waste flat seaming is noted.
   - Use standard South Asian garment metrics where relevant (گز / Gaz, انچ / Inches, عرض / Arz width, گرہ / Gira, گرام / Grams).
   - If upcycling or patchwork, calculate exact grid arithmetic (e.g., how many 8x8 cm squares make a 9x13 inch pouch including seam overlap).
   - If crochet, provide yarn weight (4-ply, DK), hook gauge (e.g. 3.5mm), and color ratios (e.g. off-white center, maroon petals, green border).
4. Provide Visual Step Diagrams:
   - For every single item in 'assembly_steps', you MUST generate a clear, descriptive 'visual_diagram_prompt_en' in English.
   - Describe a minimalist vector schematic or flat sewing diagram (e.g. 'Flat vector illustration of Step 1: Two fabric panels laid right sides together with pins along the 0.5-inch seam allowance, showing stitching path with red dashed line on white background').
5. Output Tone:
   - Polite, respectful, culturally affectionate (e.g. "باجی / استاد جی، آپ کے بتائے ہوئے ناپ کے مطابق...").
   - Clear, straightforward Urdu without unnecessarily convoluted English jargon.
6. Provide a cohesive 'speech_script_ur' designed specifically to be read aloud by browser Text-to-Speech (Web Speech API). It should sound like an encouraging master craftsperson summarizing the necessary yardage, primary cuts, and one crucial tip.

You MUST respond strictly with valid JSON conforming to the responseSchema provided.
`;

export async function analyzeCraft({ imageBase64, imageMimeType, audioBase64, audioMimeType, textPrompt, language = "ur" }) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw {
      status: 500,
      code: "MISSING_API_KEY",
      message_ur: "گوگل جیمنائی اے پی آئی کی (GEMINI_API_KEY) غائب ہے۔ براہ کرم سرور پر .env فائل چیک کریں۔",
      message_en: "Gemini API key is not configured. Please add GEMINI_API_KEY to server/.env."
    };
  }

  if (!imageBase64) {
    throw {
      status: 400,
      code: "MISSING_IMAGE",
      message_ur: "براہ کرم پہلے کپڑے یا ڈیزائن کی تصویر اپ لوڈ کریں۔",
      message_en: "Please provide an image of the garment or craft first."
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: craftBlueprintSchema,
        temperature: 0.2,
      }
    });

    const parts = [];

    // Add Image part
    parts.push({
      inlineData: {
        data: imageBase64,
        mimeType: imageMimeType || "image/jpeg"
      }
    });

    // Add Audio part if available
    if (audioBase64) {
      parts.push({
        inlineData: {
          data: audioBase64,
          mimeType: audioMimeType || "audio/webm"
        }
      });
      parts.push({
        text: "Please listen carefully to the user's voice note audio above in Urdu. Reverse engineer the image according to their spoken instructions."
      });
    }

    // Add Fallback / Additional Text Prompt if provided
    if (textPrompt && textPrompt.trim().length > 0) {
      parts.push({
        text: `Additional user constraints or instructions: "${textPrompt.trim()}"`
      });
    }

    if (!audioBase64 && (!textPrompt || textPrompt.trim().length === 0)) {
      parts.push({
        text: "The user has not provided specific audio notes. Provide standard reverse engineering, material yardage, cut list, and assembly steps with visual diagram prompts for an adult medium or standard item based solely on the reference photo."
      });
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    const textOutput = response.text();

    if (!textOutput) {
      throw {
        status: 500,
        code: "EMPTY_RESPONSE",
        message_ur: "تصویر کا معائنہ مکمل نہ ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔",
        message_en: "Could not generate blueprint. Please try again."
      };
    }

    const parsedJson = JSON.parse(textOutput);
    return parsedJson;

  } catch (error) {
    console.error("Gemini Multimodal Analysis Error:", error);

    // If it's already our structured custom error
    if (error.code && error.message_ur) {
      throw error;
    }

    // Inspect Gemini API error strings to offer culturally respectful feedback
    const errString = (error.message || "").toLowerCase();

    if (errString.includes("safety") || errString.includes("blocked")) {
      throw {
        status: 400,
        code: "CONTENT_FLAGGED",
        message_ur: "تصویر یا مواد پروسیس نہیں ہو سکا۔ براہ کرم سلائی یا کرافٹ سے متعلق واضح تصویر استعمال کریں۔",
        message_en: "Content could not be processed due to safety flags."
      };
    }

    if (errString.includes("quota") || errString.includes("rate limit") || errString.includes("429")) {
      throw {
        status: 429,
        code: "RATE_LIMITED",
        message_ur: "سسٹم پر اس وقت زیادہ رش ہے۔ براہ کرم چند لمحے بعد دوبارہ کوشش کریں۔",
        message_en: "API rate limit reached. Please wait a moment and try again."
      };
    }

    if (errString.includes("invalid argument") || errString.includes("unsupported mime") || errString.includes("image")) {
      throw {
        status: 400,
        code: "INVALID_IMAGE",
        message_ur: "تصویر واضح نہیں ہے یا فارمیٹ غیر معتبر ہے۔ براہ کرم واضح اور سیدھی تصویر کے ساتھ دوبارہ کوشش کریں۔",
        message_en: "Image was unreadable or format is unsupported. Please upload a clear photo."
      };
    }

    if (errString.includes("audio") || errString.includes("decode")) {
      throw {
        status: 400,
        code: "INVALID_AUDIO",
        message_ur: "آواز صاف سنائی نہیں دی یا فارمیٹ درست نہیں تھا۔ براہ کرم مائیک کے قریب دوبارہ ریکارڈ کریں یا نیچے لکھ کر بتائیں۔",
        message_en: "Audio could not be decoded. Please record again or use the text fallback."
      };
    }

    // Generic fallback error
    throw {
      status: 500,
      code: "ANALYSIS_FAILED",
      message_ur: "معذرت، حساب کتاب میں کوئی مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں یا تصویر چیک کریں۔",
      message_en: "Failed to calculate blueprint. Please try again."
    };
  }
}
