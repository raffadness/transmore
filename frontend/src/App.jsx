import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));
const DetailProduct = lazy(() => import("./pages/DetailProduct"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-4xl mb-2 animate-bounce flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
              </div>
              <div className="text-lg text-gray-600">Loading</div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/detailProduct/:id" element={<DetailProduct />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
