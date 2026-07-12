import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function NavCard({ ch, dir }) {
  if (!ch) return <div className="flex-1" />;
  const isPrev = dir === "prev";
  return (
    <Link
      to={`/ch/${ch.id}`}
      className={`group flex flex-1 items-center gap-3 rounded-xl border border-zinc-200 p-4 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/60 ${
        isPrev ? "" : "flex-row-reverse text-right"
      }`}
    >
      {isPrev ? (
        <ArrowLeft size={18} className="shrink-0 text-zinc-400 transition-transform group-hover:-translate-x-0.5" />
      ) : (
        <ArrowRight size={18} className="shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
      )}
      <div>
        <div className="text-xs text-zinc-400">{isPrev ? "上一章" : "下一章"}</div>
        <div className="mt-0.5 text-sm font-medium text-zinc-800 dark:text-zinc-100">
          {ch.label}　{ch.title}
        </div>
      </div>
    </Link>
  );
}

export default function PrevNext({ prev, next }) {
  return (
    <div className="mt-14 flex gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <NavCard ch={prev} dir="prev" />
      <NavCard ch={next} dir="next" />
    </div>
  );
}
