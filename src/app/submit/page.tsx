import Link from "next/link";
import { Github, GitPullRequest, FileJson, ImagePlus } from "lucide-react";

export const metadata = {
  title: "Submit a Cafe | cafecoworks",
  description:
    "Submit your favorite coworking cafe to help other remote workers find great workspaces.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Breadcrumbs */}
      <div className="px-6 py-3 bg-coffee-cream">
        <div className="max-w-6xl mx-auto text-sm breadcrumbs breadcrumbs-coffee">
          <ul>
            <li>
              <Link href="/" className="text-coffee-700 hover:underline">
                Home
              </Link>
            </li>
            <li className="text-coffee-500">Submit a Cafe</li>
          </ul>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-coffee-900 mb-3 text-display">
            Submit a Coworking Cafe
          </h1>
          <p className="text-coffee-500 leading-relaxed">
            cafecoworks is open source. Add a cafe by opening a pull request on
            GitHub with a JSON file and an image.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          <h2 className="text-lg font-bold text-coffee-900 text-display">
            How to submit
          </h2>

          <div className="space-y-4">
            <div className="card-coffee p-5 flex gap-4">
              <div className="w-8 h-8 bg-cream-200 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-coffee-700">
                1
              </div>
              <div>
                <h3 className="font-semibold text-coffee-900 mb-1 flex items-center gap-2">
                  <Github size={14} />
                  Fork the repository
                </h3>
                <p className="text-sm text-coffee-500">
                  Fork{" "}
                  <a
                    href="https://github.com/lucasnevespereira/cafecoworks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coffee-700 underline"
                  >
                    lucasnevespereira/cafecoworks
                  </a>{" "}
                  on GitHub and clone it locally.
                </p>
              </div>
            </div>

            <div className="card-coffee p-5 flex gap-4">
              <div className="w-8 h-8 bg-cream-200 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-coffee-700">
                2
              </div>
              <div>
                <h3 className="font-semibold text-coffee-900 mb-1 flex items-center gap-2">
                  <FileJson size={14} />
                  Add cafe data
                </h3>
                <p className="text-sm text-coffee-500 mb-3">
                  Create a JSON file at{" "}
                  <code className="text-xs bg-cream-200 px-1.5 py-0.5 rounded text-coffee-800">
                    data/cafes/[city]/[cafe-slug].json
                  </code>
                </p>
                <pre className="text-xs bg-coffee-900 text-cream-100 rounded-lg p-4 overflow-x-auto leading-relaxed">
{`{
  "name": "Cafe Name",
  "slug": "cafe-name",
  "description": "Why this cafe is great for remote work...",
  "city": "City Name",
  "country": "Country",
  "address": "Full street address",
  "website": "https://example.com",
  "image": "/images/city/cafe-name/cafe-name.webp",
  "tags": ["wifi", "quiet", "power-outlets"]
}`}
                </pre>
              </div>
            </div>

            <div className="card-coffee p-5 flex gap-4">
              <div className="w-8 h-8 bg-cream-200 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-coffee-700">
                3
              </div>
              <div>
                <h3 className="font-semibold text-coffee-900 mb-1 flex items-center gap-2">
                  <ImagePlus size={14} />
                  Add an image
                </h3>
                <p className="text-sm text-coffee-500">
                  Place a photo at{" "}
                  <code className="text-xs bg-cream-200 px-1.5 py-0.5 rounded text-coffee-800">
                    public/images/[city]/[cafe-slug]/[cafe-slug].webp
                  </code>
                  . Use WebP format for best performance.
                </p>
              </div>
            </div>

            <div className="card-coffee p-5 flex gap-4">
              <div className="w-8 h-8 bg-cream-200 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-coffee-700">
                4
              </div>
              <div>
                <h3 className="font-semibold text-coffee-900 mb-1 flex items-center gap-2">
                  <GitPullRequest size={14} />
                  Open a pull request
                </h3>
                <p className="text-sm text-coffee-500">
                  Push your changes and open a PR. We&apos;ll review and merge it
                  within a few days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="section-coffee-light rounded-xl p-8 text-center mb-12">
          <h2 className="text-xl font-bold text-coffee-900 mb-2 text-display">
            Ready to contribute?
          </h2>
          <p className="text-sm text-coffee-500 mb-5">
            Open the repository on GitHub to get started.
          </p>
          <a
            href="https://github.com/lucasnevespereira/cafecoworks"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md px-6 font-medium inline-flex items-center gap-2"
          >
            <Github size={16} />
            Open on GitHub
          </a>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-lg font-bold text-coffee-900 mb-6 text-display">
            FAQ
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "What makes a good coworking cafe?",
                a: "Reliable WiFi, comfortable seating, power outlets, and a welcoming atmosphere for laptop users.",
              },
              {
                q: "Can I submit multiple cafes?",
                a: "Absolutely! Add multiple JSON files in a single pull request.",
              },
              {
                q: "Do you accept international submissions?",
                a: "Yes. We're building a global directory and welcome cafes from anywhere.",
              },
              {
                q: "How long does review take?",
                a: "Usually 1-3 days. We verify the location and check that it meets our coworking criteria.",
              },
            ].map((faq, index) => (
              <div key={index} className="card-coffee p-5">
                <h3 className="font-semibold text-coffee-900 mb-2 text-sm">
                  {faq.q}
                </h3>
                <p className="text-sm text-coffee-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
