# Standardize JSDoc metadata headers
Date: 2026-02-07
Author: Commander (based on brainstormer outputs)

## Purpose

Document the design produced by the brainstormer for standardizing JSDoc-style metadata headers across .js files in this repository. This document is intended for review and iterative refinement before we generate an implementation plan.

## Problem statement

Bitburner scripts in this repo have inconsistent or missing top-of-file metadata. That makes it harder to quickly understand usage, API dependencies, and rough RAM requirements. We will add a uniform JSDoc header to each relevant `.js` script without changing behavior.

## Constraints

- Headers must be accurate (APIs and RAM), concise, and machine-friendly so we can automate edits.
- Changes are comment-only (no functional code changes).
- Automatable heuristics should be conservative to avoid mis-documenting scripts.
- Exclude non-script files and test/support libraries.

> Note: A previous mindmodel lookup found no .mindmodel/ directory in this project; we proceeded with repo-agnostic heuristics.

## Final header template

Use this exact block (replace bracketed tokens):

```js
/**
 * [file-name].js - [Short description of the file purpose].
 *
 * Author: [Author Name] ([Attribution or Repository URL if applicable])
 *
 * Usage:
 * ```
 * run [script-path] [arguments...]
 * ```
 * Example:
 * ```
 * run [script-path] [example arguments...]
 * ```
 *
 * Requirements:
 * - API: [Comma-separated list of NetScript API calls used]
 * - RAM: [Estimated RAM usage, rounded to nearest 0.1 GB]
 *
 * File URL: [GitHub raw URL to the file]
 */
```

Formatting rules:
- Keep each list item on its own line.
- API calls should be sorted and deduplicated.
- RAM rounded to 0.1 GB (e.g., `2.0 GB`, `0.6 GB`).

## Heuristics for inference

1. Usage
- Detect `export async function main(ns)` presence → candidate script.
- Inspect `ns.args` usage:
  - If code checks for `ns.args.length` and prints an error when empty, list required arguments.
  - Use variable names assigned from `ns.args[n]` to name arguments (e.g., `target`, `host`, `threads`).
  - If defaults are present (e.g., `var host = ""; if (ns.args.length > 1) host = ns.args[1];`), show them as optional in Usage.

2. Requirements (API & RAM)
- Gather all occurrences of `ns.` calls and extract the token after `ns.` (include both top-level and namespaced calls like `ns.stock.getSymbols`).
- Deduplicate and list them under the `API:` bullet as a comma-separated list.
- RAM: This value MUST be filled manually by a reviewer/maintainer. The automation will not write final RAM values to headers.
  - The automated process may include an informational suggested RAM range for reviewer convenience, but the header's `RAM:` line will be entered or confirmed manually to ensure accuracy.
  - Suggested guidance (informational only): simple scripts ~0.1–0.6 GB, monitoring scripts ~2.0 GB, complex/continuous scripts ~4.0 GB. Always record the final RAM as `X.Y GB` with one decimal.

3. File URL
- Use the canonical raw GitHub URL format for the current repo and branch: `https://raw.githubusercontent.com/{owner}/{repo}/main/{path}`. If owner/repo cannot be determined automatically, use the repo root path that was used during brainstorming (e.g. `https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/...`).

## Inclusion / Exclusion rules

Include:
- Files ending in `.js` that contain `export async function main` (scripts intended to be run inside Bitburner).

Exclude:
- Files in `test/`, `node_modules/`, or other non-script folders.
- Utility libraries that don't call `ns.` (unless they themselves are entry scripts).
- Minified/generated files.

If a file is ambiguous, mark it for manual review instead of auto-editing.

## Verification checklist

For each modified file, the reviewer will confirm:

1. Header exists and exactly matches the template structure.
2. Usage line reflects the script path and argument names; example provided.
3. All `ns.` calls are listed under API; no obvious APIs are missing.
4. RAM estimate is present and rounded to one decimal place.
5. File URL resolves to the raw file location in the repo (or uses the conservative repo URL).
6. No functional code changes (diff should only show comment insert/replace).

If any item fails, the file is flagged for manual inspection.

## Sample transformed headers

- weaken.js (small script)

```js
/**
 * weaken.js - Reduces server security.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run weaken.js [target] [host] [threads] [RAM] [securityRisk]
 * ```
 * Example:
 * ```
 * run weaken.js "n00dles" "home" 10 2.4 5
 * ```
 *
 * Requirements:
 * - API: ns.weaken, ns.tryWritePort, ns.print
 * - RAM: 2.0 GB
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/weaken.js
 */
```

- stock-bot.js (large script)

```js
/**
 * stock-bot.js - Automates stock trading with long/short strategies.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 * Originally written by: u/havoc_mayhem (Original URL: https://www.reddit.com/r/Bitburner/comments/9o1xle/stock_market_script/)
 *
 * Usage:
 * ```
 * run stock-bot.js
 * ```
 * Example:
 * ```
 * run stock-bot.js
 * ```
 *
 * Requirements:
 * - API: ns.stock.getSymbols, ns.stock.buy, ns.stock.sell, ns.stock.short, ns.stock.sellShort
 * - RAM: 4.0 GB
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/stock-bot.js
 */
```

- optional/getServeStatus.js (optional script)

```js
/**
 * getServeStatus.js - A more in-depth server information script.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run optional/getServeStatus.js [ThresholdModifier] [Server] [Server] ...
 * ```
 * Example:
 * ```
 * run optional/getServeStatus.js 0.8 n00dles harakiri-sushi
 * ```
 *
 * Requirements:
 * - API: ns.serverExists, ns.getServerMaxMoney, ns.getServerMinSecurityLevel, ns.getServerRam, ns.getServerSecurityLevel, ns.getServerMoneyAvailable, ns.nFormat, ns.getServerGrowth, ns.sleep
 * - RAM: 2.2 GB
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/optional/getServeStatus.js
 */
```

## Notes

- RAM values are intentionally manual to avoid mis-reporting; the automation will extract APIs and suggest usage/arguments but will not write RAM values without human confirmation.

- CI or automated test coverage for header presence is intentionally excluded from the plan per request.

If you want any additional edits to this document (wording, examples, inclusion rules), tell me what to change and I'll update the file. Reply with "Approve design" when you're ready for me to generate the implementation plan.
