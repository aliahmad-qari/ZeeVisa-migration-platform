# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub/GitLab/Bitbucket repository
- Gemini API Key

## Setup Steps

### 1. Prepare for Deployment

The project structure has been set up with:
- `public/images/` - Place your images here (they'll be served as static assets)
- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files to exclude from deployment

### 2. Deploy to Vercel

**Option A: Via Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Option B: Via GitHub Integration**
1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Select "Import Git Repository"
4. Choose your repository
5. Click "Deploy"

### 3. Configure Environment Variables

After deployment, set your environment variables in Vercel dashboard:

1. Go to your project settings on Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add: `GEMINI_API_KEY=your_api_key_here`
4. Redeploy

### 4. Using Public Images

Place images in `public/images/` and reference them in code:

```jsx
// Instead of: /src/assets/images/...
// Use: /images/...

<img src="/images/logo.jpeg" alt="Logo" />
```

## Project Structure

```
project-root/
├── public/                    # Static files served as-is
│   └── images/               # Your images go here
├── src/
│   ├── assets/               # Keep for bundled assets if needed
│   └── ...
├── dist/                      # Build output
├── vercel.json               # Vercel configuration
└── package.json
```

## Notes

- Build Command: `npm run build`
- Output Directory: `dist`
- Node Runtime: 20.x
- Function Timeout: 60 seconds

## Troubleshooting

**Images not loading:** Make sure they're in `public/images/` folder and referenced with `/images/filename`

**API Key not working:** Verify it's set in Vercel environment variables, then redeploy

**Build fails:** Run `npm run build` locally to debug
