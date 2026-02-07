import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Globe, Train, ExternalLink } from "lucide-react";
import { getCafesData } from "@/src/lib/cafes";
import CafeImage from "../../components/CafeImage";
import CafeMap from "../../components/CafeMap";
import ShareButton from "../../components/ShareButton";
import DirectionsButton from "../../components/DirectionsButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cafes = await getCafesData();
  return cafes.map((cafe) => ({ slug: cafe.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const cafes = await getCafesData();
  const { slug } = await params;
  const cafe = cafes.find((c) => c.slug === slug);

  if (!cafe) {
    return { title: "Cafe Not Found | cafecoworks" };
  }

  return {
    title: `${cafe.name} - ${cafe.city} | cafecoworks`,
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
              <Link
                href={`/cities/${cafe.city.toLowerCase().replace(" ", "-")}`}
                className="text-coffee-700 hover:underline"
              >
                {cafe.city}
              </Link>
            </li>
            <li className="text-coffee-500">{cafe.name}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-5 gap-10 mb-16">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] coffee-gradient rounded-2xl overflow-hidden flex items-center justify-center relative">
              <CafeImage cafeImage={cafe.image} cafeName={cafe.name} />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start gap-3 mb-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-coffee-900 leading-tight flex-1 text-display">
                  {cafe.name}
                </h1>
                {cafe.featured && (
                  <span className="badge-golden badge-sm font-medium mt-1">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-coffee-500 leading-relaxed mb-5">
                {cafe.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {cafe.tags.map((tag) => (
                  <span key={tag} className="badge-golden badge-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-cream-100 border border-coffee-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-coffee-900 mb-3 flex items-center gap-2 text-display uppercase tracking-wider">
                <MapPin size={14} />
                Location
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-coffee-600 leading-relaxed">
                  {cafe.address}
                </p>
                <p className="text-sm font-medium text-coffee-900">
                  {cafe.city}, {cafe.country}
                </p>
                {cafe.station && (
                  <p className="text-xs text-coffee-500 flex items-center gap-1.5">
                    <Train size={12} />
                    {cafe.station}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {cafe.website && (
                <a
                  href={cafe.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-coffee w-full rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <Globe size={14} />
                  Visit Website
                  <ExternalLink size={12} className="opacity-50" />
                </a>
              )}
              <div className="grid grid-cols-2 gap-2">
                <DirectionsButton
                  latitude={cafe.lat}
                  longitude={cafe.lng}
                  address={cafe.address}
                />
                <ShareButton
                  title={`${cafe.name} - ${cafe.city}`}
                  text={`Check out ${cafe.name} in ${cafe.city}!`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-coffee-900 mb-4 text-display">
            Location
          </h2>

          {cafe.lat && cafe.lng ? (
            <div className="aspect-[2.5/1] rounded-2xl overflow-hidden">
              <CafeMap name={cafe.name} lat={cafe.lat} lng={cafe.lng} />
            </div>
          ) : (
            <div className="aspect-[2.5/1] coffee-gradient rounded-2xl overflow-hidden flex items-center justify-center">
              <p className="text-sm text-coffee-400">Map coming soon</p>
            </div>
          )}
        </div>

        {/* Related Cafes */}
        {relatedCafes.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-coffee-900 text-display">
                More in {cafe.city}
              </h2>
              <Link
                href={`/cities/${cafe.city.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-coffee-700 hover:text-coffee-900 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCafes.map((relatedCafe) => (
                <Link
                  key={relatedCafe.id}
                  href={`/places/${relatedCafe.slug}`}
                  className="card-coffee overflow-hidden hover:-translate-y-1 transition-all duration-200 group"
                >
                  <div className="aspect-[16/10] coffee-gradient flex items-center justify-center relative overflow-hidden">
                    {relatedCafe.image ? (
                      <Image
                        src={relatedCafe.image}
                        alt={relatedCafe.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="text-5xl opacity-20">☕</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-coffee-900 mb-2 group-hover:text-coffee-700 transition-colors line-clamp-1">
                      {relatedCafe.name}
                    </h3>
                    <p className="text-coffee-500 text-sm mb-3 line-clamp-2 leading-relaxed">
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
