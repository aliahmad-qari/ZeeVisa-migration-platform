# Gemini API Key Error - Troubleshooting Guide

## Why is the error happening?

**Local Development:** ✅ Works
- `.env.local` file has `GEMINI_API_KEY`
- `dotenv` loads it automatically

**Vercel Deployment:** ❌ Error
- `.env.local` is NOT deployed (it's in .gitignore)
- Vercel doesn't have the `GEMINI_API_KEY` environment variable
- `process.env.GEMINI_API_KEY` is `undefined`
- Chatbot fails or shows fallback mode only

## How to Fix

### Quick Fix (5 minutes)

1. Open your Vercel project dashboard
2. Go to **Settings → Environment Variables**
3. Add a new variable:
   ```
   Name:  GEMINI_API_KEY
   Value: [Your actual API key from https://ai.google.dev/]
   ```
4. Click **Save**
5. Go to **Deployments** and click **Redeploy**

### Verify it's Working

After redeployment, test:
1. Visit your app URL
2. Try the chatbot
3. Check browser console for errors
4. Visit `/api/health` endpoint - should show `"mode": "genai"` not `"fallback"`

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Still shows fallback mode | API key not set on Vercel | Add to Environment Variables |
| "Invalid API Key" error | Wrong/expired key | Get new key from ai.google.dev |
| Deployment still fails | Old deployment cached | Click "Redeploy" after adding env var |
| Can't find Vercel settings | Wrong project selected | Make sure you're in correct Vercel project |

## Environment Variables Reference

### Local Development
```bash
# Create this file (already created):
.env.local
GEMINI_API_KEY=your_key_here
```

### Vercel Production
```
Set in: Project Settings → Environment Variables
GEMINI_API_KEY = your_key_here
```

### Code Reading the Variable
```typescript
// server.ts line 10
const apiKey = process.env.GEMINI_API_KEY;
```

## Important Notes

⚠️ **NEVER:**
- Commit `.env.local` to GitHub (it's in .gitignore)
- Paste API key in code or comments
- Share your API key publicly

✅ **DO:**
- Set environment variables in Vercel dashboard
- Keep `.env.local` only for local development
- Rotate API key if accidentally exposed

## Need Help?

If error persists after following these steps:
1. Redeploy manually from Vercel dashboard
2. Check build logs for error messages
3. Verify API key is correct on ai.google.dev
4. Try generating a new API key
