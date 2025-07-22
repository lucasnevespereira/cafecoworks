#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Note: This is a placeholder script. In a real implementation, you would use
// a library like sharp or jimp to actually resize images.
// For now, this script just validates that images exist and have the right structure.

async function validateImages() {
  const imagesDir = path.join(process.cwd(), 'public/images');
  let totalImages = 0;
  let missingImages = 0;

  console.log('🖼️  Validating images...\n');

  try {
    const cityDirs = await fs.readdir(imagesDir);

    for (const cityDir of cityDirs) {
      const cityPath = path.join(imagesDir, cityDir);
      const cityStat = await fs.stat(cityPath);

      if (!cityStat.isDirectory()) continue;

      console.log(`📍 Checking ${cityDir} images...`);

      const files = await fs.readdir(cityPath);

      for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

        totalImages++;
        const filePath = path.join(cityPath, file);

        try {
          const stat = await fs.stat(filePath);
          const sizeInMB = stat.size / (1024 * 1024);

          if (sizeInMB > 5) {
            console.log(`  ⚠️  ${file}: Large file (${sizeInMB.toFixed(1)}MB), consider optimizing`);
          } else {
            console.log(`  ✅ ${file} (${sizeInMB.toFixed(1)}MB)`);
          }
        } catch (error) {
          console.log(`  ❌ ${file}: Error reading file`);
          missingImages++;
        }
      }
    }
  } catch (error) {
    console.error('Error reading images directory:', error);
    process.exit(1);
  }

  console.log(`\n📊 Image Summary:`);
  console.log(`  Total images: ${totalImages}`);
  console.log(`  Missing/broken: ${missingImages}`);

  if (missingImages > 0) {
    console.log('\n⚠️  Some images have issues. Consider running image optimization.');
  } else {
    console.log('\n✅ All images are valid!');
  }
}

// TODO: Implement actual image resizing
async function resizeImages() {
  console.log('🔄 Image resizing not yet implemented.');
  console.log('To implement image resizing, install sharp: npm install sharp');
  console.log('Then update this script to use sharp for image processing.');

  // Example implementation with sharp:
  /*
  const sharp = require('sharp');

  // Resize to multiple sizes
  await sharp(inputPath)
    .resize(800, 600, { fit: 'cover' })
    .jpeg({ quality: 80 })
    .toFile(outputPath);
  */
}

// Run validation
validateImages().catch(error => {
  console.error('Image validation failed:', error);
  process.exit(1);
});