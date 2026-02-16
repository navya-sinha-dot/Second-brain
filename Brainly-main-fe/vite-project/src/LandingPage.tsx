import { useNavigate } from "react-router-dom";
import { Button } from "./components/Button";
import { BrainIcon } from "./Icons/BrainIcon";
import { useState } from "react";
import Illustration2 from "./assets/illustration2.png";

export function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neo-bg text-black font-sans selection:bg-neo-yellow">
      <header className="sticky top-0 z-50 bg-neo-white border-b-4 border-black px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="p-2 neo-border bg-neo-pink">
              <BrainIcon />
            </div>
            <span className="text-3xl font-black uppercase tracking-tighter">
              Second Brain
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-black uppercase tracking-tight hover:bg-neo-yellow px-2 py-1 transition-colors"
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

          <div className="hidden md:flex items-center gap-4">
            <Button
              variants="secondary"
              innertext="Sign In"
              onClick={() => navigate("/signin")}
            />
            <Button
              variants="primary"
              innertext="Get Started"
              onClick={() => navigate("/signup")}
              className="bg-neo-yellow"
            />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 neo-border bg-neo-white active:translate-x-[2px] active:translate-y-[2px]"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-neo-white border-b-4 border-black p-6 flex flex-col gap-4">
            {["Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xl font-black uppercase tracking-tighter hover:bg-neo-blue p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Button variants="secondary" innertext="Sign In" onClick={() => navigate("/signin")} className="w-full" />
              <Button variants="primary" innertext="Get Started" onClick={() => navigate("/signup")} className="w-full bg-neo-yellow" />
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="py-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h1 className="text-6xl md:text-5xl font-black uppercase leading-tight tracking-tighter">
                Store Your <br />
                <span>Knowledge</span>
              </h1>
              <p className="text-xl md:text-xl font-bold max-w-xl">
                Organize, store, and access your ideas effortlessly with a
                brutally efficient system that grows with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start pt-4">
                <Button
                  variants="primary"
                  innertext="Start Building"
                  onClick={() => navigate("/signup")}
                  className="px-10 py-6 text-xl bg-neo-pink"
                />
                <Button
                  variants="secondary"
                  innertext="See it in action"
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-10 py-6 text-xl"
                />
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 neo-border"></div>
              <div className="relative neo-border bg-neo-white p-4 h-[400px] flex items-center justify-center overflow-hidden">
                <img
                  src={Illustration2}
                  alt="Second Brain Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-neo-white border-y-4 border-black px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center">
              Features
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Smart Folders",
                  desc: "Automatically categorize your brains.",
                  color: "bg-neo-blue",
                  icon: <BrainIcon />,
                },
                {
                  title: "Fast Search",
                  desc: "Find anything in milliseconds. No joke.",
                  color: "bg-neo-yellow",
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Instant Sync",
                  desc: "Your data everywhere, all at once.",
                  color: "bg-neo-green",
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`neo-card ${feature.color} p-10 flex flex-col items-center text-center gap-6 group hover:-translate-y-2 transition-transform shadow-neo-lg`}
                >
                  <div className="p-4 bg-neo-white neo-border group-hover:rotate-6 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">
                    {feature.title}
                  </h3>
                  <p className="font-bold text-lg">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto neo-card bg-neo-pink p-12 md:p-20 text-center shadow-neo-lg">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.85]">
              Ready to Get <br /> Efficient?
            </h2>
            <p className="text-xl md:text-3xl font-bold mb-12 uppercase tracking-tight">
              Join the movement. Start building now.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variants="primary"
                innertext="Sign Up Now"
                onClick={() => navigate("/signup")}
                className="px-12 py-8 text-2xl bg-black text-white hover:bg-gray-900 border-none"
              />
              <Button
                variants="secondary"
                innertext="Star on GitHub"
                onClick={() => window.open("https://github.com/navya-sinha-dot/Second-brain", "_blank")}
                className="px-12 py-8 text-2xl bg-neo-white"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neo-bg border-t-4 border-black py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="p-2 neo-border bg-neo-blue">
              <BrainIcon />
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter">Second Brain</span>
          </div>
          <p className="font-black uppercase tracking-widest text-sm">
            © {new Date().getFullYear()} Second Brain. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "GitHub", "Discord"].map(link => (
              <a key={link} href="#" className="font-black uppercase tracking-tighter text-sm hover:bg-neo-yellow px-1">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
