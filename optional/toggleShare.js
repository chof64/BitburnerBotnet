/**
 * optional/toggleShare.js - Toggles sharing behavior across the botnet via a port flag.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run optional/toggleShare.js
 * ```
 *
 * Requirements:
 * - API: ns.peek, ns.tprint, ns.clearPort, ns.tryWritePort
 * - RAM: TODO (suggested: 0.6 GB)
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/optional/toggleShare.js
 */

/** @param {NS} ns */
export async function main(ns) {
    if (ns.peek(17) == "share") {
        ns.tprint("Telling private servers to stop sharing...");
        await ns.clearPort(17);
    } else {
        ns.tprint("Telling private servers to start sharing...");
        await ns.tryWritePort(17, "share");
    }
	ns.tprint("Have a nice day :)");
}
