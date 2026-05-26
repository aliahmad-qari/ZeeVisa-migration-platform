# Render Deployment Guide

## ✅ Prerequisites
- Render account (https://render.com)
- GitHub repository pushed
- Gemini API Key

## 🚀 Step-by-Step Deployment

### Step 1: Create New Service on Render

1. Go to https://render.com
2. Click **New +** → **Web Service**
3. Click **Connect a Repository** (select your GitHub repo)
4. Click **Connect** next to `aliahmad-qari/ZeeVisa-migration-platform`

### Step 2: Configure Service Settings

Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `zeevisa-guidance` |
| **Environment** | `Node` |
| **Region** | Choose closest to users |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

### Step 3: Set Environment Variables

1. In the service configuration, scroll to **Environment**
2. Add new variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `[your-api-key-from-ai.google.dev]`

3. Add another variable:
   - **Key:** `NODE_ENV`
   - **Value:** `production`

4. Click **Create Web Service**

### Step 4: Wait for Deployment

- Render will build and deploy automatically
- Check the deployment logs
- Once complete, you'll get a live URL like: `https://zeevisa-guidance.onrender.com`

---

## 🔧 Troubleshooting

### Issue: "Failed to load module script"
**Solution:** Make sure `NODE_ENV=production` is set in Render environment variables

### Issue: "GEMINI_API_KEY not found"
**Solution:** Check that `GEMINI_API_KEY` is set in Render environment variables, then redeploy

### Issue: Nothing showing on website
**Solution:** 
1. Check Render build logs
2. Open browser DevTools → Console
3. Share error messages

### Check Deployment Status
- Go to https://render.com
- Click your service
- Go to **Logs** tab
- Look for error messages

---

## 📝 Important Notes

- Build takes 3-5 minutes first time
- Subsequent deployments are faster
- Free tier has 750 hours/month (enough for testing)
- Node version: 20.x (auto-selected)

## ✨ Features Working on Render

✅ React frontend (served from dist/)
✅ Express server API endpoints
✅ Gemini AI Chatbot (with API key)
✅ Static images from /public folder
✅ Full SPA routing

---

## 🎯 Common Issues & Fixes

**If redeploy is needed:**
1. Make a small change to your code
2. Commit and push to GitHub
3. Render auto-redeploys

**To manually redeploy:**
1. Go to Render dashboard
2. Click your service
3. Click **Manual Deploy** → **Deploy latest commit**
