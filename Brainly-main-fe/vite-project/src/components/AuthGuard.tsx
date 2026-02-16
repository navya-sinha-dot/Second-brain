import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        navigate("/signin");
      } else {
        // You can add token validation here if needed
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-neo-bg flex items-center justify-center">
        <div className="animate-spin h-12 w-12 neo-border border-t-neo-blue"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to signin
  }

  return <>{children}</>;
}
