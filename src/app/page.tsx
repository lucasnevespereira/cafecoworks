import Image from "next/image";
import Link from "next/link";
import SearchBar from "./components/SearchBar";
import cafes from "../data/cafes.json";

// Get unique cities for featured section
const cities = Array.from(new Set(cafes.map((cafe) => cafe.city))).slice(0, 6);
const featuredCafes = cafes.filter((cafe) => cafe.featured).slice(0, 3);

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-sm">
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
      </header>

      {/* Hero Section */}
      <section className="hero min-h-[70vh] bg-gradient-to-br from-base-100 to-secondary/20">
        <div className="hero-content text-center max-w-4xl">
          <div>
            <h1 className="text-5xl font-bold mb-6 text-primary">
              Find Your Perfect
              <span className="text-secondary"> Coworking Cafe</span>
            </h1>
            <p className="text-lg mb-8 text-base-content/80 max-w-2xl mx-auto">
              Discover beautiful cafes around the world where remote workers
              thrive. From bustling coffee shops to quiet corners, find your
              ideal workspace.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto mb-8">
              <SearchBar />
            </div>

            {/* Stats */}
            <div className="stats shadow-lg bg-white/50 backdrop-blur-sm">
              <div className="stat">
                <div className="stat-value text-primary">{cafes.length}</div>
                <div className="stat-title">Cafes</div>
              </div>
              <div className="stat">
                <div className="stat-value text-primary">{cities.length}</div>
                <div className="stat-title">Cities</div>
              </div>
              <div className="stat">
                <div className="stat-value text-primary">5+</div>
                <div className="stat-title">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Popular Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/cities/${city.toLowerCase().replace(" ", "-")}`}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="card-body p-6 text-center">
                  <h3 className="text-lg font-semibold text-primary">{city}</h3>
                  <p className="text-sm text-base-content/60">
                    {cafes.filter((cafe) => cafe.city === city).length} cafes
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cafes */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Featured Cafes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCafes.map((cafe) => (
              <Link
                key={cafe.id}
                href={`/places/${cafe.slug}`}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <figure className="aspect-video bg-base-300">
                  <div className="w-full h-full flex items-center justify-center text-base-content/40">
                    📸 Photo placeholder
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-primary">{cafe.name}</h3>
                  <p className="text-base-content/70 line-clamp-2">
                    {cafe.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-base-content/60">
                      {cafe.city}, {cafe.country}
                    </div>
                    <div className="flex gap-1">
                      {cafe.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="badge badge-secondary badge-sm"
                        >
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

      {/* Ad Banner Placeholder */}
      <section className="py-8 px-4 bg-base-300">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body text-center py-12">
              <div className="text-base-content/40 text-lg font-medium">
                🎯 Advertisement Space
              </div>
              <p className="text-base-content/30 text-sm mt-2">
                Your ad could be here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
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
