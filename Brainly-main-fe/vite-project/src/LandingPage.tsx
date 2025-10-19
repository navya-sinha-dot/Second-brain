import { useNavigate } from "react-router-dom";
import { Button } from "./components/Button";
import { BrainIcon } from "./Icons/BrainIcon";
import { useState } from "react";

export function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
   
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center space-x-3">
              <div>
                <BrainIcon/>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                Second Brain
              </span>
            </div>

            
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Features
              </a>
              <a 
                href="#about" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Contact
              </a>
            </nav>

          
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variants="secondary"
                innertext="Sign In"
                onClick={() => navigate("/signin")}
                className="px-6 py-2.5 font-medium"
              />
              <Button
                variants="primary"
                innertext="Get Started"
                onClick={() => navigate("/signup")}
                className="px-6 py-2.5 font-medium shadow-lg hover:shadow-xl transition-shadow duration-200"
              />
            </div>

            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

        
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg rounded-b-lg">
                <a 
                  href="#features" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Features
                </a>
                <a 
                  href="#about" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="pt-4 pb-2 space-y-2">
                  <Button
                    variants="secondary"
                    innertext="Sign In"
                    onClick={() => {
                      navigate("/signin");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-center px-4 py-2.5 font-medium"
                  />
                  <Button
                    variants="primary"
                    innertext="Get Started"
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-center px-4 py-2.5 font-medium"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      
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

          
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div >
                <BrainIcon />
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


      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div >
            <BrainIcon/>
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
