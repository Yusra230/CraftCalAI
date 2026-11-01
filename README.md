# CraftCalc AI: The Voice-First Artisan Assistant
### آواز سے سلائی اور کرافٹ کا درست نقشہ (Multimodal Gemini 1.5 Flash)

CraftCalc AI is an accessibility-first multimodal generative planning tool specifically designed for local tailors (*darzis*), mothers, zero-waste upcyclers, and home-based artisans. It removes the keyboard entirely:
1. **Upload / Snap a Photo**: Reference image of a garment, crochet bandana, or upcycled patchwork item.
2. **Hold-to-Talk in Urdu**: User speaks natural constraints in conversational Urdu (e.g. *"بیٹا، اس کے لیے کتنا کپڑا چاہیے اور 13 انچ کا لیپ ٹاپ فٹ آنا چاہیے؟"*).
3. **Pulsing Loading State**: Displays a responsive 3-card skeleton loader with culturally warm Urdu progress updates during Gemini 1.5 Flash multimodal processing.
4. **Calculated Blueprint & Voice Readout**: Generates 3 clean RTL cards (Material Estimate, Cut List, Assembly Steps) with Noto Nastaliq Urdu typography and reads the results aloud using the browser's Web Speech API (`ur-PK`).
5. **Desktop / Fallback Input**: Collapsible accordion adjacent to the mic for environments without microphone hardware or browser permissions.

---

## Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
  - Native RTL direction and Google Font **Noto Nastaliq Urdu**.
  - MediaRecorder API with audio chunk streaming to Base64 (WebM/MP4).
  - Web Speech API (`SpeechSynthesis`) for zero-cost native voice synthesis.
- **Backend**: Node.js & Express.
  - Secures `GEMINI_API_KEY`.
  - Interfaces directly with Google Gemini 1.5 Flash using structured `responseSchema`.
  - Culturally respectful Urdu error handling for invalid/unreadable images, silent audio, or network timeouts.

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
# Install server dependencies
npm --prefix server install

# Install client dependencies
npm --prefix client install
```

### 2. Configure Environment Variables
Copy the server example environment file:
```bash
cp server/.env.example server/.env
```
Open `server/.env` and insert your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
```

### 3. Start Both Frontend & Backend
You can run them in two terminals:

**Terminal 1 (Backend):**
```bash
npm --prefix server start
```

**Terminal 2 (Frontend):**
```bash
npm --prefix client run dev
```

Open `http://localhost:5173` in your browser.

---

## Deployment

Refer to [`deploy.md`](./deploy.md) for full instructions on deploying:
- **Frontend** to **Vercel**
- **Backend** to **Render**
