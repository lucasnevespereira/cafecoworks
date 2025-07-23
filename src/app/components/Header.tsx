import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar-coffee flex justify-between items-center px-6 py-4">
      <div className="flex-1">
        <Link
          href="/"
          className="flex items-center gap-3 text-coffee-900 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="cafecoworks"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-2xl font-bold logo text-coffee-900">
            cafecoworks
          </span>
        </Link>
      </div>
      <div className="flex-none">
        <Link
          href="/submit"
          className="btn btn-primary btn-sm font-medium px-6"
        >
          Submit Cafe
        </Link>
      </div>
    </header>
  );
}
