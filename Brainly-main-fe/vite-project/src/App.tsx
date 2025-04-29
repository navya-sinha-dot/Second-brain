import { Signup } from "./Auth";
import { Dashboard } from "./dashboard";
import { Signin } from "./Auth_Signin";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ErrorPage } from "./Error";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
