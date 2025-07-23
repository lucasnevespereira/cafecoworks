import fs from 'fs';
import path from 'path';
import { CafeSchema } from '@/src/types/cafe';
import { getJsonFiles } from '@/src/lib/json';

const cafesDir = path.join(__dirname, '../data/cafes');
const publicDir = path.join(__dirname, '../public');

function validateCafe(cafeRaw: Record<string, unknown>, filePath: string) {
  const errors: string[] = [];
  const warnings: string[] = [];
  // Validate with Zod
  const parsed = CafeSchema.safeParse(cafeRaw);
  if (!parsed.success) {
    console.error(`❌ Validation error in ${filePath}: ${parsed.error.message}`);
    console.error(parsed.error.issues);
  }
  // Check image file exists
  const image = typeof cafeRaw.image === 'string' ? cafeRaw.image : undefined;
  if (image) {
    // Remove leading slash for correct path join
    const imagePath = image.startsWith('/') ? image.slice(1) : image;
    const fullImagePath = path.join(publicDir, imagePath);
    if (!fs.existsSync(fullImagePath)) {
      warnings.push(`Image file not found: ${image}`);
    }
  }
  // Check slug matches filename
  const slug = typeof cafeRaw.slug === 'string' ? cafeRaw.slug : undefined;
  const fileName = path.basename(filePath, '.json');
  if (slug && slug !== fileName) {
    errors.push(`Slug '${slug}' doesn't match filename '${fileName}'`);
  }
  // Warn for unknown fields
  const knownFields = Object.keys(CafeSchema.shape);
  for (const field in cafeRaw) {
    if (!knownFields.includes(field)) {
      warnings.push(`Unknown field: ${field}`);
    }
  }
  return { errors, warnings };
}

function validateAllCafes() {
  const jsonFiles = getJsonFiles(cafesDir);
  console.log('🔍 Validating café data files...\n');
  let totalErrors = 0;
  let totalWarnings = 0;
  let validFiles = 0;
  for (const filePath of jsonFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const cafeRaw = JSON.parse(content) as Record<string, unknown>;
      const { errors, warnings } = validateCafe(cafeRaw, filePath);
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`\n❌ ${path.relative(process.cwd(), filePath)}: ${error.message}`);
      } else {
        console.log(`\n❌ ${path.relative(process.cwd(), filePath)}: ${String(error)}`);
      }
      totalErrors++;
    }
  }
  console.log(`\n📊 Validation Summary:`);
  console.log(`  ✅ Valid files: ${validFiles}`);
  console.log(`  ❌ Total errors: ${totalErrors}`);
  console.log(`  ⚠️  Total warnings: ${totalWarnings}`);
  return { totalErrors, totalWarnings, validFiles };
}

if (require.main === module) {
  try {
    const { totalErrors } = validateAllCafes();
    process.exit(totalErrors > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

export { validateAllCafes, validateCafe };