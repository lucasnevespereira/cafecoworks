import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4 opacity-20">☕</div>
        <h1 className="text-2xl font-bold text-coffee-900 mb-2 text-display">
          Page not found
        </h1>
        <p className="text-sm text-coffee-500 mb-6">
          The cafe you&apos;re looking for doesn&apos;t seem to exist. Maybe it
          hasn&apos;t been added yet.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="btn btn-primary btn-sm px-5 font-medium inline-flex items-center gap-2"
          >
            <Search size={14} />
            Browse Cafes
          </Link>
          <Link
            href="/submit"
            className="btn btn-coffee btn-sm px-5 font-medium"
          >
            Submit a Cafe
          </Link>
        </div>
      </div>
    </div>
  );
}
