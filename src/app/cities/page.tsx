import Link from "next/link";
import { MapPin } from "lucide-react";
import { getCafesData } from "@/src/lib/cafes";

export const metadata = {
  title: "All Cities | cafecoworks",
  description:
    "Browse coworking cafes in cities around the world. Find your next remote work destination.",
};

export default async function CitiesPage() {
  const cafes = await getCafesData();

  const cityMap = new Map<string, { count: number; country: string }>();
  for (const cafe of cafes) {
    const existing = cityMap.get(cafe.city);
    if (existing) {
      existing.count++;
    } else {
      cityMap.set(cafe.city, { count: 1, country: cafe.country });
    }
  }

  const cities = Array.from(cityMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Breadcrumbs */}
      <div className="px-6 py-3 bg-coffee-cream">
        <div className="max-w-6xl mx-auto text-sm breadcrumbs breadcrumbs-coffee">
          <ul>
            <li>
              <Link href="/" className="text-coffee-700 hover:underline">
                Home
              </Link>
            </li>
            <li className="text-coffee-500">Cities</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-coffee-900 mb-3 text-display">
            All Cities
          </h1>
          <p className="text-coffee-500">
            {cities.length} cities with {cafes.length} coworking cafes worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/cities/${city.name.toLowerCase().replace(" ", "-")}`}
              className="card-coffee p-5 hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-cream-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-coffee-500" />
                </div>
                <div>
                  <h2 className="font-semibold text-coffee-900 group-hover:text-coffee-700 transition-colors">
                    {city.name}
                  </h2>
                  <p className="text-xs text-coffee-500 mt-0.5">
                    {city.country}
                  </p>
                  <p className="text-xs text-coffee-400 mt-1">
                    {city.count} cafe{city.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
