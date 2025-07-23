import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/src/app/components/AdBanner";
import { getCafesData } from "@/src/lib/cafes";
import CafeImage from "../../components/CafeImage";
import CafeMap from "../../components/CafeMap";
import ShareButton from "../../components/ShareButton";
import DirectionsButton from "../../components/DirectionsButton";
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all cafes
export async function generateStaticParams() {
  const cafes = await getCafesData();
  return cafes.map((cafe) => ({
    slug: cafe.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const cafes = await getCafesData();
  const { slug } = await params;
  const cafe = cafes.find((c) => c.slug === slug);

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

export default async function CafePage({ params }: PageProps) {
  const cafes = await getCafesData();
  const { slug } = await params;
  const cafe = cafes.find((c) => c.slug === slug);

  if (!cafe) {
    notFound();
  }

  const relatedCafes = cafes
    .filter((c) => c.city === cafe.city && c.id !== cafe.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Coffee Breadcrumbs */}
      <div className="px-6 py-4 bg-coffee-cream">
        <div className="text-sm breadcrumbs breadcrumbs-coffee">
          <ul>
            <li>
              <Link href="/" className="text-coffee-900 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`/cities/${cafe.city.toLowerCase().replace(" ", "-")}`}
                className="text-coffee-900 hover:underline"
              >
                {cafe.city}
              </Link>
            </li>
            <li className="text-coffee-warm">{cafe.name}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] coffee-gradient rounded-3xl overflow-hidden flex items-center justify-center relative">
              <CafeImage cafeImage={cafe.image} cafeName={cafe.name} />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-coffee-900 leading-tight flex-1 text-display">
                  {cafe.name}
                </h1>
                {cafe.featured && (
                  <div className="badge-golden badge-lg font-medium">
                    Featured
                  </div>
                )}
              </div>

              <p className="text-lg text-coffee-warm leading-relaxed mb-6">
                {cafe.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {cafe.tags.map((tag) => (
                  <span key={tag} className="badge-golden">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-cream-100 border border-coffee-200 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-coffee-900 mb-4 flex items-center gap-2 text-display">
                <span className="text-2xl">📍</span>
                Location
              </h3>
              <div className="space-y-3">
                <p className="text-coffee-warm leading-relaxed">
                  {cafe.address}
                </p>
                <p className="font-medium text-coffee-900">
                  {cafe.city}, {cafe.country}
                </p>
                {cafe.lat && cafe.lng && (
                  <div className="text-sm text-coffee-warm/70">
                    {cafe.lat.toFixed(2)}, {cafe.lng.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <DirectionsButton
                latitude={cafe.lat}
                longitude={cafe.lng}
                address={cafe.address}
              />
              <ShareButton
                title={`${cafe.name} - ${cafe.city}`}
                text={`Check out this cafe! ${cafe.description}`}
              />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-coffee-900 mb-8 text-center text-display">
            Location Map
          </h2>

          {cafe.lat && cafe.lng ? (
            <div className="aspect-[2/1] rounded-3xl overflow-hidden">
              <CafeMap name={cafe.name} lat={cafe.lat} lng={cafe.lng} />
            </div>
          ) : (
            <div className="aspect-[2/1] coffee-gradient rounded-3xl overflow-hidden">
              <div className="w-full h-full flex flex-col items-center justify-center text-coffee-warm">
                <div className="text-6xl mb-6">🗺️</div>
                <div className="text-xl font-medium mb-2 text-coffee-900">
                  Map coming soon
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ad Banner - disabled */}
        {/* <div className="mb-16">
          <AdBanner />
        </div> */}

        {/* Related Cafes */}
        {relatedCafes.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-coffee-900 mb-8 text-center text-display">
              More Cafes in {cafe.city}
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {relatedCafes.map((relatedCafe) => (
                <Link
                  key={relatedCafe.id}
                  href={`/places/${relatedCafe.slug}`}
                  className="card-coffee overflow-hidden hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="aspect-[4/3] coffee-gradient flex items-center justify-center">
                    <div className="text-6xl opacity-30">☕</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-coffee-900 mb-3 group-hover:text-coffee-700 transition-colors line-clamp-1">
                      {relatedCafe.name}
                    </h3>
                    <p className="text-coffee-warm text-sm mb-4 line-clamp-2 leading-relaxed">
                      {relatedCafe.description}
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {relatedCafe.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="badge-coffee badge-xs">
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
    </div>
  );
}
