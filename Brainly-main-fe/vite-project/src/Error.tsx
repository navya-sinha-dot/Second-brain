import { useNavigate } from "react-router-dom";
import { Button } from "./components/Button";

export function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full bg-neo-bg flex flex-col items-center justify-center p-4">
      <div className="neo-card bg-neo-pink shadow-neo-lg text-center p-12 max-w-lg rotate-2">
        <h1 className="text-8xl font-black text-black mb-4 uppercase tracking-tighter">404</h1>
        <h2 className="text-3xl font-black text-black mb-6 uppercase tracking-tight">Brain Not Found</h2>
        <p className="text-lg font-bold text-black mb-10 uppercase">
          Looks like you've wandered into an empty part of the brain.
        </p>
        <Button
          variants="primary"
          innertext="Back to Reality"
          onClick={() => navigate("/")}
          className="w-full bg-black text-white hover:bg-gray-900 border-none py-4 text-xl"
        />
      </div>
    </div>
  );
}
