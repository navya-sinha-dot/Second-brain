import { Input } from "./components/InputComponent";
import { Button } from "./components/Button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import illustration3 from "./assets/brain-sides-amico.svg";

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
    <div className="h-screen w-full bg-gradient-to-r from-white to-blue-100 flex flex-col items-center justify-center">
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate("/")}
        className="flex items-center text-blue-700 hover:text-blue-900 mb-6 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 14 }}
        className="bg-white rounded-2xl p-10 w-96 shadow-lg border border-blue-100 text-center"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Welcome Back</h2>
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <img src={illustration3} className="w-32 h-32" />
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          >
            {error}
          </motion.div>
        )}

        <Input placeholder="Email" reference={emailRef} />
        <Input placeholder="Password" type="password" reference={passwordRef} />

        <motion.div whileTap={{ scale: 0.97 }} className="mt-4 mb-6">
          <div className="flex justify-center items-center">
            <Button
              variants="primary"
              innertext={isLoading ? "Signing In..." : "Sign In"}
              onClick={signin}
              disabled={isLoading}
            />
          </div>
        </motion.div>

        <p className="text-blue-700">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
}
