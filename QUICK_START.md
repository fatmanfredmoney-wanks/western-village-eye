# Quick Start Checklist

## ✅ Completed (Done Automatically)

- [x] Pandoc installed
- [x] EPUB created: `public/editions/volume-1-edition-1.epub`
- [x] Western theme CSS created
- [x] 9 Markdown chapters converted from RTF
- [x] Download button added to edition page
- [x] Download button added to flipbook
- [x] Sanity migration script created
- [x] Automation script for future editions
- [x] Build successful

---

## 📋 Your Turn (Manual Steps)

### 1. Get Sanity API Token (5 minutes)

```
1. Go to: https://www.sanity.io/manage/personal/project/osrppxu6
2. Click: Settings → API → Tokens
3. Click: "Create new token"
4. Name: "Edition Import"
5. Permissions: Editor
6. Click: "Create token"
7. COPY the token (starts with "sk...")
```

### 2. Import to Sanity (2 minutes)

Open Terminal and run:

```bash
cd /Users/phyrexiandreadnought/Documents/openCode/Western.Village.Eye/western-village-eye
export SANITY_API_TOKEN="PASTE_YOUR_TOKEN_HERE"
npx tsx scripts/import-edition1.ts
```

Expected output:
```
🚀 Starting Sanity migration...
📚 Creating Volume 1...
   ✓ Volume 1 created
📰 Creating articles...
   ✓ Created: Skeleton
   ✓ Created: Intro
   ... (9 articles total)
📖 Creating Edition 1...
   ✓ Edition 1 created
✅ Migration complete!
```

### 3. Upload Cover Image in Sanity (2 minutes)

```
1. Go to: https://www.sanity.io/manage/personal/project/osrppxu6
2. Click: "Edition 1"
3. Click: "Cover Image" field
4. Upload: editions/volume-1-edition-1/cover.png
5. Click: "Publish"
```

### 4. Deploy to Vercel (5 minutes)

**Option A: GitHub + Vercel (Recommended)**

```
1. Push code to GitHub:
   cd western-village-eye
   git add .
   git commit -m "Add EPUB download feature"
   git push origin main

2. Go to: https://vercel.com/new

3. Click: "Import Git Repository"

4. Select: western-village-eye repo

5. Click: "Deploy"
```

**Option B: Vercel CLI**

```bash
cd western-village-eye
vercel login
vercel --prod
```

---

## ✅ Testing

After deployment, test:

1. **Visit your site**: https://your-site.vercel.app
2. **Click Edition 1**
3. **Click "Download EPUB"** button
4. **Open EPUB** in:
   - Mac: Apple Books
   - Windows: Calibre
   - iPad: Apple Books
   - Kindle: Send to Kindle app

5. **Check features**:
   - [ ] Cover image shows
   - [ ] "Almost Uncivilized" tagline visible
   - [ ] Table of contents is clickable
   - [ ] All 9 chapters present
   - [ ] Western styling (aged paper background)
   - [ ] Links work (YouTube videos in Crypto 101)

---

## 🎉 Done!

You now have:
- ✅ Downloadable EPUB with western styling
- ✅ Interactive flipbook viewer
- ✅ Content in Sanity CMS
- ✅ Automated system for future editions

---

## Future Editions

To create Volume 1, Edition 2:

```bash
# 1. Put RTF files in:
# ~/Documents/openCode/Western.Village.Eye/Western Village Eye makes/Volume1text/Edition2/

# 2. Run automation script:
cd western-village-eye
./scripts/create-edition.sh 1 2

# 3. Create Sanity migration (copy import-edition1.ts and edit)

# 4. Deploy to Vercel
```

---

**Questions?** Check `DEPLOYMENT.md` or `scripts/README.md`
