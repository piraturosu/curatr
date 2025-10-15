import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth"; // adjust path if needed
import { Button } from "../components/Button"; // uses your reusable button

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token, user } = await loginUser({ username, password });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/exhibition"); // Go to exhibition page after login
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white dark:bg-sidebar-dark shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800 dark:text-white">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded w-full transition focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded w-full transition focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-xs text-gray-500 text-center dark:text-gray-400">
          Don't have an account yet? (Register coming soon)
        </p>
      </form>
    </div>
  );
}
