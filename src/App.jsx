import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ChapterPage from "./pages/ChapterPage.jsx";
import { chapters } from "./lib/content.js";
import { useState } from "react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      <Navbar onMenuToggle={() => setSidebarOpen((v) => !v)} />
      <div className="mx-auto flex max-w-[90rem]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Routes>
          <Route path="/" element={<Navigate to={`/ch/${chapters[0].id}`} replace />} />
          <Route path="/ch/:id" element={<ChapterRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function ChapterRoute() {
  const { id } = useParams();
  return <ChapterPage key={id} id={id} />;
}
