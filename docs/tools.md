---
type: Tool Reference
title: Tools & Commands
description: pi-plannotator-auto 註冊的 Tool 和 Command 說明
status: stable
generated: { by: human:cheerio, at: 2026-07-31T12:00:00Z }
verified: { by: human:cheerio, at: 2026-07-31T12:00:00Z }
tags: [tools, commands, pi-extension]
---

# Tools & Commands

## Registered Tools

### `open_annotate`

**用途：** 開啟瀏覽器註解 UI，讓使用者審閱、註解、批准/拒絕內容

**參數：**
```typescript
{
  title: string        // 註解 session 的標題
  content: string      // 要註解的內容（markdown 格式）
  mode?: "annotate" | "annotate-last"  // 註解模式（可選）
}
```

**使用情境：**
- AI 需要使用者審閱複雜的計畫或問題時
- 需要收集使用者回饋時
- 需要視覺化內容進行討論時

**回傳值：**
```typescript
{
  content: [{ type: "text", text: string }]
  details: {
    action: "approved" | "denied" | "closed"
    feedback?: string
  }
}
```

---

## Registered Commands

### `/annotate`

**用途：** 手動對最後一條 assistant 訊息進行註解

**參數：** 無

**使用情境：**
- 使用者想要回頭審閱之前的 AI 回覆
- 需要對特定訊息加入註解

**注意：** 此 command 不會等待決策，使用者可以繼續對話

---

## UI 渲染

### Tool Call 渲染
```typescript
renderCall(args, theme) {
  // 顯示: "📝 Opening annotation: {title}"
}
```

### Result 渲染
```typescript
renderResult(result, { expanded }, theme) {
  // approved: "✓ Approved" (綠色)
  // denied: "✗ Denied" (紅色) + 回饋
  // closed: "○ Closed" (灰色)
  // error: "Error: {message}" (紅色)
}
```

---

## 錯誤處理

| 錯誤情況 | 處理方式 |
|----------|----------|
| `hasUI = false` | 回傳提示需要 TUI 模式 |
| 載入 plannotator 失敗 | 抛出安裝提示錯誤 |
| 註解 session 失敗 | 回傳錯誤訊息 |

---

## Related Documents

- [architecture.md](./architecture.md) — 系統架構
- [dependencies.md](./dependencies.md) — 依賴關係
- [../extensions/auto-annotate.ts](../extensions/auto-annotate.ts) — 原始碼
