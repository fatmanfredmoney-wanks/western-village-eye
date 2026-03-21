#!/bin/bash
#
# Create Edition Script
# Usage: ./scripts/create-edition.sh <volume> <edition>
# Example: ./scripts/create-edition.sh 1 2
#
# This script:
# 1. Converts RTF files from source folder to Markdown
# 2. Generates an EPUB with western styling
# 3. Saves to public/editions folder
#

set -e

VOLUME=$1
EDITION=$2

if [ -z "$VOLUME" ] || [ -z "$EDITION" ]; then
    echo "❌ Usage: $0 <volume_number> <edition_number>"
    echo "Example: $0 1 2"
    exit 1
fi

# Paths
SOURCE_DIR="$HOME/Documents/openCode/Western.Village.Eye/Western Village Eye makes/Volume${VOLUME}text/Edition${EDITION}"
EDITION_DIR="$(pwd)/editions/volume-${VOLUME}-edition-${EDITION}"
PUBLIC_DIR="$(pwd)/public/editions"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Source directory not found: $SOURCE_DIR"
    exit 1
fi

# Create directories
echo "📁 Creating directories..."
mkdir -p "$EDITION_DIR"
mkdir -p "$PUBLIC_DIR"

# Copy cover image (if exists)
COVER_SOURCE="$HOME/Documents/openCode/Western.Village.Eye/Western Village Eye makes/Volume${VOLUME}image/Edition ${EDITION}/cover/cover1antique.png"
if [ -f "$COVER_SOURCE" ]; then
    echo "📋 Copying cover image..."
    cp "$COVER_SOURCE" "$EDITION_DIR/cover.png"
else
    echo "⚠️  Cover image not found, using placeholder..."
    # Could add a default cover here
fi

# Convert RTF files to Markdown
echo "📝 Converting RTF files to Markdown..."
cd "$EDITION_DIR"

# Create title page
cat > 00-title.md << 'EOF'
<div class="title-page">

# THE WESTERN VILLAGE EYE

<p class="tagline">"ALMOST UNCIVILIZED"</p>

<div class="volume-info">
<p>Volume VOLUME_NUM, Edition EDITION_NUM</p>
<p>March 2026</p>
</div>

<p class="author">by Decent Stick</p>

</div>

***
EOF

# Replace placeholders
sed -i '' "s/VOLUME_NUM/$VOLUME/g" 00-title.md
sed -i '' "s/EDITION_NUM/$EDITION/g" 00-title.md

# Process each RTF file
counter=1
for rtf_file in "$SOURCE_DIR"/*.rtf; do
    if [ -f "$rtf_file" ]; then
        filename=$(basename "$rtf_file" .rtf)
        # Create slug from filename
        slug=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/^-//;s/-$//')
        
        echo "   Converting: $filename"
        
        # Convert RTF to text
        textutil -convert txt -stdout "$rtf_file" > "temp_${counter}.txt"
        
        # TODO: Add manual formatting here or create a more sophisticated converter
        # For now, just wrap in markdown heading
        echo "# $filename" > "${counter}-${slug}.md"
        echo "" >> "${counter}-${slug}.md"
        cat "temp_${counter}.txt" >> "${counter}-${slug}.md"
        
        rm "temp_${counter}.txt"
        
        counter=$((counter + 1))
    fi
done

# Copy CSS and metadata
echo "🎨 Adding styling..."
cp "$(pwd)/editions/volume-1-edition-1/western-theme.css" "$EDITION_DIR/" 2>/dev/null || {
    echo "   Creating default CSS..."
    cat > western-theme.css << 'EOF'
body {
  background-color: #f5e6c8;
  color: #3e2723;
  font-family: Georgia, serif;
  line-height: 1.6;
}
h1, h2, h3 {
  font-family: "American Typewriter", "Courier New", monospace;
  color: #5d4037;
}
EOF
}

cat > metadata.yaml << EOF
---
title: "The Western Village Eye"
subtitle: "Almost Uncivilized"
author: "Decent Stick"
publisher: "Western Village Eye"
date: "$(date +%Y-%m-%d)"
language: en-US
rights: "© $(date +%Y) Western Village Eye"
cover-image: cover.png
toc: true
toc-depth: 1
css: western-theme.css
---
EOF

# Generate EPUB
echo "📚 Generating EPUB..."
md_files=$(ls -1 *.md | sort)
pandoc $md_files \
    --metadata-file=metadata.yaml \
    --css=western-theme.css \
    --toc \
    --toc-depth=1 \
    --epub-cover-image=cover.png \
    -o "$PUBLIC_DIR/volume-${VOLUME}-edition-${EDITION}.epub"

echo ""
echo "✅ EPUB created successfully!"
echo "📍 Location: $PUBLIC_DIR/volume-${VOLUME}-edition-${EDITION}.epub"
echo ""
echo "Next steps:"
echo "1. Review and edit markdown files in: $EDITION_DIR"
echo "2. Run Sanity migration script to import articles"
echo "3. Upload cover image in Sanity Studio"
