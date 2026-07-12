// 內容載入層:讀 src/content/*.md,解析 frontmatter,建章節清單與分部樹
const raw = import.meta.glob("../content/*.md", { query: "?raw", import: "default", eager: true });

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = value;
  }
  return { data, body: text.slice(m[0].length) };
}

export const chapters = Object.entries(raw)
  .map(([path, text]) => {
    const { data, body } = parseFrontmatter(text);
    return {
      id: path.match(/(\d+)\.md$/)[1],
      title: data.title || "(無標題)",
      label: data.label || "",
      part: data.part || "",
      order: Number(data.order ?? 999),
      body,
    };
  })
  .sort((a, b) => a.order - b.order);

// 分部樹:[{ name, chapters: [...] }],序言等無部者 name 為章 label
export const parts = chapters.reduce((acc, ch) => {
  const name = ["序言", "前言", "結語"].includes(ch.part) ? null : ch.part;
  const last = acc[acc.length - 1];
  if (last && last.name === name) last.chapters.push(ch);
  else acc.push({ name, chapters: [ch] });
  return acc;
}, []);

export function getChapter(id) {
  return chapters.find((c) => c.id === id);
}

export function prevNext(id) {
  const i = chapters.findIndex((c) => c.id === id);
  return {
    prev: i > 0 ? chapters[i - 1] : null,
    next: i >= 0 && i < chapters.length - 1 ? chapters[i + 1] : null,
  };
}

// 從 markdown 抓 h2/h3 做右側 TOC;slug 與 Markdown.jsx 的 heading id 演算法一致
export function extractToc(body) {
  const items = [];
  for (const m of body.matchAll(/^(##|###)\s+(.+)$/gm)) {
    items.push({ depth: m[1].length, text: m[2].trim(), id: slugify(m[2].trim()) });
  }
  return items;
}

export function slugify(text) {
  return text.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase();
}

// 極簡全文搜尋:回傳含關鍵字的章節與前後文片段
export function searchChapters(q) {
  const query = q.trim();
  if (!query) return [];
  const out = [];
  for (const ch of chapters) {
    const hay = ch.title + "\n" + ch.body;
    const idx = hay.indexOf(query);
    if (idx !== -1) {
      const start = Math.max(0, idx - 20);
      const snippet = hay
        .slice(start, idx + query.length + 40)
        .replace(/[#>*\-\n]+/g, " ")
        .trim();
      out.push({ chapter: ch, snippet });
    }
  }
  return out.slice(0, 8);
}
