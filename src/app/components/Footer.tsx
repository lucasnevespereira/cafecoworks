import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-coffee py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="cafeco.works"
            width={48}
            height={48}
            className="rounded-lg opacity-90"
          />
        </div>
        <h3 className="text-2xl font-bold mb-2 logo text-coffee-900">
          cafeco.works
        </h3>
        <p className="text-cream-100 mb-4">
          The curated directory for remote workers
        </p>
        <p className="text-sm text-cream-100/80">
          Made with ☕ for the global remote community
        </p>
      </div>
    </footer>
  );
}
