import { Input } from "./components/InputComponent";
import { Button } from "./components/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";

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
          {success && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          <Input placeholder="Name" reference={nameRef} />
          <Input placeholder="Email" reference={emailRef} />
          <Input placeholder="Password" type="password" reference={passwordRef} />
          <div className="flex justify-center mb-4">
            <Button
              variants="primary"
              innertext={isLoading ? "Creating Account..." : "Sign Up"}
              onClick={signup}
              disabled={isLoading}
            />
          </div>
          <div className="text-center">
            <p className="text-blue-700 mb-2">Already have an account?</p>
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
