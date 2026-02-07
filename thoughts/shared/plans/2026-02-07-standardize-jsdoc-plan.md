# Standardize JSDoc metadata headers — Implementation Plan
Date: 2026-02-07
Author: Commander (planner output)

Summary
-------
This plan will add or replace top-of-file JSDoc metadata headers for all runnable Bitburner scripts in the repository (files that export `async function main(ns)`). Changes are comment-only and will not alter runtime behavior. RAM values will be left as TODO placeholders to be filled by a human reviewer.

Context
-------
Design doc: thoughts/shared/designs/2026-02-07-standardize-jsdoc-design.md
Repo root: /Users/chof64/Developer/BitburnerBotnet

Planner task id: ses_3c72cfe50ffeX2jSVqY38myL46

Files discovered and included (23 files)
- stock-bot.js
- weaken.js
- stock-bot-v2.js
- shareCPU.js
- restart-scripts.js
- optional/liquidate.js
- optional/toggleShare.js
- optional/sendkill.js
- optional/getRepForFavor.js
- optional/killServer.js
- hacknet-mgr.js
- hack.js
- optional/getExpServerInfo.js
- hack-daemon.js
- grow.js
- gang-nullsec.js
- easy-hack.js
- corpo.js
- coordinator.js
- check-status.js
- auto-spread-v2.js
- buy-server.js
- optional/getServeStatus.js

Microtasks
----------
Each microtask is one file. The automation will write a header block using the approved template; RAM is left as TODO. The automation will NOT write the final RAM value.

Notes on estimated time categories:
- small: 1-2 min — trivial scripts with no or simple args
- medium: 3-6 min — scripts with arguments or moderate APIs
- large: 7-15 min — large scripts with many APIs (stock-bot, hack-daemon, hacknet-mgr, auto-spread-v2)

Batch grouping: batches of up to 10 files for parallel execution.

Microtask list
--------------

1) id: js-001
   file: stock-bot.js
   header: will be REPLACED (existing header present)
   inferred Usage: run stock-bot.js
   API calls: ns.stock.getSymbols, ns.stock.getPrice, ns.stock.sell, ns.stock.sellShort, ns.stock.buy, ns.stock.short, ns.stock.getPosition, ns.stock.getMaxShares, ns.stock.getVolatility, ns.stock.getForecast, ns.stock.getAskPrice, ns.stock.getBidPrice, ns.getServerMoneyAvailable, ns.nFormat, ns.stock.getPrice, ns.getPortHandle, ns.getScriptRam, ns.sleep, ns.clearLog, ns.printf, ns.tprint
   RAM: TODO (suggested: 4.0 GB)
   header to write:
   ```js
   /**
    * stock-bot.js - Automates stock trading with long/short strategies.
    *
    * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
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
    * - API: ns.stock.getSymbols, ns.stock.getPrice, ns.stock.sell, ns.stock.sellShort, ns.stock.buy, ns.stock.short, ns.stock.getPosition, ns.stock.getMaxShares, ns.stock.getVolatility, ns.stock.getForecast, ns.stock.getAskPrice, ns.stock.getBidPrice, ns.getServerMoneyAvailable, ns.nFormat, ns.getPortHandle, ns.sleep, ns.clearLog, ns.printf, ns.tprint
    * - RAM: TODO (suggested: 4.0 GB)
    *
    * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/stock-bot.js
    */
   ```
   verification:
   - Confirm header inserted at top of file and matches template.
   - Run git diff to ensure only comment changes.
   - Check that the script still contains `export async function main` and that no code lines were modified.
   estimated: large

2) id: js-002
   file: weaken.js
   header: will be REPLACED (already updated earlier)
   inferred Usage: run weaken.js [target] [host] [threads] [RAM] [securityRisk]
   API calls: ns.weaken, ns.tryWritePort, ns.print
   RAM: TODO (suggested: 2.0 GB)
   header to write: (already applied; include same header with RAM placeholder)
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
    * - RAM: TODO (suggested: 2.0 GB)
    *
    * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/weaken.js
    */
   ```
   verification:
   - Confirm header at top and that previous replacement (done) is correct.
   - git diff contains only header changes.
   estimated: small

3) id: js-003
   file: stock-bot-v2.js
   header: will be ADDED (file has comment but not standardized)
   inferred Usage: run stock-bot-v2.js
   API calls: ns.stock.getSymbols, ns.stock.getPrice, ns.stock.getMaxShares, ns.stock.getBidPrice, ns.stock.getAskPrice, ns.stock.short, ns.stock.buy, ns.getServerMoneyAvailable, ns.stock.getPosition, ns.nFormat, ns.alert, ns.sleep, ns.getPortHandle
   RAM: TODO (suggested: 2.0 GB)
   header to write:
   ```js
   /**
    * stock-bot-v2.js - Alternate stock market script (lighter weight)
    *
    * Author: (original author attribution preserved in file)
    *
    * Usage:
    * ```
    * run stock-bot-v2.js
    * ```
    * Example:
    * ```
    * run stock-bot-v2.js
    * ```
    *
    * Requirements:
    * - API: ns.stock.getSymbols, ns.stock.getPrice, ns.stock.getMaxShares, ns.stock.getBidPrice, ns.stock.getAskPrice, ns.stock.short, ns.stock.buy, ns.getServerMoneyAvailable, ns.stock.getPosition, ns.nFormat, ns.alert, ns.sleep, ns.getPortHandle
    * - RAM: TODO (suggested: 2.0 GB)
    *
    * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/stock-bot-v2.js
    */
   ```
   verification: same pattern as above
   estimated: medium

4) id: js-004
   file: shareCPU.js
   header: will be REPLACED/standardized
   inferred Usage: run shareCPU.js
   API calls: ns.peek, ns.share, ns.sleep
   RAM: TODO (suggested: 0.1 GB)
   header to write: (standard template with RAM placeholder)
   estimated: small

5) id: js-005
   file: restart-scripts.js
   header: will be REPLACED/standardized
   inferred Usage: run restart-scripts.js
   API calls: ns.disableLog, ns.tprint, ns.ps, ns.kill, ns.peek, ns.killall, ns.clearPort, ns.readPort, ns.sleep, ns.tryWritePort, ns.run, ns.getServerMaxRam, ns.getServerUsedRam, ns.getScriptRam
   RAM: TODO (suggested: 1.0 GB)
   estimated: medium

6) id: js-006
   file: optional/liquidate.js
   header: will be REPLACED/standardized
   inferred Usage: run optional/liquidate.js
   API calls: ns.peek, ns.tprint, ns.clearPort, ns.tryWritePort
   RAM: TODO (suggested: 0.6 GB)
   estimated: small

7) id: js-007
   file: optional/toggleShare.js
   header: will be REPLACED/standardized
   inferred Usage: run optional/toggleShare.js
   API calls: ns.peek, ns.tprint, ns.clearPort, ns.tryWritePort
   RAM: TODO (suggested: 0.6 GB)
   estimated: small

8) id: js-008
   file: optional/sendkill.js
   header: will be REPLACED/standardized
   inferred Usage: run optional/sendkill.js
   API calls: ns.tprint, ns.tryWritePort
   RAM: TODO (suggested: 0.1 GB)
   estimated: small

9) id: js-009
   file: optional/getRepForFavor.js
   header: will be ADDED/standardized
   inferred Usage: run optional/getRepForFavor.js [targetFavor] [currentRep]
   API calls: ns.tprint, ns.args
   RAM: TODO (suggested: 0.6 GB)
   estimated: small

10) id: js-010
    file: optional/killServer.js
    header: will be REPLACED/standardized
    inferred Usage: run optional/killServer.js [hostname]
    API calls: ns.disableLog, ns.args, ns.tprint, ns.serverExists, ns.tryWritePort
    RAM: TODO (suggested: 0.6 GB)
    estimated: small

11) id: js-011
    file: hacknet-mgr.js
    header: will be REPLACED/standardized
    inferred Usage: run hacknet-mgr.js [maxIncome] [spendPercentage]
    API calls: ns.hacknet.maxNumNodes, ns.hacknet.numNodes, ns.hacknet.getPurchaseNodeCost, ns.hacknet.purchaseNode, ns.disableLog, ns.print, ns.hacknet.getNodeStats, ns.nFormat, ns.hacknet.getLevelUpgradeCost, ns.hacknet.upgradeLevel, ns.hacknet.getRamUpgradeCost, ns.hacknet.upgradeRam, ns.hacknet.getCoreUpgradeCost, ns.hacknet.upgradeCore, ns.sleep, ns.hacknet.getNodeStats, ns.hacknet.getPurchaseNodeCost, ns.hacknet.getRamUpgradeCost, ns.getHacknetMultipliers
    RAM: TODO (suggested: 2.0 GB)
    estimated: large

12) id: js-012
    file: hack.js
    header: will be REPLACED/standardized
    inferred Usage: run hack.js [target] [host] [threads] [RAM] [securityRisk]
    API calls: ns.hack, ns.tryWritePort, ns.print, ns.serverExists
    RAM: TODO (suggested: 2.0 GB)
    estimated: small

13) id: js-013
    file: optional/getExpServerInfo.js
    header: will be REPLACED/standardized
    inferred Usage: run optional/getExpServerInfo.js
    API calls: ns.getPortHandle, ns.tprint, ns.getServerMaxMoney, ns.getServerRequiredHackingLevel, ns.getServerSecurityLevel, ns.nFormat, ns.getServerMoneyAvailable, ns.getServerGrowth
    RAM: TODO (suggested: 2.0 GB)
    estimated: small

14) id: js-014
    file: hack-daemon.js
    header: will be REPLACED/standardized
    inferred Usage: run hack-daemon.js
    API calls: ns.disableLog, ns.getHostname, ns.print, ns.tryWritePort, ns.getPortHandle, ns.getScriptRam, ns.getServerMaxRam, ns.getServerUsedRam, ns.run, ns.sleep, ns.getServerMinSecurityLevel, ns.getServerSecurityLevel, ns.getServerMoneyAvailable, ns.hackAnalyze, ns.hackAnalyzeChance, ns.getServerMaxMoney, ns.getScriptRam, ns.kill
    RAM: TODO (suggested: 4.0 GB)
    estimated: large

15) id: js-015
    file: grow.js
    header: will be REPLACED/standardized
    inferred Usage: run grow.js [target] [host] [threads] [RAM] [securityRisk]
    API calls: ns.grow, ns.tryWritePort, ns.print, ns.serverExists
    RAM: TODO (suggested: 2.0 GB)
    estimated: small

16) id: js-016
    file: gang-nullsec.js
    header: will be ADDED/standardized
    inferred Usage: run gang-nullsec.js
    API calls: ns.* (file contains gang-related APIs; list to be extracted automatically)
    RAM: TODO (suggested: 2.0 GB)
    estimated: medium

17) id: js-017
    file: easy-hack.js
    header: will be REPLACED/standardized
    inferred Usage: run easy-hack.js [target]
    API calls: ns.hack, ns.getServerMaxRam, ns.getServerUsedRam, ns.run, ns.sleep
    RAM: TODO (suggested: 1.0 GB)
    estimated: small

18) id: js-018
    file: corpo.js
    header: will be REPLACED/standardized
    inferred Usage: run corpo.js
    API calls: ns.* (script contains various ns calls; to be enumerated by extractor)
    RAM: TODO (suggested: 1.0 GB)
    estimated: medium

19) id: js-019
    file: coordinator.js
    header: will be REPLACED/standardized
    inferred Usage: run coordinator.js
    API calls: ns.getPortHandle, ns.peek, ns.tryWritePort, ns.print, ns.tprint, ns.sleep, ns.getServerMaxRam, ns.getServerUsedRam, ns.getScriptRam
    RAM: TODO (suggested: 2.0 GB)
    estimated: medium

20) id: js-020
    file: check-status.js
    header: will be REPLACED/standardized
    inferred Usage: run check-status.js
    API calls: ns.* (monitoring, server APIs: getServerMaxMoney, getServerSecurityLevel, getServerRam, getServerMoneyAvailable, getServerGrowth, nFormat, sleep)
    RAM: TODO (suggested: 2.0 GB)
    estimated: small

21) id: js-021
    file: auto-spread-v2.js
    header: will be REPLACED/standardized
    inferred Usage: run auto-spread-v2.js
    API calls: ns.* (file uses network and file operations; to be enumerated)
    RAM: TODO (suggested: 2.0 GB)
    estimated: large

22) id: js-022
    file: buy-server.js
    header: will be REPLACED/standardized
    inferred Usage: run buy-server.js
    API calls: ns.getServerMoneyAvailable, ns.purchaseServer, ns.tprint, ns.sleep
    RAM: TODO (suggested: 1.0 GB)
    estimated: small

23) id: js-023
    file: optional/getServeStatus.js
    header: will be REPLACED (already conforms to template; keep but ensure standardized format)
    inferred Usage: run optional/getServeStatus.js [ThresholdModifier] [Server] [Server] ...
    API calls: ns.serverExists, ns.getServerMaxMoney, ns.getServerMinSecurityLevel, ns.getServerRam, ns.getServerSecurityLevel, ns.getServerMoneyAvailable, ns.nFormat, ns.getServerGrowth, ns.sleep, ns.tprint
    RAM: TODO (suggested: 2.2 GB)
    estimated: small

Batches (parallel groups)
-------------------------
Batch 1 (files js-001 .. js-010) — stock-bot, weaken, stock-bot-v2, shareCPU, restart-scripts, optional/liquidate, optional/toggleShare, optional/sendkill, optional/getRepForFavor, optional/killServer
Rationale: independent scripts, safe to patch in parallel.

Batch 2 (files js-011 .. js-020) — hacknet-mgr, hack, optional/getExpServerInfo, hack-daemon, grow, gang-nullsec, easy-hack, corpo, coordinator, check-status
Rationale: scripts that interact with coordinator/hack-daemon are grouped but still independent across files; keep batch size manageable for review.

Batch 3 (files js-021 .. js-023) — auto-spread-v2, buy-server, optional/getServeStatus
Rationale: remaining files; fewer items.

Total estimated time
--------------------
Estimated per-file totals (conservative):
- large (4 files) x 12 min avg = 48 min
- medium (8 files) x 4.5 min avg = 36 min
- small (11 files) x 1.5 min avg = 16.5 min
Total ≈ 100.5 minutes (roughly 1.5–2 hours) for automated edits + manual verification.

Implementation checklist for executor
-----------------------------------
1. Run mindmodel_lookup("component patterns" / "naming conventions") before making any edits (required by workflow).
2. Create a git worktree for the feature branch:
   git worktree add ../feature/standardize-jsdoc -b feature/standardize-jsdoc
3. For each batch (in parallel where safe):
   - Apply header edits in the worktree file (replace top-of-file header or insert new header) using the exact header text defined in each microtask.
   - Leave RAM line as: "RAM: TODO (suggested: X.Y GB)"
   - Stage changes (git add <files>) but DO NOT commit unless user instructs.
4. Run the reviewer checks per microtask (verify header matches template, APIs listed, no code modifications):
   - git diff --staged -- <file>
   - Confirm the first non-comment line is `/**` header block and `export async function main` still present.
5. If any file requires manual adjustments (ambiguous args, missing APIs), add to the "manual review" list and do not stage until resolved.

Exact command examples for the executor
-------------------------------------
- Create worktree and branch:
  git worktree add ../feature/standardize-jsdoc -b feature/standardize-jsdoc

- After editing files in the worktree (assume working directory ../feature/standardize-jsdoc):
  git add <file1> <file2> ...
  git status --porcelain
  git diff --staged -- <file>

- To discard changes in the worktree (if needed):
  git restore --staged <file>
  git checkout -- <file>

Files flagged for manual review
------------------------------
- gang-nullsec.js (uses gang APIs; ensure accurate API list)
- corpo.js (contains varied logic; verify Usage and API list)
- auto-spread-v2.js (large; may reference non-ns code or external artifacts)

Plan output
-----------
This document will be written to: thoughts/shared/plans/2026-02-07-standardize-jsdoc-plan.md

Next action for Commander
-------------------------
Reply with one of:
- "Proceed": I will spawn the executor to apply changes in a new worktree following this plan (will perform edits but will NOT commit or push).
- "Adjust plan": specify changes to batches, estimated RAM defaults, or files to include/exclude.
- "Stop": cancel and make no edits.
