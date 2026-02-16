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
        return;
      }

      const responses = await axios.post(BACKEND_URL + "/api/v1/signin", {
        email,
        password,
      });

      const jwt = responses?.data?.token;
      const message = responses?.data?.message;

      if (jwt) {
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
      } else {
        setError(message || "Incorrect credentials. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Sign in failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full bg-neo-bg flex flex-col items-center justify-center p-4">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-black hover:bg-neo-blue p-2 neo-border mb-6 font-black transition-all uppercase tracking-tighter text-sm neo-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </button>

      <div className="bg-neo-white neo-border p-10 w-full max-w-md shadow-neo-lg text-center my-auto">
        <h2 className="text-4xl font-black text-black mb-6 uppercase tracking-tighter">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-400 neo-border text-black font-bold p-3 mb-6 uppercase text-sm tracking-tight text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2 mb-6 text-left">
          <Input placeholder="Email" reference={emailRef} />
          <Input placeholder="Password" type="password" reference={passwordRef} />
        </div>

        <div className="mt-4 mb-8">
          <div className="flex justify-center items-center">
            <Button
              variants="primary"
              innertext={isLoading ? "Signing In..." : "Sign In"}
              onClick={signin}
              disabled={isLoading}
              className="w-full py-4 text-lg"
            />
          </div>
        </div>

        <p className="text-black font-bold uppercase tracking-tight text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-black hover:bg-neo-yellow px-1 neo-border border-transparent hover:border-black transition-all underline decoration-2 underline-offset-4"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
