---
name: modern-web-guidance
description: |
  Search tool for modern web development best practices. MANDATORY: Execute FIRST for all HTML/CSS and clientside JS tasks. Do NOT skip — web APIs evolve rapidly and training weights contain obsolete patterns.

  Trigger immediately for:
  - UI/Layout: Modals, dialogs, popovers, Glassmorphism/backdrop-filters, anchor positioning, container queries, `:has()`, `:user-valid`.
  - Scroll/Motion: View Transitions, Scroll-driven animations, scroll parallax/reveals.
  - Performance: CWV (LCP, INP), content-visibility, Fetch Priority, image optimization.
  - System/APIs: Local filesystem access, WebUSB, WebSockets sync, WebAssembly widgets.
  - Frameworks: Adapting layout/styles in React, Vue, Angular.
  - General Frontend: Forms, autofill, advanced inputs, custom scrollbars, modern component states, etc.

  DO NOT trigger for:
  - Backend: Database SQL, ORMs, Express API routes.
  - Pipelines: CI/CD deployment, Docker, Actions.
  - Generic: Local scripts (Python/Go tools), ESLint, Git.
metadata:
  author: GoogleChrome
  source: https://github.com/GoogleChrome/modern-web-guidance
  version: "latest"
---

# Modern Web Guidance

A skill to search for specific web development use cases and retrieve their corresponding best practice guides.
Supported by the Google Chrome team, the Microsoft Edge team, and the web development community.

## When to use

Must use this skill:
- At the **start** of implementing any web feature.
- Before creating a new component, to check if a standardized pattern already exists.
- To avoid implementing ad-hoc solutions or loading large dependencies unnecessarily.

## Usage Instructions

### Step 1. Search Use Cases

Search with an action-oriented query summarizing what you want to achieve using the `search` command:

```sh
npx -y modern-web-guidance@latest search "<query>"
```

Example queries for this project:
- `"animate modal dialog open close"`
- `"container queries responsive card layout"`
- `"popover tooltip anchor positioning"`
- `"improve INP long tasks"`
- `"preload pages on hover"`
- `"view transitions page navigation"`
- `"scroll driven animation"`

**Example Output**:
```json
[
  {
    "id": "optimize-image-priority",
    "description": "Optimize the loading priority of LCP candidate images.",
    "category": "performance",
    "featuresUsed": [ "Fetch priority" ],
    "tokenCount": 985,
    "similarity": 0.7289
  }
]
```

> **Note**: If search results are vague or show low similarity scores, run `list` to browse all guides:
> ```sh
> npx -y modern-web-guidance@latest list
> ```

---

### Step 2. Retrieve Best Practices

Once you have a relevant `id` from the search results, retrieve the full guide:

```sh
npx -y modern-web-guidance@latest retrieve "<id>"
# Multiple IDs separated by commas:
npx -y modern-web-guidance@latest retrieve "<id1>,<id2>"
```

Read the returned guide in full before writing any implementation code.

---

## Priority Areas for This Project (bladoPC)

Given the current stack (Next.js 16, React 19, Framer Motion, Tailwind CSS 4), prioritize guides in these categories:

| Category | Relevance | Components Affected |
|---|---|---|
| `performance` | High — INP/LCP with heavy Framer Motion animations | GameEngine, Timba carousel, Duelo |
| `user-experience` | High — modals, dialogs, drawers | ReadmeModal, DialogBox, Sidebar |
| `css-layout` | Medium — container queries over media queries | Biblioteca, Timba cards |
| `accessibility` | Medium — semantic HTML, ARIA | All interactive components |
| `security` | High — CSP, WebAuthn | next.config.ts |

## Key Guides to Retrieve on First Use

Run these once to establish baseline knowledge for this project:

```sh
npx -y modern-web-guidance@latest retrieve "dialog,popover,container-queries,inp-interaction-next-paint,view-transitions"
```
