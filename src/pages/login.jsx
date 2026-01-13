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
      setError(err.response?.data?.message || "Wrong credentials");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center
        bg-slate-100 text-slate-800
        dark:bg-[#0b132b] dark:text-gray-200
        transition-colors
      "
    >
      
          {error && (
          <div className="max-w-xl mb-4">
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 text-sm dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </div>
          </div>
        )}  
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
