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
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] bg-gradient-to-br from-base-200 to-base-300 rounded-3xl overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4 opacity-40">☕</div>
                <div className="text-lg text-base-content/50">{cafe.name}</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight flex-1">
                  {cafe.name}
                </h1>
                {cafe.featured && (
                  <div className="badge badge-secondary badge-lg font-medium">
                    Featured
                  </div>
                )}
              </div>

              <p className="text-lg text-base-content/70 leading-relaxed mb-6">
                {cafe.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {cafe.tags.map((tag) => (
                  <span key={tag} className="badge badge-outline">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gradient-to-br from-secondary/5 to-accent/5 border border-base-200 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="text-2xl">📍</span>
                Location
              </h3>
              <div className="space-y-3">
                <p className="text-base-content/80 leading-relaxed">
                  {cafe.address}
                </p>
                <p className="font-medium text-primary">
                  {cafe.city}, {cafe.country}
                </p>
                <div className="text-sm text-base-content/50">
                  {cafe.lat}, {cafe.lng}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-primary rounded-2xl">
                <span className="text-lg mr-2">📍</span>
                Get Directions
              </button>
              <button className="btn btn-outline rounded-2xl">
                <span className="text-lg mr-2">🔗</span>
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Location Map
          </h2>
          <div className="aspect-[2/1] bg-gradient-to-br from-base-200 to-base-300 rounded-3xl overflow-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center text-base-content/50">
              <div className="text-6xl mb-6">🗺️</div>
              <div className="text-xl font-medium mb-2">Interactive Map</div>
              <div className="text-base">
                Google Maps: {cafe.lat}, {cafe.lng}
              </div>
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="mb-16">
          <AdBanner />
        </div>

        {/* Related Cafes */}
        {relatedCafes.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              More Cafes in {cafe.city}
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {relatedCafes.map((relatedCafe) => (
                <Link
                  key={relatedCafe.id}
                  href={`/places/${relatedCafe.slug}`}
                  className="group bg-base-100 rounded-3xl overflow-hidden border border-base-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                    <div className="text-6xl opacity-30">☕</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-1">
                      {relatedCafe.name}
                    </h3>
                    <p className="text-base-content/70 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {relatedCafe.description}
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {relatedCafe.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="badge badge-outline badge-xs"
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
