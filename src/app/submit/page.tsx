import Link from "next/link";

export const metadata = {
  title: "Submit a Cafe | cafeco.works",
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

          <form className="space-y-8">
            {/* Basic Info */}
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

            {/* Description */}
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

            {/* Features */}
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

            {/* Contact */}
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

            {/* Notice */}
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

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button className="btn btn-primary btn-lg px-12 font-medium rounded-2xl">
                Submit Cafe for Review
              </button>
            </div>
          </form>
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
