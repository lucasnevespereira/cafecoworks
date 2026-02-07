import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-coffee py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logo.png"
                alt="cafecoworks"
                width={32}
                height={32}
                className="rounded-lg opacity-90"
              />
              <span className="text-xl font-bold logo">cafecoworks</span>
            </div>
            <p className="text-cream-300 text-sm leading-relaxed">
              The open-source directory for finding coworking-friendly cafes
              around the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-cream-200 uppercase tracking-wider mb-3">
              Directory
            </h4>
            <nav className="space-y-2">
              <Link
                href="/cities"
                className="block text-sm text-cream-400 hover:text-cream-100 transition-colors"
              >
                All Cities
              </Link>
              <Link
                href="/submit"
                className="block text-sm text-cream-400 hover:text-cream-100 transition-colors"
              >
                Submit a Cafe
              </Link>
            </nav>
          </div>

          {/* Open Source */}
          <div>
            <h4 className="text-sm font-semibold text-cream-200 uppercase tracking-wider mb-3">
              Open Source
            </h4>
            <nav className="space-y-2">
              <a
                href="https://github.com/lucasnevespereira/cafecoworks"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-cream-400 hover:text-cream-100 transition-colors"
              >
                GitHub Repository
              </a>
              <a
                href="https://github.com/lucasnevespereira/cafecoworks/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-cream-400 hover:text-cream-100 transition-colors"
              >
                Report an Issue
              </a>
              <a
                href="https://github.com/lucasnevespereira/cafecoworks#contributing"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-cream-400 hover:text-cream-100 transition-colors"
              >
                Contribute
              </a>
            </nav>
          </div>
        </div>

        <div className="border-t border-coffee-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream-500">
            MIT License. Community-driven, open to all.
          </p>
          <p className="text-xs text-cream-500">
            Built for the remote work community
          </p>
        </div>
      </div>
    </footer>
  );
}
