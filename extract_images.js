const fs = require('fs');
const path = require('path');

function extractBase64Images(htmlFile, outputDir) {
  // Read HTML file
  const htmlContent = fs.readFileSync(htmlFile, 'utf-8');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Pattern to match base64 image data
  const pattern = /data:image\/(png|jpeg|jpg|gif|svg\+xml|webp);base64,([A-Za-z0-9+/=]+)/g;

  let match;
  let imageCounter = 1;
  let updatedHtml = htmlContent;
  const replacements = [];

  // Find all matches
  while ((match = pattern.exec(htmlContent)) !== null) {
    const imageType = match[1];
    const base64Data = match[2];
    const fullMatch = match[0];

    try {
      // Decode base64 data
      const imageBuffer = Buffer.from(base64Data, 'base64');

      // Determine file extension
      let ext = imageType;
      if (imageType === 'svg+xml') {
        ext = 'svg';
      } else if (imageType === 'jpeg') {
        ext = 'jpg';
      }

      // Generate filename
      const filename = `image_${String(imageCounter).padStart(2, '0')}.${ext}`;
      const filepath = path.join(outputDir, filename);

      // Save image file
      fs.writeFileSync(filepath, imageBuffer);
      console.log(`Extracted: ${filename}`);

      // Store replacement info
      replacements.push({
        original: fullMatch,
        replacement: `images/${filename}`
      });

      imageCounter++;
    } catch (error) {
      console.error(`Error decoding image ${imageCounter}:`, error.message);
    }
  }

  // Replace base64 data with file paths in HTML
  replacements.forEach(({ original, replacement }) => {
    updatedHtml = updatedHtml.replace(original, replacement);
  });

  // Write updated HTML
  fs.writeFileSync(htmlFile, updatedHtml, 'utf-8');

  console.log(`\nTotal images extracted: ${replacements.length}`);
  console.log(`Updated ${htmlFile} with image references`);
}

// Run the extraction
extractBase64Images('index.html', 'images');
