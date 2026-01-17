import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        flex items-center justify-center
        rounded-md
        px-2
        text-slate-600 hover:text-slate-800
        hover:bg-slate-200/60
        transition
        dark:text-gray-300
        dark:hover:text-white
        dark:hover:bg-white/10
      "
    >
      {theme === "dark" ? (
        <FiSun className="text-sm" />
      ) : (
        <FiMoon className="text-sm" />
      )}

      <span className="whitespace-nowrap text-xs opacity-80 p-2">
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
