---
type: Dependency Reference
title: Dependencies
description: pi-plannotator-auto 的依賴類型和安裝流程
status: stable
generated: { by: human:cheerio, at: 2026-07-31T12:00:00Z }
verified: { by: human:cheerio, at: 2026-07-31T12:00:00Z }
tags: [dependencies, npm, pi-extension]
---

# Dependencies

## 依賴類型

### Peer Dependencies（需要使用者自行安裝）

| 套件 | 版本 | 說明 |
|------|------|------|
| `@earendil-works/pi-coding-agent` | >=0.74.0 | Pi 核心 SDK，提供 ExtensionAPI |

### Dependencies（自動安裝）

| 套件 | 版本 | 說明 |
|------|------|------|
| `@plannotator/pi-extension` | * | Plannotator 核心，提供瀏覽器註解 UI |

### Dev Dependencies（開發用）

| 套件 | 版本 | 說明 |
|------|------|------|
| `@earendil-works/pi-coding-agent` | >=0.74.0 | Pi 核心 SDK（開發時用） |
| `@earendil-works/pi-tui` | >=0.74.0 | Pi TUI 元件（開發時用） |
| `@plannotator/pi-extension` | * | Plannotator（開發時用） |
| `typebox` | * | 參數 schema 定義 |

---

## 安裝流程

```
使用者執行: pi install npm:@cheeriocorner/pi-plannotator-auto
    │
    ├── 安裝 @cheeriocorner/pi-plannotator-auto
    │
    └── 自動安裝 dependencies
        └── @plannotator/pi-extension
            │
            └── 注意：@earendil-works/pi-coding-agent
                是 peerDependency，需要使用者已安裝 Pi
```

---

## 版本相容性

- **最低 Pi 版本：** 0.74.0
- **最低 Node 版本：** 18.0.0
- **Module 類型：** ESM (type: "module")

---

## Bundle 注意事項

此 extension **不 bundle** 任何 Pi 核心套件：
- `@earendil-works/pi-coding-agent` → peerDependency
- `@earendil-works/pi-tui` → peerDependency
- `typebox` → peerDependency（由 Pi 提供）

其他第三方套件（如 `@plannotator/pi-extension`）需要 bundle 在 tarball 中。

---

## Related Documents

- [architecture.md](./architecture.md) — 系統架構
- [tools.md](./tools.md) — Tool 和 Command 說明
- [../package.json](../package.json) — npm 設定
