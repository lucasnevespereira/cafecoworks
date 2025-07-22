import fs from 'fs';
import path from 'path';

// Required fields for cafe data
const REQUIRED_FIELDS = ['name', 'slug', 'description', 'city', 'country', 'location', 'image', 'tags'];
const OPTIONAL_FIELDS = ['website', 'googleMapsUrl', 'lat', 'lng', 'station', 'featured'];

// Validation rules
const VALIDATION_RULES = {
  name: (value) => typeof value === 'string' && value.length > 0 && value.length <= 100,
  slug: (value) => typeof value === 'string' && /^[a-z0-9-]+$/.test(value),
  description: (value) => typeof value === 'string' && value.length >= 50 && value.length <= 500,
  city: (value) => typeof value === 'string' && value.length > 0,
  country: (value) => typeof value === 'string' && value.length > 0,
  location: (value) => typeof value === 'string' && value.length > 0,
  website: (value) => !value || (typeof value === 'string' && value.startsWith('http')),
  googleMapsUrl: (value) => !value || (typeof value === 'string' && value.startsWith('http')),
  image: (value) => typeof value === 'string' && value.startsWith('/images/'),
  tags: (value) => Array.isArray(value) && value.length > 0 && value.every(tag => typeof tag === 'string'),
  lat: (value) => !value || (typeof value === 'number' && value >= -90 && value <= 90),
  lng: (value) => !value || (typeof value === 'number' && value >= -180 && value <= 180),
  featured: (value) => !value || typeof value === 'boolean'
};

function validateCafe(cafe, filePath) {
  const errors = [];
  const warnings = [];

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!(field in cafe)) {
      errors.push(`Missing required field: ${field}`);
    } else if (VALIDATION_RULES[field] && !VALIDATION_RULES[field](cafe[field])) {
      errors.push(`Invalid ${field}: ${JSON.stringify(cafe[field])}`);
    }
  }

  // Check optional fields
  for (const field of OPTIONAL_FIELDS) {
    if (field in cafe && VALIDATION_RULES[field] && !VALIDATION_RULES[field](cafe[field])) {
      errors.push(`Invalid ${field}: ${JSON.stringify(cafe[field])}`);
    }
  }

  // Check for unknown fields
  const allFields = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS];
  for (const field in cafe) {
    if (!allFields.includes(field)) {
      warnings.push(`Unknown field: ${field}`);
    }
  }

  // Check image file exists
  if (cafe.image && !fs.existsSync(path.join(__dirname, '..', 'public', cafe.image))) {
    warnings.push(`Image file not found: ${cafe.image}`);
  }

  // Check slug format matches filename
  const fileName = path.basename(filePath, '.json');
  if (cafe.slug !== fileName) {
    errors.push(`Slug '${cafe.slug}' doesn't match filename '${fileName}'`);
  }

  return { errors, warnings };
}

function validateAllCafes() {
  const cafesDir = path.join(__dirname, '../src/data/cafes');
  const jsonFiles = getJsonFiles(cafesDir);

  console.log('🔍 Validating café data files...\n');

  let totalErrors = 0;
  let totalWarnings = 0;
  let validFiles = 0;

  for (const filePath of jsonFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const cafe = JSON.parse(content);

      const { errors, warnings } = validateCafe(cafe, filePath);

      const relativePath = path.relative(process.cwd(), filePath);

      if (errors.length === 0 && warnings.length === 0) {
        console.log(`✅ ${relativePath} - Valid`);
        validFiles++;
      } else {
        console.log(`\n📄 ${relativePath}:`);

        if (errors.length > 0) {
          console.log('  ❌ Errors:');
          errors.forEach(error => console.log(`    - ${error}`));
          totalErrors += errors.length;
        }

        if (warnings.length > 0) {
          console.log('  ⚠️  Warnings:');
          warnings.forEach(warning => console.log(`    - ${warning}`));
          totalWarnings += warnings.length;
        }
      }
    } catch (error) {
      console.log(`\n❌ ${path.relative(process.cwd(), filePath)}: ${error.message}`);
      totalErrors++;
    }
  }

  console.log(`\n📊 Validation Summary:`);
  console.log(`  ✅ Valid files: ${validFiles}`);
  console.log(`  ❌ Total errors: ${totalErrors}`);
  console.log(`  ⚠️  Total warnings: ${totalWarnings}`);

  return { totalErrors, totalWarnings, validFiles };
}

// Helper function to get all JSON files
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

// Run validation if this script is executed directly
if (require.main === module) {
  try {
    const { totalErrors } = validateAllCafes();
    process.exit(totalErrors > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

module.exports = { validateAllCafes, validateCafe };