# @cheeriocorner/pi-plannotator-auto

Auto-annotate extension for [Plannotator](https://github.com/backnotprop/plannotator) - provides browser-based annotation UI for complex questions and content review.

[![npm version](https://img.shields.io/npm/v/@cheeriocorner/pi-plannotator-auto.svg)](https://www.npmjs.com/package/@cheeriocorner/pi-plannotator-auto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **`open_annotate` tool** - Let the AI open a browser-based annotation UI for you to review content
- **`/annotate` command** - Manually annotate the last assistant message
- Visual approve/deny with feedback
- Integrates seamlessly with `@plannotator/pi-extension`

## Installation

### From NPM (Recommended)

```bash
pi install npm:@cheeriocorner/pi-plannotator-auto
```

### From GitHub

```bash
pi install git:github.com/CheerioCorner/pi-plannotator-auto
```

## Prerequisites

This extension requires `@plannotator/pi-extension` to be installed:

```bash
pi install npm:@plannotator/pi-extension
```

## Usage

### Automatic (AI-triggered)

The AI can call `open_annotate` when it needs you to review content:

```
User: Help me review this plan
AI: [calls open_annotate with the plan content]
→ Browser opens with annotation UI
→ User reviews, annotates, approves/denies
→ AI receives feedback
```

### Manual Command

Type `/annotate` to annotate the last assistant message:

```
/annotate
```

## How It Works

1. AI calls `open_annotate` with title and markdown content
2. Browser opens with visual annotation interface
3. You can:
   - ✅ **Approve** - Content looks good
   - ❌ **Deny** - Add feedback explaining issues
   - 📝 **Annotate** - Add inline comments
4. AI receives your decision and feedback

## License

MIT
