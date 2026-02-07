"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Github, Menu, X, Plus } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar-coffee sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3 text-coffee-900 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="cafecoworks"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold logo text-coffee-900">
            cafecoworks
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/cities"
            className="text-sm font-medium text-coffee-600 hover:text-coffee-900 transition-colors flex items-center gap-1.5"
          >
            <MapPin size={14} />
            Cities
          </Link>
          <Link
            href="/submit"
            className="text-sm font-medium text-coffee-600 hover:text-coffee-900 transition-colors flex items-center gap-1.5"
          >
            <Plus size={14} />
            Submit
          </Link>
          <a
            href="https://github.com/lucasnevespereira/cafecoworks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-coffee-600 hover:text-coffee-900 transition-colors flex items-center gap-1.5"
          >
            <Github size={14} />
            GitHub
          </a>
          <Link
            href="/submit"
            className="btn btn-primary btn-sm font-medium px-5 text-xs"
          >
            Add a Cafe
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-coffee-700 hover:text-coffee-900 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-coffee-200 bg-base-100 px-6 py-4 space-y-3">
          <Link
            href="/cities"
            className="flex items-center gap-2 py-2 text-sm font-medium text-coffee-700 hover:text-coffee-900 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <MapPin size={16} />
            Cities
          </Link>
          <Link
            href="/submit"
            className="flex items-center gap-2 py-2 text-sm font-medium text-coffee-700 hover:text-coffee-900 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <Plus size={16} />
            Submit a Cafe
          </Link>
          <a
            href="https://github.com/lucasnevespereira/cafecoworks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 text-sm font-medium text-coffee-700 hover:text-coffee-900 transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
