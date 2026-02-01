import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Dashboard from "./pages/DashBoard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Result from "./pages/Result";

import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Sign />} />

        {/* PRIVATE */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoutes>
              <Upload />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoutes>
              <History />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoutes>
              <Result />
            </ProtectedRoutes>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
