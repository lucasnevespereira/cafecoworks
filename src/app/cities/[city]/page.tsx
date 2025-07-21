import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import cafes from "../../../data/cafes.json";
import AdBanner from "../../components/AdBanner";

interface PageProps {
  params: Promise<{ city: string }>;
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
  const { city } = await params;
  const cityName = city
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const cityCafes = cafes.filter(
    (cafe) => cafe.city.toLowerCase().replace(" ", "-") === city
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

export default async function CityPage({ params }: PageProps) {
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

  // Get unique tags for this city
  const cityTags = Array.from(new Set(cityCafes.flatMap((cafe) => cafe.tags)));

  return (
    <div className="min-h-screen bg-base-100">
      {/* Coffee Navigation */}
      <nav className="navbar-coffee px-6 py-4">
        <div className="flex-1">
          <Link
            href="/"
            className="flex items-center gap-3 text-coffee-900 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="cafeco.works"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold logo text-coffee-900">
              cafeco.works
            </span>
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

      {/* Coffee Breadcrumbs */}
      <div className="px-6 py-4 bg-coffee-cream">
        <div className="text-sm breadcrumbs breadcrumbs-coffee">
          <ul>
            <li>
              <Link href="/" className="text-coffee-900 hover:underline">
                Home
              </Link>
            </li>
            <li className="text-coffee-warm">{cityName}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Coffee Hero Section */}
        <div className="text-center mb-16 coffee-gradient rounded-3xl p-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-coffee-900 mb-6 text-display">
            Coworking Cafes in {cityName}
          </h1>
          <p className="text-xl text-coffee-warm mb-8 leading-relaxed">
            Discover {cityCafes.length} amazing workspace
            {cityCafes.length !== 1 ? "s" : ""} perfect for remote work
          </p>

          {/* Coffee Stats Cards */}
          <div className="flex justify-center gap-8 text-center">
            <div className="card-coffee p-6">
              <div className="text-3xl font-bold text-coffee-900 mb-1">
                {cityCafes.length}
              </div>
              <div className="text-sm text-coffee-warm uppercase tracking-wider">
                Cafes
              </div>
            </div>
            <div className="card-coffee p-6">
              <div className="text-3xl font-bold text-coffee-900 mb-1">
                {cityTags.length}
              </div>
              <div className="text-sm text-coffee-warm uppercase tracking-wider">
                Features
              </div>
            </div>
            <div className="card-coffee p-6">
              <div className="text-3xl font-bold text-coffee-900 mb-1">
                {cityCafes.filter((cafe) => cafe.featured).length}
              </div>
              <div className="text-sm text-coffee-warm uppercase tracking-wider">
                Featured
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-coffee-900 mb-6 text-center text-display">
            Popular Features
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {cityTags.slice(0, 12).map((tag) => (
              <span key={tag} className="badge-golden badge-lg font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Coffee Cafes Grid */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityCafes
              .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
              .map((cafe) => (
                <Link
                  key={cafe.id}
                  href={`/places/${cafe.slug}`}
                  className="card-coffee overflow-hidden hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="aspect-[4/3] coffee-gradient flex items-center justify-center relative">
                    <div className="text-6xl opacity-30">☕</div>
                    {cafe.featured && (
                      <div className="absolute top-4 left-4 badge-golden badge-sm">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-coffee-900 mb-3 group-hover:text-coffee-700 transition-colors line-clamp-1">
                      {cafe.name}
                    </h3>
                    <p className="text-coffee-warm text-sm mb-4 line-clamp-2 leading-relaxed">
                      {cafe.description}
                    </p>

                    <div className="space-y-3">
                      <div className="text-sm text-coffee-warm flex items-center gap-2">
                        <span className="text-lg">📍</span>
                        <span className="truncate">{cafe.address}</span>
                      </div>

                      {/* Coffee Tags */}
                      <div className="flex flex-wrap gap-1">
                        {cafe.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="badge-coffee badge-xs">
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

        {/* Ad Banner */}
        <div className="mb-16">
          <AdBanner />
        </div>

        {/* Other Cities with Coffee Theme */}
        <div className="text-center section-coffee-warm rounded-3xl p-12">
          <h2 className="text-2xl font-bold text-coffee-900 mb-8 text-display">
            Explore Other Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from(new Set(cafes.map((cafe) => cafe.city)))
              .filter(
                (cityName) => cityName.toLowerCase().replace(" ", "-") !== city
              )
              .slice(0, 8)
              .map((cityName) => (
                <Link
                  key={cityName}
                  href={`/cities/${cityName.toLowerCase().replace(" ", "-")}`}
                  className="btn-coffee btn-sm rounded-full hover:btn-primary transition-colors"
                >
                  {cityName}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Coffee Footer */}
      <footer className="footer-coffee text-white py-12 px-6 mt-20">
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
          <h3 className="text-2xl font-bold mb-2 logo text-white">
            cafeco.works
          </h3>
          <p className="text-white/80 mb-4">
            The curated directory for remote workers
          </p>
          <p className="text-sm text-white/60">
            Made with ☕ for the global remote community
          </p>
        </div>
      </footer>
    </div>
  );
}
