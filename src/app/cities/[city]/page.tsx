import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { getCafesData } from "@/src/lib/cafes";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const cafes = await getCafesData();
  const cities = Array.from(new Set(cafes?.map((cafe) => cafe.city) || []));
  return cities.map((city) => ({
    city: city.toLowerCase().replace(" ", "-"),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const cafes = await getCafesData();
  const { city } = await params;
  const cityName = city
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const cityCafes = cafes.filter(
    (cafe) => cafe.city.toLowerCase().replace(" ", "-") === city
  );

  if (cityCafes.length === 0) {
    return { title: "City Not Found | cafecoworks" };
  }

  return {
    title: `Best Coworking Cafes in ${cityName} | cafecoworks`,
    description: `Discover ${cityCafes.length} amazing coworking cafes in ${cityName}. Find the perfect workspace for remote work.`,
    openGraph: {
      title: `Best Coworking Cafes in ${cityName}`,
      description: `Discover ${cityCafes.length} amazing coworking cafes in ${cityName}.`,
      type: "website",
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const cafes = await getCafesData();
  const { city } = await params;
  const cityName = city
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const cityCafes = cafes.filter(
    (cafe) => cafe.city.toLowerCase().replace(" ", "-") === city
  );

  if (cityCafes.length === 0) {
    notFound();
  }

  const cityTags = Array.from(new Set(cityCafes.flatMap((cafe) => cafe.tags)));
  const otherCities = Array.from(new Set(cafes.map((cafe) => cafe.city)))
    .filter((c) => c.toLowerCase().replace(" ", "-") !== city)
    .slice(0, 6);

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
            <li>
              <Link href="/cities" className="text-coffee-700 hover:underline">
                Cities
              </Link>
            </li>
            <li className="text-coffee-500">{cityName}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-coffee-900 mb-3 text-display">
            Coworking Cafes in {cityName}
          </h1>
          <p className="text-coffee-500 mb-6">
            {cityCafes.length} workspace{cityCafes.length !== 1 ? "s" : ""}{" "}
            perfect for remote work
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {cityTags.slice(0, 8).map((tag) => (
              <span key={tag} className="badge-golden badge-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Cafe Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cityCafes
            .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
            .map((cafe) => (
              <Link
                key={cafe.id}
                href={`/places/${cafe.slug}`}
                className="card-coffee overflow-hidden hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="aspect-[16/10] coffee-gradient flex items-center justify-center relative overflow-hidden">
                  {cafe.image ? (
                    <Image
                      src={cafe.image}
                      alt={cafe.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="text-5xl opacity-20">☕</div>
                  )}
                  {cafe.featured && (
                    <div className="absolute top-3 left-3 badge-golden badge-sm">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-coffee-900 mb-2 group-hover:text-coffee-700 transition-colors line-clamp-1">
                    {cafe.name}
                  </h3>
                  <p className="text-coffee-500 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {cafe.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-xs text-coffee-500 flex items-center gap-1.5">
                      <MapPin size={12} />
                      <span className="truncate">{cafe.address}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {cafe.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="badge-coffee badge-xs">
                          {tag}
                        </span>
                      ))}
                      {cafe.tags.length > 3 && (
                        <span className="badge badge-ghost badge-xs text-coffee-400">
                          +{cafe.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* Other Cities */}
        {otherCities.length > 0 && (
          <div className="section-coffee-light rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-coffee-900 mb-6 text-display">
              Explore Other Cities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {otherCities.map((c) => (
                <Link
                  key={c}
                  href={`/cities/${c.toLowerCase().replace(" ", "-")}`}
                  className="card-coffee p-3 text-center hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="text-sm font-medium text-coffee-700">
                    {c}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
