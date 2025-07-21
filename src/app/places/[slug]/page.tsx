import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import cafes from "../../../data/cafes.json";
import AdBanner from "../../components/AdBanner";

interface PageProps {
  params: { slug: string };
}

// Generate static params for all cafes
export async function generateStaticParams() {
  return cafes.map((cafe) => ({
    slug: cafe.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const cafe = cafes.find((c) => c.slug === params.slug);

  if (!cafe) {
    return {
      title: "Cafe Not Found | cafeco.works",
    };
  }

  return {
    title: `${cafe.name} - ${cafe.city} | cafeco.works`,
    description: cafe.description,
    openGraph: {
      title: `${cafe.name} - ${cafe.city}`,
      description: cafe.description,
      type: "article",
    },
  };
}

export default function CafePage({ params }: PageProps) {
  const cafe = cafes.find((c) => c.slug === params.slug);

  if (!cafe) {
    notFound();
  }

  const relatedCafes = cafes
    .filter((c) => c.city === cafe.city && c.id !== cafe.id)
    .slice(0, 3);

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
          <li>
            <Link
              href={`/cities/${cafe.city.toLowerCase().replace(" ", "-")}`}
              className="text-primary hover:underline"
            >
              {cafe.city}
            </Link>
          </li>
          <li className="text-base-content/60">{cafe.name}</li>
        </ul>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="aspect-[4/3] bg-base-300 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-base-content/40 text-lg">
              📸 {cafe.name} Photo
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                {cafe.name}
              </h1>
              <p className="text-lg text-base-content/70 mb-4">
                {cafe.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {cafe.tags.map((tag) => (
                  <span key={tag} className="badge badge-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Location Info */}
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-primary">📍 Location</h3>
                <p className="text-base-content/80">{cafe.address}</p>
                <p className="text-base-content/60">
                  {cafe.city}, {cafe.country}
                </p>

                {/* Coordinates */}
                <div className="text-sm text-base-content/50 mt-2">
                  Lat: {cafe.lat}, Lng: {cafe.lng}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <button className="btn btn-primary flex-1">
                📍 Get Directions
              </button>
              <button className="btn btn-outline flex-1">🔗 Share</button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Location Map</h2>
          <div className="aspect-[2/1] bg-base-300 rounded-lg overflow-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center text-base-content/40">
              <div className="text-4xl mb-4">🗺️</div>
              <div className="text-lg font-medium">
                Interactive Map Placeholder
              </div>
              <div className="text-sm mt-2">
                Google Maps integration: {cafe.lat}, {cafe.lng}
              </div>
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="mb-12">
          <AdBanner />
        </div>

        {/* Related Cafes */}
        {relatedCafes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6">
              More Cafes in {cafe.city}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCafes.map((relatedCafe) => (
                <Link
                  key={relatedCafe.id}
                  href={`/places/${relatedCafe.slug}`}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
                >
                  <figure className="aspect-video bg-base-300">
                    <div className="w-full h-full flex items-center justify-center text-base-content/40">
                      📸 Photo placeholder
                    </div>
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-primary text-lg">
                      {relatedCafe.name}
                    </h3>
                    <p className="text-base-content/70 text-sm line-clamp-2">
                      {relatedCafe.description}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {relatedCafe.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="badge badge-secondary badge-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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
