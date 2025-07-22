import fs from 'fs';
import path from 'path';

// Function to recursively get all JSON files from a directory
function getJsonFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getJsonFiles(fullPath));
    } else if (item.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to build the aggregated cafes data
function buildCafesData() {
  const cafesDir = path.join(__dirname, '../src/data/cafes');
  const outputFile = path.join(__dirname, '../public/cafes.json');

  console.log('🔍 Scanning for café data files...');

  // Get all JSON files from the cafes directory
  const jsonFiles = getJsonFiles(cafesDir);

  console.log(`📁 Found ${jsonFiles.length} café files`);

  // Read and parse each JSON file
  const cafes = [];

  for (const filePath of jsonFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const cafe = JSON.parse(content);

      // Add an id if it doesn't exist (using slug as fallback)
      if (!cafe.id) {
        cafe.id = cafe.slug;
      }

      // Ensure address field exists (for backward compatibility)
      if (!cafe.address && cafe.location) {
        cafe.address = cafe.location;
      }

      cafes.push(cafe);
      console.log(`✅ Loaded: ${cafe.name} (${cafe.city})`);
    } catch (error) {
      console.error(`❌ Error loading ${filePath}:`, error.message);
    }
  }

  // Sort cafes by city, then by name
  cafes.sort((a, b) => {
    if (a.city !== b.city) {
      return a.city.localeCompare(b.city);
    }
    return a.name.localeCompare(b.name);
  });

  // Write the aggregated data to public/cafes.json
  const outputData = JSON.stringify(cafes, null, 2);
  fs.writeFileSync(outputFile, outputData, 'utf8');

  console.log(`🎉 Successfully built cafes.json with ${cafes.length} cafés`);
  console.log(`📄 Output: ${outputFile}`);

  // Also write to src/data/cafes.json for development
  const devOutputFile = path.join(__dirname, '../src/data/cafes.json');
  fs.writeFileSync(devOutputFile, outputData, 'utf8');
  console.log(`📄 Dev output: ${devOutputFile}`);

  return cafes.length;
}

// Run the build if this script is executed directly
if (require.main === module) {
  try {
    const count = buildCafesData();
    console.log(`🎉 Successfully built cafes.json with ${count} cafés`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

module.exports = { buildCafesData };