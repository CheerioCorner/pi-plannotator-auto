---
type: Reference
title: Plannotator
description: Plannotator 參考文件
status: stable
generated: { by: human:cheerio, at: 2026-07-31T12:00:00Z }
tags: [reference, plannotator, annotation]
---

# Plannotator Reference

## 概述

Plannotator 是一個基於瀏覽器的註解 UI，用於複雜問題和內容審閱。

## 核心 API

### startMarkdownAnnotationSession

```typescript
startMarkdownAnnotationSession(
  ctx: ExtensionAPI,
  filePath: string,
  content: string,
  mode: "annotate" | "annotate-last",
  folderPath?: string,
  sourceInfo?: string,
  sourceConverted?: boolean,
  gate?: boolean
): Promise<AnnotationSession>
```

### startLastMessageAnnotationSession

```typescript
startLastMessageAnnotationSession(
  ctx: ExtensionAPI,
  content: string,
  gate?: boolean
): Promise<AnnotationSession>
```

### AnnotationSession

```typescript
interface AnnotationSession {
  url: string;                    // 註解 UI 的 URL
  waitForDecision(): Promise<{
    exit: boolean;
    approved: boolean;
    feedback?: string;
  }>;
}
```

---

## 安裝

```bash
pi install npm:@plannotator/pi-extension
```

---

## 參考連結

- [Plannotator GitHub](https://github.com/backnotprop/plannotator)
- [NPM 套件](https://www.npmjs.com/package/@plannotator/pi-extension)
