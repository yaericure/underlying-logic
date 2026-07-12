import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { parts } from "../lib/content.js";

function PartGroup({ part, onNavigate }) {
  const [open, setOpen] = useState(true);

  // 無部名(序言):章節直接平鋪
  if (!part.name) {
    return part.chapters.map((ch) => <ChapterLink key={ch.id} ch={ch} onNavigate={onNavigate} />);
  }

  const [partNo, ...rest] = part.name.split(" ");
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <span>
          <span className="block text-[13px] font-bold tracking-wide text-zinc-900 dark:text-zinc-100">
            {partNo}
          </span>
          <span className="block text-[11px] text-zinc-400">{rest.join(" ")}</span>
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-zinc-400 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>
      {open && (
        <div className="mt-1 space-y-0.5 border-l border-fuchsia-300/60 pl-2 dark:border-fuchsia-800/50">
          {part.chapters.map((ch) => (
            <ChapterLink key={ch.id} ch={ch} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChapterLink({ ch, onNavigate }) {
  return (
    <NavLink
      to={`/ch/${ch.id}`}
      onClick={onNavigate}
      className={({ isActive }) =>
        `block rounded-lg px-2.5 py-1.5 text-[13.5px] leading-snug transition-colors ${
          isActive
            ? "bg-fuchsia-500/15 font-semibold text-fuchsia-800 dark:bg-fuchsia-400/15 dark:text-fuchsia-300"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        }`
      }
    >
      <span className="mr-1.5 text-[11px] opacity-60">{ch.label}</span>
      {ch.title}
    </NavLink>
  );
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} aria-hidden />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto border-r border-zinc-200 bg-white px-4 pb-10 pt-20 transition-transform lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-64 lg:shrink-0 lg:translate-x-0 lg:pt-6 dark:border-zinc-800 dark:bg-zinc-900 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav>
          {parts.map((p, i) => (
            <PartGroup key={i} part={p} onNavigate={onClose} />
          ))}
        </nav>
      </aside>
    </>
  );
}
