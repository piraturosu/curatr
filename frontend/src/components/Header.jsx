import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="bg-background dark:bg-background-dark text-gray-900 dark:text-gray-100 border-b border-border dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-black dark:text-logo text-2xl font-bold">
            Curatr
          </h1>
        </Link>
        <nav className="flex gap-6 items-center">
          <Link
            to="/exhibition"
            className="hover:text-accent dark:hover:text-accent-dark transition"
          >
            Exhibitions
          </Link>
        </nav>
      </div>
    </header>
  );
}
