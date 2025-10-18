import { useNavigate } from "react-router-dom";
import { Button } from "./components/Button";
import { BrainIcon } from "./Icons/BrainIcon";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BrainIcon className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-800">
              Second Brain
            </span>
          </div>
          <div className="space-x-4">
            <Button
              variants="secondary"
              innertext="Sign In"
              onClick={() => navigate("/signin")}
            />
            <Button
              variants="primary"
              innertext="Get Started"
              onClick={() => navigate("/signup")}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Your Digital
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                {" "}
                Second Brain
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Organize, store, and access your knowledge effortlessly. Build
              your personal knowledge base with our intuitive platform.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variants="primary"
                innertext="Start Building"
                onClick={() => navigate("/signup")}
                className="px-8 py-4 text-lg"
              />
              <Button
                variants="secondary"
                innertext="Learn More"
                onClick={() => {
                  // Scroll to features section
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 text-lg"
              />
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BrainIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Organization
              </h3>
              <p className="text-gray-600">
                Automatically categorize and organize your content for easy
                retrieval.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Find what you need instantly with our powerful search and
                filtering system.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Easy Sharing
              </h3>
              <p className="text-gray-600">
                Share your knowledge with others or keep it private - you're in
                control.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Build Your Second Brain?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who are already organizing their knowledge
              better.
            </p>
            <Button
              variants="secondary"
              innertext="Get Started Free"
              onClick={() => navigate("/signup")}
              className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-blue-50"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BrainIcon className="w-6 h-6" />
            <span className="text-xl font-bold">Second Brain</span>
          </div>
          <p className="text-gray-400">
            © 2024 Second Brain. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
