---
type: Reference
title: Pi SDK
description: Pi SDK 參考文件
status: stable
generated: { by: human:cheerio, at: 2026-07-31T12:00:00Z }
tags: [reference, pi-sdk, api]
---

# Pi SDK Reference

## ExtensionAPI

`@earendil-works/pi-coding-agent` 提供的主要 API。

### 核心方法

```typescript
// 註冊 Tool
pi.registerTool({
  name: string,
  label: string,
  description: string,
  parameters: Schema,
  execute: async (toolCallId, params, signal, onUpdate, ctx) => Result,
  renderCall?: (args, theme) => Component,
  renderResult?: (result, { expanded }, theme) => Component,
});

// 註冊 Command
pi.registerCommand(name: string, {
  description: string,
  handler: async (args, ctx) => void,
});
```

### Context API

```typescript
ctx.hasUI: boolean           // 是否有 TUI
ctx.ui.notify(msg, type)     // 顯示通知
ctx.sessionManager.getEntries()  // 取得 session 歷史
```

---

## 參考連結

- [Pi SDK 文件](https://pi.dev/docs/sdk)
- [Extension 開發指南](https://pi.dev/docs/extensions)
