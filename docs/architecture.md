---
type: Architecture
title: 系統架構
description: pi-plannotator-auto 的整體架構和模組依賴
status: stable
generated: { by: human:cheerio, at: 2026-07-31T12:00:00Z }
verified: { by: human:cheerio, at: 2026-07-31T12:00:00Z }
tags: [architecture, dependencies, pi-extension]
---

# Architecture Overview

## 系統架構

```
pi-plannotator-auto
├── extensions/
│   └── auto-annotate.ts    ← 主要 extension（註冊 tool + command）
├── docs/                   ← 本資料夾（供 AI 快速理解專案）
├── assets/                 ← gallery 用的媒體檔案
├── package.json            ← pi manifest + npm 設定
└── .github/workflows/      ← CI/CD 自動化
```

## 模組依賴關係

```
auto-annotate.ts
    │
    ├── @earendil-works/pi-coding-agent (peerDependency)
    │   └── ExtensionAPI, UI API
    │
    ├── @plannotator/pi-extension (dependency)
    │   └── startMarkdownAnnotationSession()
    │   └── startLastMessageAnnotationSession()
    │
    └── typebox (devDependency)
        └── 參數 schema 定義
```

## 載入流程

1. Pi 讀取 `package.json` 的 `pi.extensions` 欄位
2. 載入 `extensions/auto-annotate.ts`
3. 呼叫 `default export` 函式，傳入 `ExtensionAPI`
4. 註冊 `open_annotate` tool 和 `/annotate` command

## 核心概念

### Tool vs Command

| 類型 | 用途 | 觸發方式 |
|------|------|----------|
| Tool | AI 自動呼叫 | AI 判斷需要時自動觸發 |
| Command | 使用者手動觸發 | 輸入 `/annotate` |

### Lazy Loading

`@plannotator/pi-extension` 使用 lazy loading：
- 第一次呼叫 tool 時才 import
- 避免載入時的錯誤影響其他 extension
- 如果未安裝會拋出清楚的錯誤訊息

---

## Related Documents

- [tools.md](./tools.md) — Tool 和 Command 詳細說明
- [dependencies.md](./dependencies.md) — 依賴關係
- [../AGENTS.md](../AGENTS.md) — 開發規則
