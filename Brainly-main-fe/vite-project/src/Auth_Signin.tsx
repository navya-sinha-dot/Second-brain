import { Input } from "./components/InputComponent";
import { Button } from "./components/Button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";
import axios from "axios";

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

      const responses = await axios.post(BACKEND_URL +"/api/v1/signin", {
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
    <div className="h-screen w-full bg-gradient-to-r from-white to-blue-100">
      <div className="flex justify-center items-center p-8">
        <h1 className="font-mono text-blue-900 text-4xl ">
          Welcome To Second Brain!
        </h1>
      </div>
      <div className=" flex justify-center items-center pt-10">
        <div className="bg-white rounded-2xl p-8 min-w-80 shadow-lg border border-blue-100">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <Input placeholder="Email" reference={emailRef} />
          <Input placeholder="Password" type="password" reference={passwordRef} />
          <div className="flex justify-center mb-4">
            <Button
              variants="primary"
              innertext={isLoading ? "Signing In..." : "Sign In"}
              onClick={signin}
              disabled={isLoading}
            />
          </div>
          <div className="text-center">
            <p className="text-blue-700 mb-2">Don't have an account?</p>
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Sign up here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
