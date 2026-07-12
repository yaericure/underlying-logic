import { Github, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox.jsx";

const GITHUB_URL = "https://github.com/yaericure/underlying-logic";

export default function Navbar({ onMenuToggle }) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/85">
      <div className="mx-auto flex h-14 max-w-[90rem] items-center gap-3 px-4 lg:px-6">
        <button
          className="rounded-lg p-2 hover:bg-zinc-100 lg:hidden dark:hover:bg-zinc-800"
          onClick={onMenuToggle}
          aria-label="開關目錄"
        >
          <Menu size={20} />
        </button>

        <a href="#/" className="flex items-baseline gap-2 whitespace-nowrap">
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-400 bg-clip-text text-lg font-extrabold tracking-widest text-transparent dark:from-zinc-50 dark:via-zinc-300 dark:to-zinc-500">
            底層邏輯
          </span>
          <span className="hidden text-xs tracking-[.2em] text-zinc-400 sm:inline">教學導讀</span>
        </a>

        <div className="ml-auto flex items-center gap-1.5">
          <SearchBox />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <Github size={19} />
          </a>
          <button
            onClick={() => setDark((v) => !v)}
            aria-label="切換深淺色"
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
