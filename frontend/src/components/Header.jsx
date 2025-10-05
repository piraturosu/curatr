import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="bg-background dark:bg-sidebar-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-black dark:text-logo-dark text-2xl font-bold">
          Curatr
        </h1>
        <nav className="flex items-center gap-6">
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
          <Link
            to="/profile"
            className="hover:text-accent dark:hover:text-accent-dark"
          >
            <UserIcon className="h-6 w-6 cursor-pointer" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
