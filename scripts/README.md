# Western Village Eye - Scripts

## Setup

### 1. Get Sanity API Token

1. Go to https://www.sanity.io/manage/personal/project/osrppxu6
2. Navigate to **Settings** > **API** > **Tokens**
3. Click **Create new token**
4. Give it a name (e.g., "Edition Import Script")
5. Select **Editor** or **Admin** permissions
6. Click **Create token** and copy it

### 2. Set Environment Variable

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export SANITY_API_TOKEN="your-token-here"
```

Or set it temporarily:

```bash
export SANITY_API_TOKEN="your-token-here"
```

---

## Scripts

### `import-edition1.ts`

Imports Volume 1, Edition 1 content into Sanity CMS.

**Usage:**
```bash
cd western-village-eye
npx tsx scripts/import-edition1.ts
```

**What it does:**
- Creates Volume 1 document (if not exists)
- Creates 9 Article documents with content
- Creates Edition 1 document linking all articles
- Sets author as "Decent Stick"

**After running:**
1. Go to Sanity Studio
2. Upload cover image to Edition 1
3. Verify all articles are correct

---

### `create-edition.sh`

Automated script to create future editions from RTF files.

**Usage:**
```bash
./scripts/create-edition.sh <volume_number> <edition_number>
```

**Example:**
```bash
./scripts/create-edition.sh 1 2
```

**Requirements:**
- RTF files must be in: `~/Documents/openCode/Western.Village.Eye/Western Village Eye makes/Volume{N}text/Edition{N}/`
- Cover image (optional): `~/Documents/openCode/Western.Village.Eye/Western Village Eye makes/Volume{N}image/Edition {N}/cover/cover1antique.png`

**What it does:**
1. Creates edition directory structure
2. Converts RTF files to Markdown
3. Generates EPUB with western styling
4. Saves EPUB to `public/editions/`

**Output:**
- Markdown files: `editions/volume-{N}-edition-{N}/*.md`
- EPUB file: `public/editions/volume-{N}-edition-{N}.epub`

**Next steps after running:**
1. Review and edit generated markdown files
2. Create custom Sanity migration script for the edition
3. Run migration script to import to Sanity
4. Upload cover image in Sanity Studio

---

## File Structure

```
scripts/
├── README.md                 # This file
├── import-edition1.ts        # Sanity migration for Edition 1
└── create-edition.sh         # Automated EPUB creation
```

---

## Troubleshooting

### "Missing SANITY_API_TOKEN"
Set the environment variable as shown above.

### "Pandoc not found"
Install Pandoc: `brew install pandoc`

### "Permission denied" (create-edition.sh)
Make executable: `chmod +x scripts/create-edition.sh`

---

## Future Improvements

- [ ] Auto-detect article order from filenames
- [ ] Better RTF to Markdown conversion (preserve formatting)
- [ ] Auto-upload cover images to Sanity
- [ ] Batch import multiple editions at once
