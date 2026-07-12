import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchChapters } from "../lib/content.js";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const results = open ? searchChapters(q) : [];

  useEffect(() => {
    const onClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 ring-1 ring-transparent focus-within:ring-zinc-400 dark:bg-zinc-800 dark:focus-within:ring-zinc-500">
        <Search size={15} className="shrink-0 text-zinc-400" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="搜尋章節…"
          className="w-28 bg-transparent text-sm outline-none placeholder:text-zinc-400 sm:w-44"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="清除搜尋">
            <X size={14} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200" />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
          {results.length === 0 && (
            <div className="px-4 py-3 text-sm text-zinc-400">找不到「{q}」</div>
          )}
          {results.map(({ chapter, snippet }) => (
            <Link
              key={chapter.id}
              to={`/ch/${chapter.id}`}
              onClick={() => {
                setOpen(false);
                setQ("");
              }}
              className="block border-b border-zinc-100 px-4 py-2.5 last:border-0 hover:bg-zinc-50 dark:border-zinc-700/60 dark:hover:bg-zinc-700/40"
            >
              <div className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                {chapter.label}　{chapter.title}
              </div>
              <div className="mt-0.5 truncate text-xs text-zinc-400">…{snippet}…</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
