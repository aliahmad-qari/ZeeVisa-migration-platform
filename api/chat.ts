import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  if (!apiKey) {
    const lower = (message as string).toLowerCase();
    let responseText = "Thank you for contacting ZeeVisa Global. I am currently operating in advisory mode. For detailed visa assistance regarding Saudi Arabia, UAE, Qatar or other Gulf states, you can book a free expert consultation slot via our booking module.";
    if (lower.includes('saudi') || lower.includes('etimad')) {
      responseText = "For Saudi Arabia visas: Standard workflow involves completing Wafid/GAMCA medical tests, biometric appointment booking through the Etimad Saudi Visa center, and submitting certified passport and national identity documents.";
    } else if (lower.includes('uae') || lower.includes('emirates') || lower.includes('dubai')) {
      responseText = "For the United Arab Emirates: Entry visas are issued via the ICP or GDRFA. Biometrics must follow for the Emirates ID process.";
    } else if (lower.includes('qatar')) {
      responseText = "For Qatar: Work entries require QVC medical clearance and iris/fingerprint biometrics.";
    } else if (lower.includes('medical') || lower.includes('gamca') || lower.includes('wafid')) {
      responseText = "GCC medical screening must be registered through the official Wafid portal.";
    }
    return res.json({ text: responseText });
  }

  try {
    const client = new GoogleGenAI({ apiKey, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } });

    const formattedContents: any[] = [];
    if (Array.isArray(history)) {
      history.slice(-8).forEach((item: any) => {
        formattedContents.push({ role: item.role === 'assistant' ? 'model' : 'user', parts: [{ text: item.text }] });
      });
    }
    formattedContents.push({ role: 'user', parts: [{ text: message }] });

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: `You are 'ZeeBot', the official interactive smart AI Chatbot assistant for ZeeVisa Global—the premium Gulf Visa & Migration Guidance Platform. Be polite, professional, and concise. Use Gulf terminology (GAMCA, Wafid, Etimad, Emirates ID, QVC, GDRFA). Keep responses under 3 paragraphs.`,
      }
    });

    res.json({ text: response.text || 'I was unable to process that. Please try again.' });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ error: 'Failed to communicate with AI Assistant.' });
  }
}
