import fs from 'fs';
import path from 'path';
import { Cafe, CafeSchema } from '@/src/types/cafe';
import { getJsonFiles } from '@/src/lib/json';

const cafesDir = path.join(__dirname, '../data/cafes');
const publicDir = path.join(__dirname, '../public');

// Build the aggregated cafes data
function buildCafesData(): number {
  const outputFile = path.join(publicDir, 'cafes.json');

  console.log('🔍 Scanning for café data files...');
  const jsonFiles = getJsonFiles(cafesDir);
  console.log(`📁 Found ${jsonFiles.length} café files`);

  const cafes: Cafe[] = [];
  let errorCount = 0;

  for (const filePath of jsonFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const cafeRaw = JSON.parse(content);
      // Add id if missing
      if (!cafeRaw.id) cafeRaw.id = cafeRaw.slug;
      // Add address if missing
      if (!cafeRaw.address && cafeRaw.location) cafeRaw.address = cafeRaw.location;
      // Validate with Zod
      const parsed = CafeSchema.safeParse(cafeRaw);
      if (!parsed.success) {
        console.error(`❌ Validation error in ${filePath}: ${parsed.error.message}`);
        console.error(parsed.error.issues);
        errorCount++;
        continue;
      }
      cafes.push(parsed.data);
      console.log(`✅ Loaded: ${parsed.data.name} (${parsed.data.city})`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`❌ Error loading ${filePath}:`, error.message);
      } else {
        console.error(`❌ Error loading ${filePath}:`, String(error));
      }
      errorCount++;
    }
  }

  // Sort cafes by city, then by name
  cafes.sort((a, b) => {
    if (a.city !== b.city) return a.city.localeCompare(b.city);
    return a.name.localeCompare(b.name);
  });

  // Write output
  const outputData = JSON.stringify(cafes, null, 2);
  fs.writeFileSync(outputFile, outputData, 'utf8');
  console.log(`🎉 Successfully built cafes.json with ${cafes.length} cafés`);
  console.log(`📄 Output: ${outputFile}`);

  if (errorCount > 0) {
    console.error(`❌ Encountered ${errorCount} error(s) during build.`);
  }
  return cafes.length;
}

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

export { buildCafesData };