import Link from "next/link";

export const metadata = {
  title: "Submit a Cafe | cafecoworks",
  description:
    "Submit your favorite coworking cafe to help other remote workers find great workspaces.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Coffee Breadcrumbs */}
      <div className="px-6 py-4 bg-coffee-cream">
        <div className="text-sm breadcrumbs breadcrumbs-coffee">
          <ul>
            <li>
              <Link href="/" className="text-coffee-900 hover:underline">
                Home
              </Link>
            </li>
            <li className="text-coffee-warm">Submit Cafe</li>
          </ul>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 coffee-gradient rounded-3xl p-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-coffee-900 mb-6 text-display">
            Submit a Coworking Cafe
          </h1>
          <p className="text-xl text-coffee-warm max-w-2xl mx-auto leading-relaxed">
            Know a great cafe that&rsquo;s perfect for remote work? Help other
            digital nomads discover amazing workspaces around the world.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="card-coffee p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">☕</span>
            </div>
            <h3 className="text-lg font-bold text-coffee-900 mb-2">
              Great Coffee
            </h3>
            <p className="text-sm text-coffee-warm">
              Quality coffee and welcoming atmosphere
            </p>
          </div>
          <div className="card-coffee p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">📶</span>
            </div>
            <h3 className="text-lg font-bold text-coffee-900 mb-2">
              Reliable WiFi
            </h3>
            <p className="text-sm text-coffee-warm">
              Strong internet for productive work
            </p>
          </div>
          <div className="card-coffee p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">💺</span>
            </div>
            <h3 className="text-lg font-bold text-coffee-900 mb-2">
              Comfortable Seating
            </h3>
            <p className="text-sm text-coffee-warm">
              Spaces designed for long work sessions
            </p>
          </div>
        </div>

        {/* Submit Form */}
        <div className="card-coffee p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-coffee-900 mb-8 text-center text-display">
            Cafe Submission Form
          </h2>

          {/* Coming Soon Placeholder */}
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">��</span>
            </div>
            <h3 className="text-2xl font-bold text-coffee-900 mb-4">
              Coming Soon!
            </h3>
            <p className="text-lg text-coffee-warm mb-8 max-w-2xl mx-auto leading-relaxed">
              We're working hard to build the submission form. In the meantime,
              you can check out our GitHub repository to see the project in
              development and contribute to the codebase.
            </p>
            <a
              href="https://github.com/lucasnevespereira/cafecoworks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg px-8 font-medium rounded-2xl inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>

          {/* <form className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-coffee-900 border-b border-coffee-200 pb-2">
                Basic Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-coffee-900 mb-2">
                    Cafe Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="The Coffee House"
                    className="input input-bordered w-full rounded-xl border-coffee-300 focus:border-coffee-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-900 mb-2">
                    City <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="San Francisco"
                    className="input input-bordered w-full rounded-xl border-coffee-300 focus:border-coffee-700"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-coffee-900 mb-2">
                    Country <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="United States"
                    className="input input-bordered w-full rounded-xl border-coffee-300 focus:border-coffee-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-900 mb-2">
                    Website <span className="text-coffee-warm">(optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="input input-bordered w-full rounded-xl border-coffee-300 focus:border-coffee-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">
                  Full Address <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="123 Main Street, San Francisco, CA 94102"
                  className="input input-bordered w-full rounded-xl border-coffee-300 focus:border-coffee-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-coffee-900 border-b border-coffee-200 pb-2">
                Description
              </h3>
              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">
                  What makes this cafe great for remote work?{" "}
                  <span className="text-error">*</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32 rounded-xl border-coffee-300 focus:border-coffee-700 resize-none"
                  placeholder="Describe the atmosphere, WiFi quality, seating options, noise level, power outlets, and what makes this place special for remote workers..."
                  required
                ></textarea>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-coffee-900 border-b border-coffee-200 pb-2">
                Features
              </h3>
              <p className="text-sm text-coffee-warm mb-4">
                Select all features that apply to this cafe
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: "wifi", label: "Fast WiFi", emoji: "📶" },
                  { id: "outlets", label: "Power Outlets", emoji: "🔌" },
                  { id: "quiet", label: "Quiet Environment", emoji: "🤫" },
                  { id: "spacious", label: "Spacious Seating", emoji: "🪑" },
                  { id: "outdoor", label: "Outdoor Seating", emoji: "🌳" },
                  { id: "calls", label: "Phone Calls OK", emoji: "📞" },
                  { id: "meetings", label: "Meeting Friendly", emoji: "👥" },
                  { id: "247", label: "Extended Hours", emoji: "🕐" },
                  { id: "food", label: "Food Available", emoji: "🥐" },
                  { id: "parking", label: "Parking Available", emoji: "🅿️" },
                  { id: "student", label: "Student Friendly", emoji: "🎓" },
                  { id: "coworking", label: "Coworking Space", emoji: "💻" },
                ].map((feature) => (
                  <label
                    key={feature.id}
                    className="flex items-center gap-3 p-3 border border-coffee-200 rounded-xl hover:bg-coffee-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="text-lg">{feature.emoji}</span>
                    <span className="text-sm font-medium text-coffee-900">
                      {feature.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-coffee-900 border-b border-coffee-200 pb-2">
                Contact Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">
                  Your Email{" "}
                  <span className="text-coffee-warm">
                    (for follow-up questions)
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="input input-bordered w-full rounded-xl border-coffee-300 focus:border-coffee-700"
                />
                <p className="text-sm text-coffee-warm mt-2">
                  We&rsquo;ll only use this to contact you about your submission
                </p>
              </div>
            </div>

            <div className="bg-cream-100 border border-coffee-200 rounded-2xl p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-golden-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">ℹ️</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-coffee-900 mb-2">
                    Review Process
                  </h4>
                  <p className="text-sm text-coffee-warm">
                    All submissions are reviewed within 1-3 business days. We
                    verify locations and check that they meet our coworking
                    criteria before publishing.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button className="btn btn-primary btn-lg px-12 font-medium rounded-2xl">
                Submit Cafe for Review
              </button>
            </div>
          </form> */}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12 text-display">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "How long does the review take?",
                a: "Usually 1-3 business days. We verify the location and check that it meets our coworking criteria.",
              },
              {
                q: "What makes a good coworking cafe?",
                a: "Reliable WiFi, comfortable seating, adequate power outlets, and a welcoming atmosphere for laptop users.",
              },
              {
                q: "Can I submit multiple cafes?",
                a: "Absolutely! We appreciate multiple submissions, especially from local experts and frequent travelers.",
              },
              {
                q: "Do you accept international submissions?",
                a: "Yes! We're building a global directory and welcome submissions from anywhere in the world.",
              },
            ].map((faq, index) => (
              <div key={index} className="card-coffee p-8">
                <h3 className="text-lg font-bold text-coffee-900 mb-3">
                  {faq.q}
                </h3>
                <p className="text-coffee-warm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
