# 底層邏輯・教學導讀網站

《底層邏輯:看清這個世界的底牌》(劉潤著,時報出版)的教學導讀網站,以 Astro + Starlight 建置。
內容為重點整理、白話解說與思考題,**並非原書全文**;原文引用僅限每課至多兩句短金句。

## 開發

```bash
npm ci
npm run dev      # http://localhost:4321/underlying-logic/
npm run build    # 產出 dist/
npm run preview
```

## 結構

- 內容:`src/content/docs/unit*.md`(共 21 篇)+ `index.mdx`(首頁)
- 側欄:`astro.config.mjs` 的 `sidebar`(新增章節要同步)
- 主題:fuchsia,樣式在 `src/styles/theme.css`
- Callout:`:::tip[標題]`、`:::note[標題]`、`:::caution[標題]`
- 排版慣例:中文與英數之間加半形空格

線上網址:https://yaericure.github.io/underlying-logic/(push main 自動部署)
