import { Input } from "./components/InputComponent";
import { Button } from "./components/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";
import axios from "axios";

export function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const responses = await axios.post(BACKEND_URL + "/api/v1/signin", {
      email,
      password,
    });
    console.log(responses);
    const jwt = responses.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  }

  return (
    <div className="h-screen w-full bg-linear-to-r from-slate-200 to-purple-400">
      <div className="flex justify-center items-center p-8">
        <h1 className="font-mono text-purple-900 text-4xl ">
          Welcome To Second Brain!
        </h1>
      </div>
      <div className=" flex justify-center items-center pt-10">
        <div className="bg-slate-200 rounded-2xl p-5 min-w-48">
          <Input placeholder="Email" reference={emailRef} />
          <Input placeholder="Password" reference={passwordRef} />
          <div className="flex justify-center">
            <Button variants="primary" innertext="Signin" onClick={signin} />
          </div>
        </div>
      </div>
    </div>
  );
}
