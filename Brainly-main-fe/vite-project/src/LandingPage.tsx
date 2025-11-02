import { useNavigate } from "react-router-dom";
import { Button } from "./components/Button";
import { BrainIcon } from "./Icons/BrainIcon";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import illustration2 from "./assets/illustration2.svg";

export function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900">
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BrainIcon />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                Second Brain
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8 font-medium">
              {["Features", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(item.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item}
                </a>
              ))}
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
                className="px-6 py-2.5 font-medium shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition"
              >
                {!isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg rounded-b-lg"
            >
              {["Features", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document
                      .getElementById(item.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item}
                </a>
              ))}
              <div className="p-4 space-y-2">
                <Button
                  variants="secondary"
                  innertext="Sign In"
                  onClick={() => {
                    navigate("/signin");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-center"
                />
                <Button
                  variants="primary"
                  innertext="Get Started"
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-center"
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      <main className="px-6">
        <div className="max-w-7xl mx-auto">
          <section className="min-h-[80vh] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 lg:px-32 bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-full md:w-1/2 text-center md:text-left space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Digital{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  Second Brain
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
                Organize, store, and access your knowledge effortlessly with a
                system that grows with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  variants="primary"
                  innertext="Start Building"
                  onClick={() => navigate("/signup")}
                  className="px-8 py-4 text-lg"
                />
                <Button
                  variants="secondary"
                  innertext="Learn More"
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 text-lg"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0"
            >
              <img
                src={illustration2}
                alt="Second Brain Illustration"
                className="w-64 sm:w-80 md:w-[360px] lg:w-[400px] drop-shadow-lg"
              />
            </motion.div>
          </section>

          <div
            id="features"
            className="grid md:grid-cols-3 gap-10 mb-24 text-center mt-20"
          >
            {[
              {
                title: "Smart Organization",
                desc: "Automatically categorize and organize your content for easy retrieval.",
                icon: <BrainIcon />,
              },
              {
                title: "Lightning Fast",
                desc: "Find what you need instantly with our powerful search and filtering system.",
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                ),
              },
              {
                title: "Easy Sharing",
                desc: "Share your knowledge with others or keep it private — you're in control.",
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342A3 3 0 119 12m0 0l6.632 3.316m-6.632-6L15.632 6"
                    />
                  </svg>
                ),
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="flex justify-center mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-14 text-center text-white shadow-lg"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Build Your Second Brain?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of creators organizing their ideas effortlessly.
            </p>
            <Button
              variants="secondary"
              innertext="Github"
              onClick={() =>
                window.open(
                  "https://github.com/navya-sinha-dot/Second-brain",
                  "_blank"
                )
              }
              className="px-8 py-4 text-lg bg-white text-blue-700 hover:bg-blue-50 flex justify-center items-center mx-auto"
            />
          </motion.div>
        </div>
      </main>

      <footer className="bg-blue-950 text-white py-10 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <div className="flex justify-center items-center space-x-2">
            <BrainIcon />
            <span className="text-lg font-semibold">Second Brain</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Second Brain. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
