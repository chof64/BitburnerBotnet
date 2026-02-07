# ARCHITECTURE

Overview
-
This repository is a collection of Bitburner Netscript JavaScript scripts that together implement an automated "botnet" for the Bitburner game. The codebase is a flat scripts collection (no build step) where a coordinator publishes tasks on ports and worker daemons consume them, spawn hack/grow/weaken jobs and report back via ports.

Tech stack
-
- Language: JavaScript (ES modules style: `export async function main(ns)` functions)
  - Note: scripts should include a JSDoc Netscript annotation before the entrypoint to help editors and tools. Example:
    /** @param {NS} ns */
    export async function main(ns) { ... }
- Runtime: Bitburner Netscript API (the `ns` object) — all external calls are to `ns.*`
- No package.json, no build tools, no tests present in the repository

Top-level layout (annotated)
-
```
/ (repo root)
├─ README.md                # Project overview and usage notes
├─ LICENSE
├─ coordinator.js           # Helper mapping + central mappings used by coordinator
├─ hack-daemon.js           # Worker daemon: reads ports and starts weaken/grow/hack
├─ hack.js                  # Single-task hacking script that writes/reads ports
├─ grow.js                  # Grow task script
├─ weaken.js                # Weaken task script
├─ shareCPU.js              # Utility that runs ns.share() while signaled
├─ restart-scripts.js       # Orchestrator: kills/starts scripts, clears ports
├─ auto-spread-v2.js        # Spreading/daemon script (started by restart-scripts)
├─ buy-server.js            # Helper to buy servers
├─ hacknet-mgr.js           # Hacknet manager
├─ stock-bot.js             # Stock trading bot
├─ stock-bot-v2.js
├─ corpo.js                 # Corporation automation script
├─ gang-nullsec.js          # Gang automation script
├─ restart-scripts.js       # Boot / restart orchestration
├─ optional/                # Optional helper utilities
│  ├─ toggleShare.js        # Toggle share flag (port 17)
│  ├─ killServer.js         # Request a host to kill itself (port 18)
│  ├─ getExpServerInfo.js   # Helpers around EXP farm list (port 5)
│  └─ ...
└─ ss/                      # screenshots/assets referenced by README
```

Main entry points / scripts (how to operate)
-
- restart-scripts.js (root) — primary bootstrapper: kills processes, clears ports (1..20), optionally writes a share flag (port 17) and launches core manager scripts. Typical first script to run from home.
- hack-daemon.js (root) — long-running worker launched on remote/purchased servers. Reads global targets/status/locks (ports) and spawns weaken/grow/hack scripts via ns.run.
- coordinator.js (root) — contains a hard-coded mapping utility (server → ticker) used by coordination/stock scripts.
- shareCPU.js (root) — runs ns.share() while port 17 contains a share signal and port 20 is empty.
- hack.js / grow.js / weaken.js — short-lived task scripts: they follow the pattern of reporting incoming work to a port (port 13 for normal tasks, 14 for EXP tasks), performing the operation, and reporting completion.

Core components and responsibilities
-
- Coordinator (ports provider)
  - Not a single file named "coordinator daemon" in this repo, but coordination is done by the combination of scripts that write/read ports.
  - Ports used as the central IPC mechanism: targets (port 1), status (3), EXP list (5), locks (6), announcements (11), outbound lock requests (15), share flag (17), host-kill requests (18), global kill (20), task reporting (13/14).
  - coordinator.js provides a small mapping function getServerTIXSymbol(server) used by other scripts.

- Worker daemon (hack-daemon.js)
  - Core loop: wait for targets (port 1) → iterate targets → for each target try to get weaken/grow/hack locks via writing lock request to outLock (port 15) and polling locks (port 6) → when lock granted, compute threads and ns.run the appropriate task script (weaken.js/grow.js/hack.js) → release lock by writing done flag.
  - Also supports EXP farming (reads port 5), and share behavior (port 17). Announces host on port 11 when started.

- Task scripts (hack.js, grow.js, weaken.js)
  - Parse positional args, build a task object { target, host, task, done, threads, ram, security }, write initial task to a reporting port (13 or 14), await the operation (ns.hack/ns.grow/ns.weaken), then mark task.done and write the task again to the same port.

- Orchestrator (restart-scripts.js)
  - Kills local processes (except a small whitelist), optionally killall on other hosts listed in port 2 (if present), clears ports 1..20, optionally writes "share" to port 17, and starts management scripts according to flags.

Data flow (high-level)
-
1. A controller/script populates targets/status/locks into ports (common ports: 1 targets, 3 status, 6 locks).
2. Worker daemons (hack-daemon.js) peek those ports (ns.getPortHandle(...).peek()) and decide per-target whether to attempt weaken/grow/hack.
3. To avoid concurrent conflicting operations the worker writes a lock request object to outLock (port 15) and polls the lock state on locks port (port 6) until a lock is assigned.
4. When assigned, the worker computes required threads (using ns.getScriptRam, ns.hackAnalyze, ns.growthAnalyze, etc.) and launches the short-lived task script (ns.run("weaken.js", threads, ...)). The worker stores the returned PID for bookkeeping.
5. Task scripts report an "incoming" task object to a reporting port (port 13 normal, 14 EXP) before starting, and a completed task object afterwards (task.done = true).
6. The coordinator/lock-manager consumes these port messages (not all logic is in a single file in this repo; the communication protocol is the primary contract).

IPC / Ports used (quick reference)
-
- port 1: gTargets — JSON-encoded array of target objects (input for workers)
- port 2: host listing (used by restart-scripts.js to kill host processes)
- port 3: gStatus — JSON status info about targets
- port 5: gExp — JSON array of EXP farm targets
- port 6: gLock — JSON lock state (who owns weaken/grow/hack locks for targets)
- port 11: worker announces host via ns.tryWritePort(11, host)
- port 13: task reporting (normal tasks) — written by hack/grow/weaken scripts
- port 14: task reporting (EXP tasks)
- port 15: outLock — workers write lock request objects here to request locks
- port 17: share flag — toggle triggers shareCPU.js behavior
- port 18: host-kill requests — optional/killServer.js writes hostnames here
- port 20: fKill — global kill switch; if non-empty worker daemons exit

Task object shape (observed)
-
Example task object (as JSON) used by task scripts:

```
{
  "target": "n00dles",
  "host": "pserv-5",
  "task": "hack",    // or "grow" / "weaken"
  "done": false,      // set true when the task completes
  "threads": 12,
  "ram": 2.4,
  "security": 0.05
}
```

External integrations
-
- Bitburner Netscript `ns` API only (ns.run, ns.hack, ns.grow, ns.weaken, ns.getPortHandle, ns.tryWritePort, ns.peek, ns.readPort, ns.getServer* APIs, ns.share, etc.)

Configuration & conventions
-
- No centralized config files. Scripts typically declare small configuration blocks at the top of their `main` function (e.g., `homeReservedRAM`, `expRuns`, `maxIncome`) which are sometimes overridden by positional arguments (`ns.args`).
- Filename conventions are mixed in the repository (kebab-case and some camelCase like `shareCPU.js`).

Build & deploy
-
- There is no build step. To deploy, copy the `.js` files into the Bitburner game File Editor or use an automated uploader and run scripts inside the game.
- Typical start sequence (from home) to bootstrap the system:
  1. Run `restart-scripts.js` (this kills existing processes, clears ports, writes share flag optionally and starts the core daemons).
  2. Ensure worker scripts (hack-daemon.js) are running on purchased/remote servers.
  3. Let the coordinator/target provider populate port 1/3/6 so workers can do work.

Testing
-
- No automated tests or CI detected in the repository. There are no test files or test framework configs.

Known issues / notable inconsistencies
-
- Filename styles are inconsistent: mostly kebab-case (e.g., `hack-daemon.js`) but some camelCase/mixed (`shareCPU.js`, `toggleShare.js`).
- Variable declaration styles vary: older files use `var`, newer ones `const`/`let`. Some files have bugs where `const` is reassigned (e.g., `hacknet-mgr.js` has a `const` that is later assigned from `ns.args`).
- Error handling pattern across scripts is to log via `ns.print`/`ns.tprint` and `return`, not throw exceptions.

If you need a diagram or a lightweight central lock manager extracted from the current port-based protocol, I can produce a small design doc or patch to centralize port constants into a single file.
