"use server";

import type { Cafe } from "@/src/types/cafe";

export async function getCafesData(): Promise<Cafe[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/cafes.json`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch cafes data");
  return res.json();
}