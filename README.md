# The Western Village Eye

Almost Uncivilized — Independent journalism for Edwards, Colorado and Eagle County.

## Quick Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import this project from GitHub (you'll need to connect your GitHub account)
4. In the Configure Project screen:
   - Framework Preset: Next.js
   - Build Command: `next build` (or leave as default)
   - Output Directory: `.next` (or leave as default)
5. Click "Deploy"

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding Content

This project uses Sanity.io as a headless CMS. To add content:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (osrppxu6)
3. Use the Sanity Studio to create:
   - Volumes (e.g., Volume 1, 2026)
   - Articles (title, author, content)
   - Editions (links Volume + Articles)

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx         # Homepage
│   │   ├── about/           # About page
│   │   ├── edition/[slug]/  # Flipbook viewer
│   │   └── search/          # Search results
│   ├── components/
│   │   ├── Header.tsx       # Navigation
│   │   ├── Footer.tsx
│   │   └── Flipbook.tsx     # Page-flip component
│   └── lib/
│       ├── sanity.ts         # Sanity client
│       └── sanity-schema.ts  # Content types
```

## Environment Variables

For production, set these in Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: osrppxu6
- `NEXT_PUBLIC_SANITY_DATASET`: production
- `NEXT_PUBLIC_SANITY_API_VERSION`: 2024-01-01
