import Link from "next/link";
import SearchBar from "./components/SearchBar";
import { getCafesData } from "@/src/lib/cafes";

export default async function Home() {
  const cafes = await getCafesData();

  // Get unique cities for featured section
  const cities = Array.from(new Set(cafes.map((cafe) => cafe.city))).slice(
    0,
    6
  );
  const featuredCafes = cafes.slice(0, 3);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section with Coffee Gradient */}
      <section className="py-16 px-6 coffee-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-display">
            <span className="text-coffee-900">Find Your Perfect</span>
            <br />
            <span className="text-coffee-brand">Coworking Cafe</span>
          </h1>

          <p className="text-xl text-coffee-warm mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover curated coworking cafes worldwide. From quiet corners to
            buzzing spaces, find where remote work meets great coffee.
          </p>

          {/* Clean Search Bar */}
          <div className="max-w-md mx-auto mb-16">
            <SearchBar />
          </div>

          {/* Coffee-themed Stats */}
          <div className="flex justify-center gap-12 text-center">
            <div className="card-coffee p-6">
              <div className="text-3xl font-bold text-coffee-900 mb-1">
                {cafes.length}
              </div>
              <div className="text-sm text-coffee-warm uppercase tracking-wider">
                Cafes
              </div>
            </div>
            <div className="card-coffee p-6">
              <div className="text-3xl font-bold text-coffee-900 mb-1">
                {cities.length}
              </div>
              <div className="text-sm text-coffee-warm uppercase tracking-wider">
                Cities
              </div>
            </div>
            <div className="card-coffee p-6">
              <div className="text-3xl font-bold text-coffee-900 mb-1">
                {new Set(cafes.map((cafe) => cafe.country)).size - 1}+
              </div>
              <div className="text-sm text-coffee-warm uppercase tracking-wider">
                Countries
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cities with Section Background */}
      <section className="py-16 px-6 section-coffee-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-coffee-900 mb-4 text-display">
              Popular Destinations
            </h2>
            <p className="text-coffee-warm">
              Explore coworking cafes in these amazing cities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/cities/${city.toLowerCase().replace(" ", "-")}`}
                className="card-coffee p-6 text-center hover:-translate-y-1 transition-all duration-300 group"
              >
                <h3 className="font-semibold text-coffee-900 text-lg mb-2 group-hover:text-coffee-700 transition-colors">
                  {city}
                </h3>
                <p className="text-sm text-coffee-warm">
                  {cafes.filter((cafe) => cafe.city === city).length} cafes
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cafes - Coffee Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-coffee-900 mb-4 text-display">
              Featured Cafes
            </h2>
            <p className="text-coffee-warm">
              Hand-picked favorites from our community
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredCafes.map((cafe) => (
              <Link
                key={cafe.id}
                href={`/places/${cafe.slug}`}
                className="card-coffee overflow-hidden hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="aspect-[4/3] coffee-gradient flex items-center justify-center relative">
                  {cafe.image ? (
                    <img
                      src={cafe.image}
                      alt={cafe.name}
                      className="object-cover w-full h-full absolute inset-0"
                    />
                  ) : (
                    <div className="text-6xl opacity-30">☕</div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl text-coffee-900 group-hover:text-coffee-700 transition-colors line-clamp-1">
                      {cafe.name}
                    </h3>
                    <div className="badge-golden">Featured</div>
                  </div>

                  <p className="text-coffee-warm text-sm mb-4 line-clamp-2 leading-relaxed">
                    {cafe.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-coffee-rich font-medium">
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

      {/* Coffee Call to Action */}
      <section className="py-16 px-6 bg-cream-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-coffee-900 mb-4 text-display">
            Know a Great Coworking Cafe?
          </h2>
          <p className="text-lg text-coffee-warm mb-8">
            Help fellow remote workers discover amazing workspaces
          </p>
          <Link
            href="/submit"
            className="btn btn-primary btn-lg px-8 font-medium"
          >
            Submit Your Favorite Cafe
          </Link>
        </div>
      </section>
    </div>
  );
}
