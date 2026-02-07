import Link from "next/link";
import Image from "next/image";
import { Coffee, MapPin, Globe } from "lucide-react";
import SearchBar from "./components/SearchBar";
import { getCafesData } from "@/src/lib/cafes";

export default async function Home() {
  const cafes = await getCafesData();

  const cities = Array.from(new Set(cafes.map((cafe) => cafe.city))).slice(
    0,
    6
  );
  const countries = new Set(cafes.map((cafe) => cafe.country)).size;
  const featuredCafes = cafes.slice(0, 3);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="py-20 px-6 coffee-gradient">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-display">
            <span className="text-coffee-900">Find Your Perfect</span>
            <br />
            <span className="text-coffee-brand">Coworking Cafe</span>
          </h1>

          <p className="text-lg text-coffee-600 mb-12 max-w-xl mx-auto leading-relaxed">
            Discover curated coworking cafes worldwide. Open source, community
            driven.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-16">
            <SearchBar />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 sm:gap-12">
            <div className="card-coffee px-6 py-4 flex items-center gap-3">
              <Coffee size={20} className="text-coffee-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-coffee-900">
                  {cafes.length}
                </div>
                <div className="text-xs text-coffee-500 uppercase tracking-wider">
                  Cafes
                </div>
              </div>
            </div>
            <div className="card-coffee px-6 py-4 flex items-center gap-3">
              <MapPin size={20} className="text-coffee-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-coffee-900">
                  {cities.length}
                </div>
                <div className="text-xs text-coffee-500 uppercase tracking-wider">
                  Cities
                </div>
              </div>
            </div>
            <div className="card-coffee px-6 py-4 flex items-center gap-3">
              <Globe size={20} className="text-coffee-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-coffee-900">
                  {countries}
                </div>
                <div className="text-xs text-coffee-500 uppercase tracking-wider">
                  Countries
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16 px-6 section-coffee-light">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-coffee-900 text-display">
                Popular Cities
              </h2>
              <p className="text-sm text-coffee-500 mt-1">
                Explore coworking cafes by destination
              </p>
            </div>
            <Link
              href="/cities"
              className="text-sm font-medium text-coffee-700 hover:text-coffee-900 transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/cities/${city.toLowerCase().replace(" ", "-")}`}
                className="card-coffee p-5 text-center hover:-translate-y-1 transition-all duration-200 group"
              >
                <h3 className="font-semibold text-coffee-900 mb-1 group-hover:text-coffee-700 transition-colors">
                  {city}
                </h3>
                <p className="text-xs text-coffee-500">
                  {cafes.filter((cafe) => cafe.city === city).length} cafes
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cafes */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-coffee-900 text-display">
                Featured Cafes
              </h2>
              <p className="text-sm text-coffee-500 mt-1">
                Hand-picked favorites from the community
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCafes.map((cafe) => (
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
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-coffee-900 group-hover:text-coffee-700 transition-colors mb-2 line-clamp-1">
                    {cafe.name}
                  </h3>

                  <p className="text-coffee-500 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {cafe.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-coffee-600 font-medium flex items-center gap-1">
                      <MapPin size={12} />
                      {cafe.city}, {cafe.country}
                    </span>
                    <div className="flex gap-1">
                      {cafe.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="badge-coffee badge-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 section-coffee-light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-coffee-900 mb-3 text-display">
            Know a Great Coworking Cafe?
          </h2>
          <p className="text-coffee-500 mb-6">
            This is an open-source project. Submit a cafe via GitHub and help
            fellow remote workers.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/submit"
              className="btn btn-primary btn-md px-6 font-medium"
            >
              Submit a Cafe
            </Link>
            <a
              href="https://github.com/lucasnevespereira/cafecoworks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-coffee btn-md px-6 font-medium"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
