import { AlertTriangle, BookOpen, Check, Copy, Lightbulb, Rocket } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { slugify } from "../lib/content.js";

const CALLOUTS = {
  TIP: {
    icon: Lightbulb,
    label: "提示",
    cls: "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-500/10 dark:text-emerald-100",
    iconCls: "text-emerald-600 dark:text-emerald-400",
  },
  WARNING: {
    icon: AlertTriangle,
    label: "注意",
    cls: "border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-500/10 dark:text-amber-100",
    iconCls: "text-amber-600 dark:text-amber-400",
  },
  ADVANCED: {
    icon: Rocket,
    label: "進階",
    cls: "border-violet-500 bg-violet-50 text-violet-950 dark:bg-violet-500/10 dark:text-violet-100",
    iconCls: "text-violet-600 dark:text-violet-400",
  },
  NOTE: {
    icon: BookOpen,
    label: "說明",
    cls: "border-sky-500 bg-sky-50 text-sky-950 dark:bg-sky-500/10 dark:text-sky-100",
    iconCls: "text-sky-600 dark:text-sky-400",
  },
};

// 從 blockquote 子節點取出 [!TYPE] 標記;第一行若是短標籤(如「提示」)才當標題,
// 否則視為內文(有些章節把內容直接接在 [!TYPE] 之後)
function calloutType(children) {
  const arr = Array.isArray(children) ? children : [children];
  for (const child of arr) {
    const text = child?.props?.children;
    const first = Array.isArray(text) ? text[0] : text;
    if (typeof first === "string") {
      const m = first.match(/^\[!(TIP|WARNING|ADVANCED|NOTE)\]\s*([^\n]*)/);
      if (m) {
        const rest = m[2].trim();
        const isLabel = rest.length > 0 && rest.length <= 12 && !/[,。;:!?、]/.test(rest);
        return { type: m[1], title: isLabel ? rest : "" };
      }
    }
  }
  return null;
}

function Blockquote({ children }) {
  const info = calloutType(children);
  if (!info) return <blockquote>{children}</blockquote>;

  const conf = CALLOUTS[info.type];
  const Icon = conf.icon;
  // 去掉第一段裡的 [!TYPE] 標記
  const cleaned = (Array.isArray(children) ? children : [children]).map((child, i) => {
    if (!child?.props?.children) return child;
    const text = child.props.children;
    const arr = Array.isArray(text) ? text : [text];
    if (typeof arr[0] === "string" && arr[0].match(/^\[!/)) {
      // 標籤已顯示在標題列→整個第一行剝掉;內容直接接在標記後→只剝 [!TYPE] 標記
      const stripped = info.title
        ? arr[0].replace(/^\[!\w+\][^\n]*\n?/, "")
        : arr[0].replace(/^\[!\w+\]\s*/, "");
      const rest = [stripped, ...arr.slice(1)];
      return <p key={i}>{rest}</p>;
    }
    return child;
  });

  return (
    <div className={`callout my-5 max-w-[46rem] rounded-r-xl border-l-4 px-4 py-3 ${conf.cls}`}>
      <div className={`mb-1 flex items-center gap-2 text-sm font-bold ${conf.iconCls}`}>
        <Icon size={16} />
        {info.title || conf.label}
      </div>
      <div className="text-[15px] leading-[1.85] [&>p]:my-1">{cleaned}</div>
    </div>
  );
}

function CodeBlock({ children, ...props }) {
  const [copied, setCopied] = useState(false);

  const extractText = (node) => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    return node?.props?.children ? extractText(node.props.children) : "";
  };

  const copy = () => {
    navigator.clipboard.writeText(extractText(children)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="group relative">
      <button
        onClick={copy}
        aria-label="複製程式碼"
        className="absolute right-2.5 top-2.5 rounded-md bg-white/10 p-1.5 text-zinc-300 opacity-0 backdrop-blur transition-opacity hover:bg-white/20 group-hover:opacity-100"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  );
}

const headingWithId = (Tag) =>
  function Heading({ children }) {
    const text = Array.isArray(children) ? children.join("") : String(children ?? "");
    return <Tag id={slugify(text)}>{children}</Tag>;
  };

const components = {
  blockquote: Blockquote,
  pre: CodeBlock,
  h2: headingWithId("h2"),
  h3: headingWithId("h3"),
  code({ inline, className, children, ...props }) {
    if (inline || !className) {
      return (
        <code className="inline" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default function Markdown({ children }) {
  return (
    <div className="article">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
