#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Required fields for cafe data
const REQUIRED_FIELDS = [
  'name', 'description', 'city', 'country',
  'address', 'tags', 'lat', 'lng', 'featured'
];

// Validation rules
const VALIDATION_RULES = {
  name: (value) => typeof value === 'string' && value.length > 0,
  description: (value) => typeof value === 'string' && value.length > 10,
  city: (value) => typeof value === 'string' && value.length > 0,
  country: (value) => typeof value === 'string' && value.length > 0,
  address: (value) => typeof value === 'string' && value.length > 0,
  tags: (value) => Array.isArray(value) && value.length > 0 && value.every(tag => typeof tag === 'string'),
  lat: (value) => typeof value === 'number' && value >= -90 && value <= 90,
  lng: (value) => typeof value === 'number' && value >= -180 && value <= 180,
  featured: (value) => typeof value === 'boolean',
  contributor: (value) => value === undefined || typeof value === 'string',
};

async function validateCafeFile(filePath, cafe) {
  const errors = [];
  const warnings = [];

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!(field in cafe)) {
      errors.push(`Missing required field: ${field}`);
      continue;
    }

    const value = cafe[field];
    const validator = VALIDATION_RULES[field];

    if (validator && !validator(value)) {
      errors.push(`Invalid ${field}: ${JSON.stringify(value)}`);
    }
  }

  // Optional contributor field
  if ('contributor' in cafe && !VALIDATION_RULES.contributor(cafe.contributor)) {
    errors.push(`Invalid contributor: ${JSON.stringify(cafe.contributor)}`);
  }

  // Additional validations
  if (cafe.tags && cafe.tags.length > 10) {
    warnings.push(`Too many tags (${cafe.tags.length}), consider reducing to 10 or fewer`);
  }

  if (cafe.description && cafe.description.length > 500) {
    warnings.push(`Description is very long (${cafe.description.length} chars), consider shortening`);
  }

  return { errors, warnings };
}

async function validateAllCafes() {
  const dataDir = path.join(process.cwd(), 'src/data');
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalFiles = 0;

  console.log('🔍 Validating cafe data...\n');

  try {
    const cityDirs = await fs.readdir(dataDir);

    for (const cityDir of cityDirs) {
      if (cityDir === 'types.ts' || cityDir === 'loadCafes.ts' || cityDir === '_template.json') continue;

      const cityPath = path.join(dataDir, cityDir);
      const cityStat = await fs.stat(cityPath);

      if (!cityStat.isDirectory()) continue;

      console.log(`📍 Checking ${cityDir}...`);

      const files = await fs.readdir(cityPath);

      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        totalFiles++;
        const filePath = path.join(cityPath, file);

        try {
          const raw = await fs.readFile(filePath, 'utf8');
          const cafe = JSON.parse(raw);

          const { errors, warnings } = await validateCafeFile(filePath, cafe);

          if (errors.length > 0 || warnings.length > 0) {
            console.log(`  ❌ ${file}:`);
            errors.forEach(error => {
              console.log(`    Error: ${error}`);
              totalErrors++;
            });
            warnings.forEach(warning => {
              console.log(`    Warning: ${warning}`);
              totalWarnings++;
            });
          } else {
            console.log(`  ✅ ${file}`);
          }
        } catch (error) {
          console.log(`  ❌ ${file}: JSON parse error - ${error.message}`);
          totalErrors++;
        }
      }
    }
  } catch (error) {
    console.error('Error reading data directory:', error);
    process.exit(1);
  }

  console.log(`\n📊 Validation Summary:`);
  console.log(`  Files checked: ${totalFiles}`);
  console.log(`  Errors: ${totalErrors}`);
  console.log(`  Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log('\n❌ Validation failed! Please fix the errors above.');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('\n⚠️  Validation passed with warnings. Consider addressing the warnings above.');
  } else {
    console.log('\n✅ All cafe data is valid!');
  }
}

// Run validation
validateAllCafes().catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});