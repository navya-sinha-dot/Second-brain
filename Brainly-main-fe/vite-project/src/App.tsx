import { Signup } from "./Auth";
import { Dashboard } from "./dashboard";
import { Signin } from "./Auth_Signin";
import { LandingPage } from "./LandingPage";
import { AuthGuard } from "./components/AuthGuard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ErrorPage } from "./Error";
import SharePage from "./sharepage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          ></Route>
          <Route path="/share/:hash" element={<SharePage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
