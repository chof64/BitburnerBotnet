# CODE_STYLE.md

This file documents observed coding conventions, patterns and guidelines to help contributors write code that fits this repository.

General
-
- Language: JavaScript for Bitburner Netscript (ES module style). Each runnable script exports an async main function: `export async function main(ns) { ... }` — follow this signature.
- Keep new scripts small and single-purpose. Most scripts in this repo are short-lived tasks (hack/grow/weaken) or long-running daemons (hack-daemon.js).
- Scripts communicate via Bitburner ports (ns.peek/ns.tryWritePort/ns.getPortHandle). When adding new protocol messages, use JSON objects consistently.

File & directory naming
-
- Files in this repo are primarily at the repository root. Optional utilities go under `optional/`.
- Observed filename styles: kebab-case predominates (e.g., `hack-daemon.js`, `buy-server.js`). Some files use camelCase (e.g., `shareCPU.js`). When adding new files prefer kebab-case to match majority (e.g., `my-new-script.js`).

Export & entrypoint
-
- Always use the Netscript entry signature used across the repo:
 - Always use the Netscript entry signature used across the repo. Precede the entry
   with a JSDoc param annotation so editors and tooling can recognize the Bitburner
   NS type. Example:

   /** @param {NS} ns */
   export async function main(ns) {
     // use ns.* API
   }

- Add a brief header comment at the top describing the script's purpose and any required permissions (if helpful).

Variable declarations & style
-
- Use const for values that do not change and let for mutable variables. Avoid var in new code — the codebase mixes var with let/const but modern style is const/let.
- When a value may be overridden by ns.args, declare it with let, e.g.:

  let maxIncome = 1e9;
  if (ns.args.length) maxIncome = parseInt(ns.args[0]);

- Prefer descriptive lowerCamelCase names for functions and variables (e.g., getServerTIXSymbol, reservedRam, spendPercentage).
- Constants that are globally meaningful but not part of runtime config are still observed as lowerCamelCase in this codebase (e.g., homeReservedRAM). Follow existing lowerCamelCase naming for such constants.

Function & helper naming
-
- Use lowerCamelCase for helper functions: randomIntFromInterval, waitForCash, levelUpgradeCostTotal.
- Keep helper functions inside the same file unless they are shared across multiple scripts, in which case add a shared util file (e.g., utils.js) at repo root and import it via copy/upload into Bitburner (note: Bitburner doesn't support remote imports — keep files together when using ns.run).

IPC & port messages
-
- Use JSON objects for task and lock messages. Observed task object shape:

  { target, host, task, done, threads, ram, security }

- Use consistent ports for well-known channels (documented in ARCHITECTURE.md). When writing to ports, call ns.tryWritePort and do not assume success; check return value if reliability is required.
- To avoid race conditions respect the current lock protocol: write lock request to outLock port (15) then poll gLock (6) peek until capture is assigned. Mirror existing lock object shapes when making requests.

Error handling
-
- Observed pattern: log errors via ns.print or ns.tprint and return early. Follow that style for consistency (instead of throwing exceptions).
- Be defensive about assumptions from ports and JSON.parse: when reading free-text from ports, guard parsing with try/catch to avoid unexpected terminate of long-running daemons.

Resource handling (RAM/threads)
-
- Compute available RAM with: ns.getServerMaxRam(host) - ns.getServerUsedRam(host) - reservedRam (if on home set reservedRam to homeReservedRAM where appropriate).
- Get script RAM with ns.getScriptRam("script.js") and compute threads via Math.floor(availableRam / scriptRam). Clamp threads to >= 0.

Logging
-
- Use ns.print(...) for debug-level or local logs in the script. Use ns.tprint(...) for user-facing notifications. Many scripts disable logs at the top by calling ns.disableLog("ALL"). If you do so, ensure you still print critical errors.

Async control flow & loops
-
- Use await ns.sleep(ms) for delays and avoid tight busy loops. Existing code sleeps 400–1000ms in loops; when polling ports use moderate sleeps (>= 400ms) to reduce CPU usage.

Port and IPC conventions (do's and don'ts)
-
- Do: use ns.getPortHandle(n).peek() for non-destructive reading when you need to inspect current state without removing it.
- Do: use ns.tryWritePort(n, JSON.stringify(obj)) to attempt writing JSON objects.
- Do: clear ports with ns.clearPort(n) where intended (restart-scripts.js clears ports 1..20 at startup).
- Don't assume tryWritePort returns true — check it when necessary.

Testing & scripts
-
- There is no test framework. If adding non-trivial logic, include a small optional script under `optional/` to print or validate behavior in-game.

Do's and Don'ts (quick reference)
- Do: Use export async function main(ns) signature
- Do: Prefer kebab-case filenames
- Do: Use const/let, avoid var for new code
- Do: Use JSON objects for port messages and document their shape
- Do: Guard JSON.parse with try/catch in long-running daemons
- Don't: Reassign const variables; use let when you need to assign later
- Don't: Rely on tryWritePort always succeeding without checking the return value

If you'd like, I can:
- Add a small utils.js with shared port constants and helper functions (getAvailableRam, writeTask, tryParsePort) and patch a few files to use it.
