# Quick Reference: Using Public Images

## Adding Images to Your Project

### Step 1: Place Images in Public Folder
Copy your images to:
```
project-root/public/images/
```

### Step 2: Reference in Code

#### React Component Example:
```jsx
<img src="/images/logo.jpeg" alt="Logo" />
<img src="/images/gulf_skyline_hero_bg_1779707563384.png" alt="Hero Background" />
```

#### CSS Background Example:
```css
.hero {
  background-image: url('/images/gulf_skyline_hero_bg_1779707563384.png');
}
```

#### Tailwind with Public Images:
```jsx
<div className="w-full" style={{backgroundImage: 'url(/images/gulf_skyline_hero_bg_1779707563384.png)'}}>
  {/* content */}
</div>
```

## Key Differences

| Type | Location | Reference | When to Use |
|------|----------|-----------|------------|
| Public/Static | `public/images/` | `/images/...` | Images you never change, logos, static assets |
| Bundled | `src/assets/images/` | `import` or `@/assets/...` | Images used in components, optimized |

## Benefits of Public Folder

✅ Files are served as-is (no processing)
✅ Cache-friendly
✅ Perfect for large images
✅ Works great with CDN on Vercel
✅ Direct URL access possible
