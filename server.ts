import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the GoogleGenAI instance server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("GEMINI_API_KEY variable is missing. Chatbot will run in fallback simulation mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: apiKey ? "genai" : "fallback" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      const client = getAiClient();
      if (!client) {
        // Fallback simulation mode when GEMINI_API_KEY is not defined
        setTimeout(() => {
          const lower = message.toLowerCase();
          let responseText = "Thank you for contacting ZeeVisa Global. I am currently operating in advisory mode. For detailed visa assistance regarding Saudi Arabia, UAE, Qatar or other Gulf states, you can book a free expert consultation slot via our booking module.";
          
          if (lower.includes("saudi") || lower.includes("etimad")) {
            responseText = "For Saudi Arabia visas: Standard workflow involves completing Wafid/GAMCA medical tests, biometric appointment booking through the Etimad Saudi Visa center, and submitting certified passport and national identity documents. Typical professional salaries depend on specialization (spanning 4,000 to 14,000 SAR monthly).";
          } else if (lower.includes("uae") || lower.includes("emirates") || lower.includes("dubai")) {
            responseText = "For the United Arab Emirates: Entry visas are issued via the ICP (Federal Authority for Identity, Citizenship, Customs and Port Security) or GDRFA. Biometrics must follow for the Emirates ID process. Salaries in Dubai/Abu Dhabi range average 4,500 to 18,000 AED monthly to match in-demand skills.";
          } else if (lower.includes("qatar")) {
            responseText = "For Qatar: Work entries require QVC (Qatar Visa Center) medical clearance and iris/fingerprint biometrics. Popular careers average 3,500 to 15,000 QAR.";
          } else if (lower.includes("medical") || lower.includes("gamca") || lower.includes("wafid")) {
            responseText = "GCC medical screening must be registered through the official Wafid (formerly GAMCA) portal. An online registration slip is generated, designating an accredited clinic in your city.";
          } else if (lower.includes("biometric") || lower.includes("fingerprint")) {
            responseText = "Biometrics are mandatory. Complete them through designated centers (Etimad for Saudi, ICP fingerprint centers for UAE, QVC for Qatar).";
          }
          
          res.json({ text: responseText });
        }, 800);
        return;
      }

      // Convert history to format compatible with generateContent
      // history standard expectation: { role: "user" | "model", text: string }
      const formattedContents: any[] = [];
      if (Array.isArray(history)) {
        history.slice(-8).forEach((item: any) => {
          formattedContents.push({
            role: item.role === "assistant" ? "model" : "user",
            parts: [{ text: item.text }]
          });
        });
      }
      
      // Append the latest user message
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: `You are 'ZeeBot', the official interactive smart AI Chatbot assistant for ZeeVisa Global—the premium Gulf Visa & Migration Guidance Platform.
Your purpose is to assist users with migration advisory, Gulf visa steps, GCC medical tests (Wafid / GAMCA), biometrics (Etimad / VFS / QVC), and career insights for Gulf countries (Saudi Arabia, UAE, Qatar, Oman, Kuwait, Bahrain, etc.).

Tone instructions:
- Be extremely polite, professional, friendly, and helpful.
- Provide crisp, clear, structured responses. Use bullet points or numbered lists where appropriate for legibility.
- Give highly accurate details using Gulf terminology (e.g. GAMCA, Wafid, Etimad, Emirates ID, QVC, GDRFA).
- Keep formatting elegant using markdown elements. Do not exceed 3 paragraphs if possible, so responses remain snackable on desktop and mobile chat bubbles.
- If unsure or if a complex legal challenge is raised, politely encourage booking a free visual consult slots (Consultation Modal or WhatsApp Support) available on ZeeVisa.`,
        }
      });

      res.json({ text: response.text || "I was unable to process that. Please try asking again." });
    } catch (err: any) {
      console.error("Gemini API Error in /api/chat:", err);
      res.status(500).json({ error: "Failed to communicate with AI Assistant. Please check server logs or retry." });
    }
  });

  // Vite middleware or static client assets serving based on mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // PORT must be 3000 according to instructions
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ZeeVisa Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
