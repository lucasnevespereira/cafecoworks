"use server";

import type { Cafe } from "@/src/types/cafe";
import { readFileSync } from "fs";
import { join } from "path";

export async function getCafesData(): Promise<Cafe[]> {
  try {
    // Read the cafes.json file directly from the public folder
    const filePath = join(process.cwd(), "public", "cafes.json");
    const fileContent = readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading cafes data:", error);
    throw new Error("Failed to read cafes data");
  }
}