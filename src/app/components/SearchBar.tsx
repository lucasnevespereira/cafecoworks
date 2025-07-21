"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import cafes from "../../data/cafes.json";
import Link from "next/link";

const fuse = new Fuse(cafes, {
  keys: ["name", "city", "country", "tags"],
  threshold: 0.4,
  includeScore: true,
});

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ item: (typeof cafes)[0] }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true);
      // Add slight delay for better UX
      const timeoutId = setTimeout(() => {
        const searchResults = fuse.search(query);
        setResults(searchResults.slice(0, 5));
        setIsOpen(true);
        setIsLoading(false);
      }, 150);

      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
    }
  }, [query]);

  const handleSelect = (slug: string) => {
    router.push(`/places/${slug}`);
    setIsOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0].item.slug);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cafes, cities, or features..."
            className="input input-bordered w-full pr-12 text-base bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-colors rounded-2xl h-14"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setIsOpen(true)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary btn-sm btn-circle"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Clean Search Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 shadow-2xl rounded-2xl border border-base-200 z-50 overflow-hidden">
          {results.map(({ item }) => (
            <button
              key={item.id}
              className="w-full p-4 text-left hover:bg-base-200 transition-colors flex items-center gap-4 border-b border-base-200 last:border-b-0"
              onClick={() => handleSelect(item.slug)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg">☕</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-primary truncate">
                  {item.name}
                </div>
                <div className="text-sm text-base-content/60 truncate">
                  {item.city}, {item.country}
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                {item.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="badge badge-outline badge-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && results.length === 0 && query.length > 2 && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 shadow-2xl rounded-2xl border border-base-200 z-50 p-6 text-center">
          <div className="text-4xl mb-2 opacity-50">🔍</div>
          <div className="text-base-content/60">
            No cafes found for &ldquo;{query}&rdquo;
          </div>
          <Link
            href="/submit"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Submit this cafe if you know it
          </Link>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
