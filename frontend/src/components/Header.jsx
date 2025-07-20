import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  User2,
  LayoutDashboard,
  Settings,
  FileText,
  Users,
} from "lucide-react";
import Transmore from "../assets/Transmore.jsx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const profileRef = useRef();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const toggleProfile = () => setIsProfileOpen((v) => !v);

  // Menu items
  const adminMenu = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Users", href: "/admin/users", icon: <Users size={18} /> },
    { label: "Reports", href: "/admin/reports", icon: <FileText size={18} /> },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: <Settings size={18} />,
    },
  ];
  const userMenu = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: <FileText size={18} />,
    },
    { label: "Reports", href: "/reports", icon: <FileText size={18} /> },
    { label: "Settings", href: "/settings", icon: <Settings size={18} /> },
  ];
  const menu = user?.role === "admin" ? adminMenu : userMenu;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span>
                <Transmore className="w-20 fill-blue-500" />
              </span>
              {user?.role === "admin" && (
                <span className="ml-2 px-2 py-0.5 rounded bg-red-100 text-red-600 text-xs font-semibold">
                  Admin
                </span>
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user &&
              menu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
          </nav>

          {/* Profile/Account */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-800 text-sm font-medium max-w-[120px] truncate">
                    {user.email}
                  </span>
                  <ChevronDown size={18} className="text-gray-400" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="font-medium text-gray-800 text-sm">
                        {user.email}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <a
                  href="/login"
                  className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                >
                  Register
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {user &&
                menu.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
              {/* Mobile User Section */}
              {user ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600  px-3 py-2 rounded-md text-base font-medium transition duration-200"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <a
                    href="/login"
                    className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="bg-blue-500 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition duration-200 mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
