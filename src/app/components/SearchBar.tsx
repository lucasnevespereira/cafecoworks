"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import Link from "next/link";
import { Search, Coffee } from "lucide-react";
import { Cafe } from "@/src/types/cafe";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ item: Cafe }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [fuse, setFuse] = useState<Fuse<Cafe> | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load cafes data on mount
  useEffect(() => {
    const loadCafes = async () => {
      try {
        const response = await fetch("/cafes.json");
        const cafesData: Cafe[] = await response.json();
        const fuseInstance = new Fuse(cafesData, {
          keys: ["name", "city", "country", "tags"],
          threshold: 0.4,
          includeScore: true,
        });
        setFuse(fuseInstance);
      } catch (error) {
        console.error("Failed to load cafes data:", error);
      }
    };
    loadCafes();
  }, []);

  // Search on query change
  useEffect(() => {
    if (query.length > 1 && fuse) {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        const searchResults = fuse.search(query);
        setResults(searchResults.slice(0, 5));
        setIsOpen(true);
        setIsLoading(false);
        setActiveIndex(-1);
      }, 150);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      setActiveIndex(-1);
    }
  }, [query, fuse]);

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleGlobalKeydown);
    return () => document.removeEventListener("keydown", handleGlobalKeydown);
  }, []);

  const handleSelect = useCallback(
    (slug: string) => {
      router.push(`/places/${slug}`);
      setIsOpen(false);
      setQuery("");
      setActiveIndex(-1);
      inputRef.current?.blur();
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          handleSelect(results[activeIndex].item.slug);
        } else if (results.length > 0) {
          handleSelect(results[0].item.slug);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement;
      activeEl?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search cafes, cities..."
          className="input input-bordered w-full pl-10 pr-16 text-sm bg-base-100 border-coffee-300 focus:border-coffee-700 focus:outline-none transition-colors rounded-xl h-12"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-coffee-400 bg-coffee-100 border border-coffee-200 rounded">
          ⌘K
        </kbd>
      </div>

      {/* Search Results */}
      {isOpen && results.length > 0 && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 mt-2 bg-base-100 shadow-2xl rounded-xl border border-coffee-200 z-50 overflow-hidden"
        >
          {results.map(({ item }, index) => (
            <button
              key={item.id}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 border-b border-coffee-100 last:border-b-0 transition-colors ${
                index === activeIndex
                  ? "bg-coffee-100"
                  : "hover:bg-coffee-50"
              }`}
              onClick={() => handleSelect(item.slug)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="w-8 h-8 bg-cream-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <Coffee size={14} className="text-coffee-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-coffee-900 truncate">
                  {item.name}
                </div>
                <div className="text-xs text-coffee-500 truncate">
                  {item.city}, {item.country}
                </div>
              </div>
              <div className="flex gap-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="badge-coffee badge-xs">
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
        <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 shadow-2xl rounded-xl border border-coffee-200 z-50 p-5 text-center">
          <div className="text-sm text-coffee-500 mb-2">
            No cafes found for &ldquo;{query}&rdquo;
          </div>
          <Link
            href="/submit"
            className="text-xs text-coffee-700 hover:underline"
          >
            Know this place? Submit it →
          </Link>
        </div>
      )}

      {/* Loading */}
      {isOpen && isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 shadow-2xl rounded-xl border border-coffee-200 z-50 p-4 text-center">
          <span className="loading loading-spinner loading-sm text-coffee-500"></span>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
