import { Input } from "./components/InputComponent";
import { Button } from "./components/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";
import { ArrowLeft } from "lucide-react";

export function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function signup() {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const name = nameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      if (!name || !email || !password) {
        setError("Please fill in all fields");
        return;
      }

      const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
        email,
        name,
        password,
      });

      const message: string | undefined = response?.data?.message;
      if (message && message.toLowerCase().includes("signed up")) {
        setSuccess("Account created successfully! Redirecting to sign in...");
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } else if (message) {
        setError(message);
      } else {
        setError("Unexpected response from server. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Sign up failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full bg-neo-bg flex flex-col items-center justify-center p-4 overflow-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-black hover:bg-neo-blue p-2 neo-border mb-6 font-black transition-all uppercase tracking-tighter text-sm neo-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </button>

      <div className="bg-neo-white neo-border p-10 w-full max-w-md shadow-neo-lg text-center my-auto">
        <h2 className="text-4xl font-black text-black mb-6 uppercase tracking-tighter">
          Join Us
        </h2>

        {error && (
          <div className="bg-red-400 neo-border text-black font-bold p-3 mb-6 uppercase text-sm tracking-tight">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-neo-green neo-border text-black font-bold p-3 mb-6 uppercase text-sm tracking-tight">
            {success}
          </div>
        )}

        <div className="flex flex-col gap-2 mb-6">
          <Input placeholder="Name" reference={nameRef} />
          <Input placeholder="Email" reference={emailRef} />
          <Input placeholder="Password" type="password" reference={passwordRef} />
        </div>

        <div className="mt-4 mb-8">
          <div className="flex justify-center items-center">
            <Button
              variants="primary"
              innertext={isLoading ? "Creating Account..." : "Sign Up"}
              onClick={signup}
              disabled={isLoading}
              className="w-full py-4 text-lg"
            />
          </div>
        </div>

        <p className="text-black font-bold uppercase tracking-tight text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-black hover:bg-neo-yellow px-1 neo-border border-transparent hover:border-black transition-all underline decoration-2 underline-offset-4"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
