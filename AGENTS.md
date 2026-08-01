# Pi-plannotator-auto 開發規則

## 📚 文件閱讀指南

### 什麼時候該讀什麼？

| 情況 | 應該讀取的文件 | 原因 |
|------|----------------|------|
| **第一次接觸這個專案** | README.md → AGENTS.md → docs/index.md | 先了解專案是什麼，再了解規則 |
| **要修改 extension 程式碼** | docs/architecture.md → docs/tools.md → extensions/*.ts | 先了解架構，再看具體實作 |
| **要新增 tool 或 command** | docs/tools.md → extensions/auto-annotate.ts | 了解現有 tool 的模式 |
| **要修改依賴關係** | docs/dependencies.md → package.json | 了解依賴類型和影響 |
| **要發佈新版本** | 本文件的「正確工作流程」章節 | 避免流程錯誤 |

### 快速閱讀順序

```
第一次：README.md (1 min) → AGENTS.md (2 min) → docs/index.md (1 min)
修改 code：docs/tools.md (1 min) → extensions/*.ts
發佈：AGENTS.md 的工作流程章節
```

---

## ⚡ 必讀規則（每次修改前）

1. **永遠不要直接 push 到 master** — 必須建立 branch → PR → merge
2. **發布 npm 需要 tag** — push `v*` tag 才會觸發 publish workflow
3. **版本號要一致** — package.json version 必須和 tag 一致

---

## 正確工作流程

### 修改程式碼並發布

```bash
# 1. 建立新 branch
git checkout master
git pull
git checkout -b feature/your-feature-name

# 2. 修改檔案（package.json, extensions/*.ts 等）

# 3. 更新版本號（如果有功能變更）
npm version patch  # 1.0.1 → 1.0.2
# 或
npm version minor  # 1.0.1 → 1.1.0
# 或
npm version major  # 1.0.1 → 2.0.0

# 4. Commit 並推送
git add .
git commit -m "feat: add new feature"
git push -u origin feature/your-feature-name

# 5. 建立 Pull Request
gh pr create --title "feat: add new feature" --body "description"

# 6. 合併 PR → 自動觸發 publish！
```

### GitHub Actions 會自動：
- ✅ 讀取 package.json 的 version
- ✅ 建立 tag (vX.X.X)
- ✅ 執行 `npm publish --access public --provenance`
- ✅ 發布到 npm registry

### 注意事項
- 如果 version 已經發布過（tag 已存在），會自動跳過
- 只需要 bump version + 合併 PR，其他全自動！

---

## 專案結構

```
pi-plannotator-auto/
├── extensions/
│   └── auto-annotate.ts    ← 主要 extension 程式碼
├── docs/                   ← OKF 知識目錄
│   ├── index.md            ← 入口文件
│   ├── architecture.md     ← 系統架構
│   ├── tools.md            ← Tool 和 Command 說明
│   ├── dependencies.md     ← 依賴關係
│   ├── log.md              ← 變更歷史
│   └── references/         ← 外部資源引用
├── package.json             ← 包含 pi manifest
├── README.md
├── LICENSE
└── .github/workflows/
    ├── ci.yml               ← PR 驗證
    └── publish.yml          ← tag 觸發 npm publish
```

---

## Package.json 重要欄位

```json
{
  "name": "@cheeriocorner/pi-plannotator-auto",
  "keywords": ["pi-package"],  // ← gallery 抓取依據
  "pi": {
    "extensions": ["./extensions"]
  }
}
```

---

## Gallery 顯示條件

Package 要出現在 pi.dev/packages，需要：
1. ✅ `pi-package` keyword
2. ✅ `pi` manifest（extensions/skills/prompts/themes）
3. ⏳ npm registry indexing（可能需要幾小時到幾天）

---

## 常見錯誤

| ❌ 錯誤做法 | ✅ 正確做法 |
|------------|------------|
| 直接 push 到 master | 建立 branch → PR |
| 改完就 push | 先 `npm version` 更新版本 |
| 忘記 push tag | `git push origin vX.X.X` |
| version 和 tag 不一致 | 確保 package.json version == tag |
