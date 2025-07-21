"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import cafes from "../../data/cafes.json";

const fuse = new Fuse(cafes, {
  keys: ["name", "city", "country", "tags"],
  threshold: 0.4,
  includeScore: true,
});

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ item: (typeof cafes)[0] }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 2) {
      const searchResults = fuse.search(query);
      setResults(searchResults.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (slug: string) => {
    router.push(`/places/${slug}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search cafes, cities, or tags..."
            className="input input-bordered w-full text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 2 && setIsOpen(true)}
          />
          <button className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </button>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 shadow-xl rounded-lg border border-base-300 z-50">
          {results.map(({ item }) => (
            <button
              key={item.id}
              className="w-full p-4 text-left hover:bg-base-200 transition-colors first:rounded-t-lg last:rounded-b-lg"
              onClick={() => handleSelect(item.slug)}
            >
              <div className="font-medium text-primary">{item.name}</div>
              <div className="text-sm text-base-content/70">
                {item.city}, {item.country}
              </div>
              <div className="flex gap-1 mt-2">
                {item.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="badge badge-secondary badge-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
