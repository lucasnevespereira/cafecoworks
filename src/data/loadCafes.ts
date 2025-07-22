import { Cafe } from "./types";

// Server-side only function to load all cafes
export async function getAllCafes(): Promise<Cafe[]> {
  // Use dynamic import to avoid client-side issues
  const fs = await import("fs/promises");
  const path = await import("path");

  const DATA_DIR = path.join(process.cwd(), "src/data");
  const IMAGES_DIR = path.join(process.cwd(), "public/images");
  const cafes: Cafe[] = [];

  // Get all city directories
  const cityDirs = await fs.readdir(DATA_DIR);

  for (const cityDir of cityDirs) {
    // Skip non-directory files and the cafes directory (old structure)
    if (cityDir === "cafes" || cityDir === "types.ts" || cityDir === "loadCafes.ts" || cityDir === "_template.json") continue;

    const cityPath = path.join(DATA_DIR, cityDir);
    const cityStat = await fs.stat(cityPath);

    if (!cityStat.isDirectory()) continue;

    // Read all JSON files in this city directory
    const files = await fs.readdir(cityPath);

    for (const file of files) {
      if (!file.endsWith(".json")) continue;

      const filePath = path.join(cityPath, file);
      const raw = await fs.readFile(filePath, "utf8");
      const cafe = JSON.parse(raw) as Cafe;

      // Auto-generate slug from filename (remove .json extension)
      const slug = file.replace('.json', '');
      cafe.slug = slug;

      // Auto-discover images
      const imageDir = path.join(IMAGES_DIR, cityDir, slug);
      try {
        const imageFiles = await fs.readdir(imageDir);
        const imageFile = imageFiles.find(f =>
          f.match(/\.(jpg|jpeg|png|webp)$/i)
        );

        if (imageFile) {
          cafe.image = `/images/${cityDir}/${slug}/${imageFile}`;
        } else {
          // Fallback to placeholder
          cafe.image = `/images/placeholder.jpg`;
        }
      } catch {
        // No images directory or no images found, use placeholder
        cafe.image = `/images/placeholder.jpg`;
      }

      cafes.push(cafe);
    }
  }

  return cafes;
}