import { useEffect, useState } from "react";

export default function Toc({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean);
    if (!headings.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="本頁目錄" className="text-[13px]">
      <div className="mb-3 font-semibold tracking-widest text-zinc-900 dark:text-zinc-100">
        本頁目錄
      </div>
      <ul className="space-y-1.5 border-l border-zinc-200 dark:border-zinc-800">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`-ml-px block border-l-2 py-0.5 leading-snug transition-colors ${
                it.depth === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === it.id
                  ? "border-fuchsia-500 font-medium text-fuchsia-700 dark:border-fuchsia-400 dark:text-fuchsia-300"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
