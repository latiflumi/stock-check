import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-slate-100 text-slate-800
        dark:bg-[#0b132b] dark:text-gray-200
        transition-colors
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-80 p-6 space-y-4 rounded-lg shadow
          bg-white border border-gray-200
          dark:bg-[#101935] dark:border-white/10
        "
      >
        <h1 className="text-xl font-semibold text-center">
          Login
        </h1>

        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
            w-full rounded-md p-2
            border border-gray-300
            bg-white text-slate-800
            focus:outline-none focus:ring-2 focus:ring-slate-400
            dark:bg-[#0b132b] dark:text-gray-200
            dark:border-white/10 dark:focus:ring-slate-600
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full rounded-md p-2
            border border-gray-300
            bg-white text-slate-800
            focus:outline-none focus:ring-2 focus:ring-slate-400
            dark:bg-[#0b132b] dark:text-gray-200
            dark:border-white/10 dark:focus:ring-slate-600
          "
        />

        <button
          type="submit"
          className="
            w-full py-2 rounded-md font-medium
            bg-slate-900 text-white
            hover:bg-slate-800
            dark:bg-slate-200 dark:text-slate-900
            dark:hover:bg-white
            transition-colors
          "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
