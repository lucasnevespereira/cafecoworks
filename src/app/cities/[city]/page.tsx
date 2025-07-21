import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import cafes from "../../../data/cafes.json";
import AdBanner from "../../components/AdBanner";

interface PageProps {
  params: { city: string };
}

// Generate static params for all cities
export async function generateStaticParams() {
  const cities = Array.from(new Set(cafes.map((cafe) => cafe.city)));
  return cities.map((city) => ({
    city: city.toLowerCase().replace(" ", "-"),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const cityName = params.city
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const cityCafes = cafes.filter(
    (cafe) => cafe.city.toLowerCase().replace(" ", "-") === params.city
  );

  if (cityCafes.length === 0) {
    return {
      title: "City Not Found | cafeco.works",
    };
  }

  return {
    title: `Best Coworking Cafes in ${cityName} | cafeco.works`,
    description: `Discover ${cityCafes.length} amazing coworking cafes in ${cityName}. Find the perfect workspace for remote work and digital nomads.`,
    openGraph: {
      title: `Best Coworking Cafes in ${cityName}`,
      description: `Discover ${cityCafes.length} amazing coworking cafes in ${cityName}.`,
      type: "website",
    },
  };
}

export default function CityPage({ params }: PageProps) {
  const cityName = params.city
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const cityCafes = cafes.filter(
    (cafe) => cafe.city.toLowerCase().replace(" ", "-") === params.city
  );

  if (cityCafes.length === 0) {
    notFound();
  }

  // Get unique tags for this city
  const cityTags = Array.from(new Set(cityCafes.flatMap((cafe) => cafe.tags)));

  return (
    <div className="min-h-screen bg-base-100">
      {/* Minimal Navigation */}
      <nav className="navbar bg-base-100 border-b border-base-200 px-6 py-4">
        <div className="flex-1">
          <Link
            href="/"
            className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="cafeco.works"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold">cafeco.works</span>
          </Link>
        </div>
        <div className="flex-none">
          <Link
            href="/submit"
            className="btn btn-primary btn-sm font-medium px-6"
          >
            Submit Cafe
          </Link>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="px-6 py-4">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
            </li>
            <li className="text-base-content/60">{cityName}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Clean Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Coworking Cafes in {cityName}
          </h1>
          <p className="text-xl text-base-content/70 mb-8 leading-relaxed">
            Discover {cityCafes.length} amazing workspace
            {cityCafes.length !== 1 ? "s" : ""} perfect for remote work
          </p>

          {/* Clean Stats */}
          <div className="flex justify-center gap-12 text-center mb-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {cityCafes.length}
              </div>
              <div className="text-sm text-base-content/60 uppercase tracking-wider">
                Cafes
              </div>
            </div>
            <div className="w-px bg-base-300"></div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {cityTags.length}
              </div>
              <div className="text-sm text-base-content/60 uppercase tracking-wider">
                Features
              </div>
            </div>
            <div className="w-px bg-base-300"></div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">
                {cityCafes.filter((cafe) => cafe.featured).length}
              </div>
              <div className="text-sm text-base-content/60 uppercase tracking-wider">
                Featured
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Popular Features
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {cityTags.slice(0, 12).map((tag) => (
              <span
                key={tag}
                className="badge badge-secondary badge-lg font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Cafes Grid */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityCafes
              .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
              .map((cafe) => (
                <Link
                  key={cafe.id}
                  href={`/places/${cafe.slug}`}
                  className="group bg-base-100 rounded-3xl overflow-hidden border border-base-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center relative">
                    <div className="text-6xl opacity-30">☕</div>
                    {cafe.featured && (
                      <div className="absolute top-4 left-4 badge badge-primary badge-sm">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-1">
                      {cafe.name}
                    </h3>
                    <p className="text-base-content/70 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {cafe.description}
                    </p>

                    <div className="space-y-3">
                      <div className="text-sm text-base-content/60 flex items-center gap-2">
                        <span className="text-lg">📍</span>
                        <span className="truncate">{cafe.address}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {cafe.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="badge badge-outline badge-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {cafe.tags.length > 3 && (
                          <span className="badge badge-ghost badge-xs">
                            +{cafe.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Clean Ad Banner */}
        <div className="mb-16">
          <AdBanner />
        </div>

        {/* Other Cities */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-8">
            Explore Other Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from(new Set(cafes.map((cafe) => cafe.city)))
              .filter(
                (city) => city.toLowerCase().replace(" ", "-") !== params.city
              )
              .slice(0, 8)
              .map((city) => (
                <Link
                  key={city}
                  href={`/cities/${city.toLowerCase().replace(" ", "-")}`}
                  className="btn btn-outline btn-sm rounded-full hover:btn-primary transition-colors"
                >
                  {city}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-content py-12 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="cafeco.works"
              width={48}
              height={48}
              className="rounded-lg opacity-90"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">cafeco.works</h3>
          <p className="text-primary-content/80 mb-4">
            The curated directory for remote workers
          </p>
          <p className="text-sm text-primary-content/60">
            Made with ☕ for the global remote community
          </p>
        </div>
      </footer>
    </div>
  );
}
