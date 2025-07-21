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
      {/* Navigation */}
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-xl font-bold text-primary"
          >
            <Image
              src="/logo.png"
              alt="cafeco.works"
              width={32}
              height={32}
              className="mr-2"
            />
            cafeco.works
          </Link>
        </div>
        <div className="flex-none">
          <Link href="/submit" className="btn btn-primary btn-sm">
            Submit Cafe
          </Link>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm px-6 py-4">
        <ul>
          <li>
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
          </li>
          <li className="text-base-content/60">{cityName}</li>
        </ul>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Coworking Cafes in {cityName}
          </h1>
          <p className="text-lg text-base-content/70 mb-6">
            Discover {cityCafes.length} amazing workspace
            {cityCafes.length !== 1 ? "s" : ""} perfect for remote work
          </p>

          {/* City Stats */}
          <div className="stats shadow-lg bg-white/50 backdrop-blur-sm">
            <div className="stat">
              <div className="stat-value text-primary">{cityCafes.length}</div>
              <div className="stat-title">Cafes</div>
            </div>
            <div className="stat">
              <div className="stat-value text-primary">{cityTags.length}</div>
              <div className="stat-title">Unique Features</div>
            </div>
            <div className="stat">
              <div className="stat-value text-primary">
                {cityCafes.filter((cafe) => cafe.featured).length}
              </div>
              <div className="stat-title">Featured</div>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Popular Features
          </h2>
          <div className="flex flex-wrap gap-2">
            {cityTags.slice(0, 15).map((tag) => (
              <span key={tag} className="badge badge-secondary badge-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Ad Banner */}
        <div className="mb-12">
          <AdBanner />
        </div>

        {/* Cafes Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-primary">
              All Cafes ({cityCafes.length})
            </h2>
            <div className="text-sm text-base-content/60">
              Sorted by featured first
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityCafes
              .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
              .map((cafe) => (
                <div
                  key={cafe.id}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <figure className="aspect-video bg-base-300 relative">
                    <div className="w-full h-full flex items-center justify-center text-base-content/40">
                      📸 Photo placeholder
                    </div>
                    {cafe.featured && (
                      <div className="badge badge-primary absolute top-4 left-4">
                        Featured
                      </div>
                    )}
                  </figure>

                  <div className="card-body">
                    <h3 className="card-title text-primary">{cafe.name}</h3>
                    <p className="text-base-content/70 line-clamp-3 mb-4">
                      {cafe.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-base-content/60">
                        📍 {cafe.address}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cafe.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="badge badge-secondary badge-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {cafe.tags.length > 4 && (
                        <span className="badge badge-outline badge-sm">
                          +{cafe.tags.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="card-actions justify-end">
                      <Link
                        href={`/places/${cafe.slug}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Other Cities */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Explore Other Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from(new Set(cafes.map((cafe) => cafe.city)))
              .filter(
                (city) => city.toLowerCase().replace(" ", "-") !== params.city
              )
              .slice(0, 8)
              .map((city) => (
                <Link
                  key={city}
                  href={`/cities/${city.toLowerCase().replace(" ", "-")}`}
                  className="btn btn-outline btn-sm"
                >
                  {city}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-primary text-primary-content mt-16">
        <aside>
          <Image
            src="/logo.png"
            alt="cafeco.works"
            width={40}
            height={40}
            className="mb-4"
          />
          <p className="font-bold text-lg">cafeco.works</p>
          <p>Find your perfect coworking cafe worldwide</p>
          <p className="text-sm opacity-70">Made with ☕ for remote workers</p>
        </aside>
      </footer>
    </div>
  );
}
