---
type: Log
title: 變更歷史
description: pi-plannotator-auto 的變更歷史記錄
status: stable
generated: { by: human:cheerio, at: 2026-07-31T12:00:00Z }
tags: [log, history, changes]
---

# 變更歷史

## 2026-08-01

### Automation
* **Update**: 自動化 publish 流程 — 合併 PR 後自動建立 tag + publish
* **Update**: 更新 publish.yml，從 tag 觸发改為 master push 觸發
* **Update**: 加入版本檢查，避免重複發布

### Documentation
* **Update**: 更新 AGENTS.md 和 SKILL.md，反映新的自動化流程

---

## 2026-07-31

### Initialization
* **Creation**: 建立 OKF 格式的知識目錄
* **Creation**: 新增 architecture.md、tools.md、dependencies.md、log.md
* **Creation**: 新增 references/ 資料夾

### Documentation
* **Update**: 更新 AGENTS.md，加入文件閱讀指南
* **Update**: 將 docs/ 轉換為 OKF 格式，加入 frontmatter

### Package Updates
* **Update**: 修正依賴關係，將 @plannotator/pi-extension 從 peerDependencies 移到 dependencies

---

## 2026-07-30

### Package Publishing
* **Creation**: 建立 GitHub Actions CI/CD (ci.yml + publish.yml)
* **Creation**: 設定 Branch Protection（PR + CI 驗證）
* **Creation**: 發佈 @cheeriocorner/pi-plannotator-auto 到 npm

### Documentation
* **Update**: 更新 README.md，加入 NPM 安裝說明和 badges

---

## 2026-07-12

### Development
* **Fix**: Plannotator Extension 除錯完成
* **Fix**: 確認 open_annotate 工具正常觸發瀏覽器註解 UI

---

## 2026-07-11

### Initial Release
* **Creation**: 建立 pi-plannotator-auto extension
* **Creation**: 實作 open_annotate tool
* **Creation**: 實作 /annotate command
* **Creation**: 設定 GitHub repository
