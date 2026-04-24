import { Input } from "./components/InputComponent";
import { Button } from "./components/Button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function signin() {
    setIsLoading(true);
    setError("");

    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      if (!email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      const responses = await axios.post(BACKEND_URL + "/api/v1/signin", {
        email,
        password,
      });

      const jwt = responses?.data?.token;

      if (jwt) {
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
      } else {
        setError(responses?.data?.message || "Incorrect credentials");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex">
      {/* Left side - Visual/Info */}
      <div className="hidden lg:flex flex-1 bg-neo-dark-blue p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group w-fit"
          >
            <div className="text-white group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-black text-white uppercase tracking-widest">Second Brain</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight tracking-tight uppercase">
            Connect your <br />
            <span className="text-blue">knowledge.</span>
          </h2>
          <p className="text-xl text-blue-100 font-medium leading-relaxed font-sans">
            Log in to access your curated library of ideas and resources.
          </p>
        </div>


      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-slate-50/30">
        <div className="w-full max-w-md space-y-10">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-black text-neo-dark-blue uppercase tracking-tight">Welcome Back</h1>
            <p className="text-neo-gray font-medium">Continue building your second brain.</p>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm font-bold p-4 rounded-2xl border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-neo-gray/60 uppercase tracking-widest ml-1">Email Address</label>
                <Input placeholder="name@company.com" reference={emailRef} />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-neo-gray/60 uppercase tracking-widest ml-1">Password</label>
                <Input placeholder="••••••••" type="password" reference={passwordRef} />
              </div>
            </div>

            <Button
              variants="primary"
              innertext={isLoading ? "Signing in..." : "Sign In"}
              onClick={signin}
              disabled={isLoading}
              className="w-full py-4 text-base shadow-xl shadow-blue-100"
            />
          </div>

          <p className="text-center text-sm font-medium text-neo-gray">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-neo-blue font-bold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
