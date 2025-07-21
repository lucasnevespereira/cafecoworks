import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Submit a Cafe | cafeco.works",
  description:
    "Submit your favorite coworking cafe to help other remote workers find great workspaces.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <nav className="navbar bg-base-100 shadow-sm">
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
      </nav>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm px-6 py-4">
        <ul>
          <li>
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
          </li>
          <li className="text-base-content/60">Submit Cafe</li>
        </ul>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Submit a Coworking Cafe
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Know a great cafe that's perfect for remote work? Help other digital
            nomads and remote workers discover amazing workspaces around the
            world.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <div className="text-3xl mb-2">☕</div>
              <h3 className="card-title justify-center text-primary">
                Great Coffee
              </h3>
              <p className="text-sm text-base-content/70">
                Quality coffee and atmosphere
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <div className="text-3xl mb-2">📶</div>
              <h3 className="card-title justify-center text-primary">
                Reliable WiFi
              </h3>
              <p className="text-sm text-base-content/70">
                Strong internet for productive work
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <div className="text-3xl mb-2">💺</div>
              <h3 className="card-title justify-center text-primary">
                Comfortable Seating
              </h3>
              <p className="text-sm text-base-content/70">
                Places to work for hours
              </p>
            </div>
          </div>
        </div>

        {/* Submit Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-primary mb-6">
              Cafe Submission Form
            </h2>

            <form className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Cafe Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="The Coffee House"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">City *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="San Francisco"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Country *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="United States"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Website (optional)
                    </span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="input input-bordered"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Address *</span>
                </label>
                <input
                  type="text"
                  placeholder="123 Main Street, San Francisco, CA 94102"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Description *</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Describe what makes this cafe great for remote work. Include details about WiFi quality, seating, atmosphere, power outlets, etc."
                  required
                ></textarea>
              </div>

              {/* Features */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Features (select all that apply)
                  </span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {[
                    "wifi",
                    "power-outlets",
                    "quiet",
                    "spacious",
                    "outdoor-seating",
                    "good-coffee",
                    "food-available",
                    "meeting-rooms",
                    "phone-calls-ok",
                    "24-7",
                    "weekend-open",
                    "student-friendly",
                  ].map((feature) => (
                    <label
                      key={feature}
                      className="label cursor-pointer justify-start"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm mr-2"
                      />
                      <span className="label-text text-sm capitalize">
                        {feature.replace("-", " ")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Your Email (for follow-up questions)
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="input input-bordered"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    We'll only use this to contact you about your submission
                  </span>
                </label>
              </div>

              {/* Submission Notice */}
              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-sm">
                  <strong>Note:</strong> All submissions are reviewed before
                  being published. We'll verify the information and may reach
                  out for additional details.
                </span>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-8">
                <button className="btn btn-primary btn-lg">
                  Submit Cafe for Review
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-primary text-lg">
                  How long does review take?
                </h3>
                <p className="text-base-content/70">
                  Usually 1-3 business days. We verify the location and check
                  that it meets our coworking criteria.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-primary text-lg">
                  What makes a good coworking cafe?
                </h3>
                <p className="text-base-content/70">
                  Reliable WiFi, comfortable seating, adequate power outlets,
                  and a welcoming atmosphere for laptop users.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-primary text-lg">
                  Can I submit multiple cafes?
                </h3>
                <p className="text-base-content/70">
                  Absolutely! We appreciate multiple submissions, especially if
                  you're a local expert or frequent traveler.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-primary text-lg">
                  Do you accept international submissions?
                </h3>
                <p className="text-base-content/70">
                  Yes! We're building a global directory and welcome submissions
                  from anywhere in the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-primary text-primary-content mt-16">
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
