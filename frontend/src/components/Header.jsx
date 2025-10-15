import { Link, useNavigate } from "react-router-dom";
import { UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Header() {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="bg-background dark:bg-sidebar-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-black dark:text-logo-dark text-2xl font-bold">
            Curatr
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-accent dark:hover:text-accent-dark transition"
          >
            Home
          </Link>
          <Link
            to="/exhibition"
            className="hover:text-accent dark:hover:text-accent-dark transition"
          >
            My Exhibitions
          </Link>
          {user && (
            <span className="text-gray-500 dark:text-gray-300 text-sm">
              {user.username}
            </span>
          )}
          {token ? (
            <button
              onClick={handleLogout}
              className="text-red-500 text-sm border border-red-500 rounded px-2 py-1 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-sm hover:text-accent">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background dark:bg-sidebar-dark px-6 py-4 space-y-4 border-t">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-accent"
          >
            Home
          </Link>
          <Link
            to="/exhibition"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-accent"
          >
            My Exhibitions
          </Link>
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-accent"
          >
            <UserIcon className="h-5 w-5" /> Profile
          </Link>

          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-500 w-full text-left hover:text-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-accent"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
