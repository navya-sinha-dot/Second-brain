import { useNavigate } from "react-router-dom";
import { Button } from "./components/Button";
import { GraduationCap, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Illustration2 from "./assets/image.png";

export function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#1a2b3b] font-sans selection:bg-blue-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 sm:px-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="text-neo-blue">
              <GraduationCap size={32} />
            </div>
            <span className="text-xl font-black uppercase tracking-widest text-neo-dark-blue">
              Second Brain
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-12 text-sm font-bold uppercase tracking-widest text-neo-gray">
            {["Features", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-neo-blue transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigate("/signin")}
              className="text-sm font-bold text-neo-gray hover:text-neo-blue uppercase tracking-widest"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-neo-blue text-white rounded-full text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all"
            >
              Get Started
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neo-text"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-xl">
            {["Features", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-semibold text-neo-text p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-50">
              <Button variants="secondary" innertext="Sign In" onClick={() => navigate("/signin")} className="w-full" />
              <Button variants="primary" innertext="Get Started" onClick={() => navigate("/signup")} className="w-full bg-neo-dark-blue" />
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        <section className="relative overflow-hidden py-24 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-10 text-center lg:text-left">

              <h1 className="text-4xl md:text-6xl font-black text-neo-dark-blue leading-[1.05] tracking-tight uppercase">
                STORE YOUR <br />
                KNOWLEDGE
              </h1>
              <p className="text-xl md:text-2xl text-neo-gray font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Organize, store, and access your ideas effortlessly with a
                brutally efficient system that grows with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
                <button
                  onClick={() => navigate("/signup")}
                  className="px-12 py-5 text-lg font-bold bg-neo-blue text-white rounded-full hover:opacity-90 transition-all shadow-xl shadow-blue-900/10 uppercase tracking-wider"
                >
                  START BUILDING
                </button>
                <button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-12 py-5 text-lg font-bold border-2 border-neo-blue text-neo-blue rounded-full hover:bg-neo-blue hover:text-white transition-all uppercase tracking-wider"
                >
                  SEE IT IN ACTION
                </button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-2xl">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-[40px] blur-2xl opacity-60"></div>
                <div className="relative bg-white rounded-3xl p-4 shadow-neo-xl border border-gray-100 flex items-center justify-center overflow-hidden aspect-[4/3]">
                  <img
                    src={Illustration2}
                    alt="Second Brain Illustration"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-slate-50/50 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-sm font-bold text-neo-blue uppercase tracking-widest">Capabilities</h2>
              <p className="text-4xl md:text-5xl font-bold text-neo-dark-blue tracking-tight font-serif italic">Powerful Features</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Categorization",
                  desc: "Automatically organize your notes, videos, and PDFs with intelligent tagging and folders.",
                  icon: <CheckCircle2 className="text-neo-blue" size={28} />,
                },
                {
                  title: "Lightning Fast Search",
                  desc: "Our optimized indexing allows you to find any piece of information in milliseconds.",
                  icon: <CheckCircle2 className="text-neo-blue" size={28} />,
                },
                {
                  title: "Seamless Sync",
                  desc: "Access your knowledge base from any device, anywhere, with instant cloud synchronization.",
                  icon: <CheckCircle2 className="text-neo-blue" size={28} />,
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="neo-card flex flex-col items-start text-left gap-6 group hover:border-neo-blue/20"
                >
                  <div className="p-3 bg-blue-50 rounded-xl transition-colors group-hover:bg-neo-blue group-hover:text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neo-dark-blue">
                    {feature.title}
                  </h3>
                  <p className="text-neo-gray font-medium text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 sm:px-12 bg-white">
          <div className="max-w-4xl mx-auto rounded-[40px] bg-neo-dark-blue p-12 md:p-20 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full"></div>

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight font-serif italic">
                Ready to Organize <br /> Your Digital Life?
              </h2>
              <p className="text-lg text-blue-100/80 font-medium max-w-xl mx-auto">
                Join thousands of users who have transformed their productivity with Second Brain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  variants="primary"
                  innertext="Get Started Free"
                  onClick={() => navigate("/signup")}
                  className="px-10 py-7 text-lg bg-white text-neo-dark-blue hover:bg-gray-100 border-none shadow-lg"
                />
                <Button
                  variants="secondary"
                  innertext="Star on GitHub"
                  onClick={() => window.open("https://github.com/navya-sinha-dot/Second-brain", "_blank")}
                  className="px-10 py-7 text-lg bg-transparent border-white/20 text-white hover:bg-white/10"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-gray-100 py-20 px-6 sm:px-12 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="text-blue-600">
                  <GraduationCap size={32} />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight font-serif italic">Second Brain</span>
              </div>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                The ultimate tool for modern thinkers and builders. Organize your digital world effortlessly.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Platform</h4>
                <div className="flex flex-col gap-4 text-sm font-medium text-gray-600">
                  <a href="#" className="hover:text-blue-600">Features</a>
                  <a href="#" className="hover:text-blue-600">Pricing</a>
                  <a href="#" className="hover:text-blue-600">Integrations</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-200/60 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Second Brain. All rights reserved.
            </p>
            <div className="flex gap-8">
              {["Twitter", "GitHub", "Discord"].map(link => (
                <a key={link} href="#" className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-blue-600">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
