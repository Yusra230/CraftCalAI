# CraftCalc AI — Deployment Guide

This guide details the step-by-step instructions to deploy CraftCalc AI in production:
1. **Frontend (React + Vite)** deployed to **Vercel**
2. **Backend (Node.js + Express + Gemini 1.5 Flash)** deployed to **Render**

---

## 1. Prerequisites
- A GitHub repository containing the CraftCalc AI codebase.
- A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/).
- A free account on [Vercel](https://vercel.com).
- A free account on [Render](https://render.com).

---

## 2. Deploy Backend to Render (Node.js / Express Web Service)

The backend acts as a secure intermediary holding your `GEMINI_API_KEY` and forwarding multimodal audio/image payloads to Google Gemini 1.5 Flash.

### Steps:
1. Log in to **Render Dashboard** and click **New +** -> **Web Service**.
2. Connect your GitHub repository containing CraftCalc AI.
3. Configure the service settings:
   - **Name**: `craftcalc-api` (or your preferred name)
   - **Region**: Choose the closest region to your users (e.g., Frankfurt, Singapore, or Oregon)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: `Free`
4. Add **Environment Variables** in Render:
   - `GEMINI_API_KEY`: `your_gemini_api_key_here`
   - `NODE_ENV`: `production`
   - `ALLOWED_ORIGIN`: Your Vercel frontend URL (e.g. `https://craftcalc-ai.vercel.app` or `*` during initial testing)
5. Set Health Check Path:
   - Expand **Advanced** settings and set **Health Check Path** to `/api/health`.
6. Click **Deploy Web Service**.
7. Once deployed, copy your Render service URL:
   `https://craftcalc-api.onrender.com`

---

## 3. Deploy Frontend to Vercel (React + Vite)

The frontend is an accessibility-first Single Page Application (SPA) with RTL Urdu support and native audio capture.

### Steps:
1. Log in to **Vercel Dashboard** and click **Add New...** -> **Project**.
2. Import the same GitHub repository.
3. Configure the Project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select `client`.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Configure **Environment Variables** in Vercel:
   - `VITE_API_URL`: Your Render backend URL, for example:
     `https://craftcalc-api.onrender.com`
     *(Ensure no trailing slash)*
5. Click **Deploy**.
6. Once the build completes, Vercel will provide your live URL (e.g., `https://craftcalc-ai.vercel.app`).

### SPA Routing & Rewrites (vercel.json)
Vercel handles client-side routing smoothly with the following `client/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 4. Connecting Frontend & Backend (CORS)

1. Return to your **Render Web Service** dashboard for `craftcalc-api`.
2. Update the environment variable `ALLOWED_ORIGIN` with your actual Vercel domain:
   ```env
   ALLOWED_ORIGIN=https://craftcalc-ai.vercel.app
   ```
3. Trigger a redeploy on Render.

---

## 5. Local Development Workflow

To run both frontend and backend locally simultaneously:

```bash
# 1. Install all dependencies
npm run install:all

# 2. Set your Gemini API key in server/.env
cp server/.env.example server/.env
# Edit server/.env and paste your GEMINI_API_KEY

# 3. Start both client and server concurrently
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

---

## 6. Production Health & Troubleshooting

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| **CORS Error in browser console** | Origin mismatch between Vercel and Render | Update `ALLOWED_ORIGIN` on Render to match your Vercel URL. |
| **500 Server Error on Analysis** | Missing or invalid `GEMINI_API_KEY` | Check Render environment variables and confirm the key is active in Google AI Studio. |
| **First request takes ~30s on Render** | Free instance spin-down after inactivity | Render free tiers sleep after 15 min of inactivity. Keep warm with periodic pings or upgrade to Starter. |
| **Microphone permission blocked** | HTTPS required for `getUserMedia` | Both Vercel and Render provide free automatic SSL/HTTPS certificates. Always access via `https://`. |
| **Urdu font not rendering** | Font blocked or slow network | Google Fonts `Noto Nastaliq Urdu` is pre-connected in `index.html` with graceful font fallbacks. |
