import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ chapter }) {
  const partName = chapter.part === "序言" ? null : chapter.part.split(" ")[0];
  return (
    <nav aria-label="麵包屑" className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-zinc-400">
      <Link to="/" className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-200">
        <Home size={13} />
        首頁
      </Link>
      {partName && (
        <>
          <ChevronRight size={13} />
          <span>{partName}</span>
        </>
      )}
      <ChevronRight size={13} />
      <span className="font-medium text-zinc-600 dark:text-zinc-300">
        {chapter.label}　{chapter.title}
      </span>
    </nav>
  );
}
