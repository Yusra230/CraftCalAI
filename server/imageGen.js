/**
 * CraftCalc AI Photorealistic Step Image Generator
 * Translates local tailoring terms (gaz, arz, astar, gira, tanka, bukram)
 * and generates cinematic photorealistic close-ups of South Asian craftswomen at work.
 */

// Helper to translate South Asian tailoring terms into clear English visual descriptors
export function expandTailoringTerms(text = "") {
  return text
    .replace(/\bgaz\b|\bguz\b/gi, "yard length of fabric")
    .replace(/\barz\b/gi, "width of fabric across the grain")
    .replace(/\bastar\b/gi, "cotton inner lining fabric")
    .replace(/\bgira\b/gi, "traditional 2.25-inch fabric fraction")
    .replace(/\btanka\b/gi, "neat hand-stitched hem seam")
    .replace(/\bmaghzi\b/gi, "bias-cut piping fabric trim")
    .replace(/\bbukram\b/gi, "fusible collar and neckline interfacing paper")
    .replace(/\bkurti\b|\bkameez\b/gi, "traditional tunic shirt garment");
}

// Photorealistic fallback library (Authentic high-resolution crafting photography)
const PHOTOREALISTIC_FALLBACKS = {
  sewing: [
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85", // Tailoring table with fabrics & scissors
    "https://images.unsplash.com/photo-1528458876885-3b6d27457a41?auto=format&fit=crop&w=1000&q=85", // Hands measuring and pinning cloth
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=85", // Detailed stitching & thread seam
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"  // Fabric pattern cutting
  ],
  crochet: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85", // Hands crocheting sunflower motifs
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85", // Colorful yarn skeins and wooden hook
    "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=85"  // Crochet squares joined together
  ]
};

export async function generateStepImage({ prompt, stepNumber = 1, craftType = "Sewing" }) {
  const apiKey = process.env.GEMINI_API_KEY;

  // Translate local darzi terms
  const expandedAction = expandTailoringTerms(prompt || "Stitching fabric pieces together");

  // Exact required photorealistic cinematic prompt:
  const photorealisticPrompt = `A photorealistic, cinematic close-up photograph of a South Asian woman’s hands actively working on this tailoring step: ${expandedAction}. Show natural details like colorful fabrics, traditional steel scissors, measuring tape, and threads on a wooden table. No text or UI elements in the image. High depth of field, warm natural indoor workshop lighting.`;

  // 1. Try Google Imagen 3 API if key is present
  if (apiKey && apiKey !== "your_gemini_api_key_here") {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
      const payload = {
        instances: [
          {
            prompt: photorealisticPrompt
          }
        ],
        parameters: {
          sampleCount: 1,
          aspectRatio: "4:3",
          outputMimeType: "image/jpeg"
        }
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const base64Data = data?.predictions?.[0]?.bytesBase64Encoded || data?.predictions?.[0]?.image?.imageBytes;
        if (base64Data) {
          return {
            success: true,
            imageUrl: `data:image/jpeg;base64,${base64Data}`,
            source: "imagen-photorealistic"
          };
        }
      } else {
        console.warn(`Imagen API status ${response.status}. Using high-resolution authentic workshop photography fallback.`);
      }
    } catch (err) {
      console.warn("Imagen generation error, using realistic crafting photo fallback:", err.message);
    }
  }

  // 2. Select matching photorealistic photograph from workshop collection
  const isCrochet = (craftType || "").toLowerCase().includes("crochet") || (prompt || "").toLowerCase().includes("yarn");
  const collection = isCrochet ? PHOTOREALISTIC_FALLBACKS.crochet : PHOTOREALISTIC_FALLBACKS.sewing;
  const photoIndex = Math.max(0, (stepNumber - 1) % collection.length);
  const selectedPhoto = collection[photoIndex];

  return {
    success: true,
    imageUrl: selectedPhoto,
    source: "curated_photorealistic"
  };
}
