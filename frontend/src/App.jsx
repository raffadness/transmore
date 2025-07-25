import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));
const DetailProduct = lazy(() => import("./pages/DetailProduct"));
import ProtectedRoute from "./components/ProtectedRoute";

const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
  }, []);

  return { isAdmin };
};

export default function App() {
  const { isAdmin } = useAuth();
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute isAdmin={isAdmin} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/detailProduct/:id" element={<DetailProduct />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
