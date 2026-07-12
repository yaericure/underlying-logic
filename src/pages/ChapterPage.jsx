import { lazy, Suspense, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import PrevNext from "../components/PrevNext.jsx";

// Markdown 渲染鏈(react-markdown+highlight)佔 bundle 大宗,拆出主 chunk
const Markdown = lazy(() => import("../components/Markdown.jsx"));
import Toc from "../components/Toc.jsx";
import { extractToc, getChapter, prevNext } from "../lib/content.js";

export default function ChapterPage({ id }) {
  const chapter = getChapter(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!chapter) return <Navigate to="/" replace />;

  const toc = extractToc(chapter.body);
  const { prev, next } = prevNext(id);

  return (
    <div className="flex min-w-0 flex-1">
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12">
        <Breadcrumbs chapter={chapter} />

        <div className="mb-8">
          <div className="text-sm font-medium tracking-[.25em] text-zinc-400">{chapter.label}</div>
          <h1 className="mt-1.5 text-3xl font-bold tracking-wide text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {chapter.title}
          </h1>
          <div className="mt-4 h-1.5 w-36 rounded-full bg-gradient-to-r from-fuchsia-600 via-fuchsia-400 to-fuchsia-200 dark:from-fuchsia-400 dark:via-fuchsia-500 dark:to-fuchsia-900" />
        </div>

        <Suspense fallback={<div className="py-16 text-center text-sm text-zinc-400">載入中…</div>}>
          <Markdown>{chapter.body}</Markdown>
        </Suspense>

        <PrevNext prev={prev} next={next} />

        <footer className="mt-10 pb-4 text-xs leading-relaxed text-zinc-400">
          本站為《底層邏輯:看清這個世界的底牌》(劉潤 著,時報出版)的教學導讀筆記,內容為重點整理與延伸解說,並非原書全文。完整內容請支持正版書籍。
        </footer>
      </main>

      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 pr-6 xl:block">
        <Toc items={toc} />
      </aside>
    </div>
  );
}
