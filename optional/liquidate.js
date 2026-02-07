/**
 * optional/liquidate.js - Liquidates positions or clears ports as needed.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run optional/liquidate.js
 * ```
 *
 * Requirements:
 * - API: ns.peek, ns.tprint, ns.clearPort, ns.tryWritePort
 * - RAM: TODO (suggested: 0.6 GB)
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/optional/liquidate.js
 */

/** @param {NS} ns */
export async function main(ns) {
	if (ns.peek(19) == "share") {
        ns.tprint("Clearing liquidation...");
        await ns.clearPort(19);
	ns.tprint("Have a nice day :)");
    } else {
        ns.tprint("Liquidating assets...");
        await ns.tryWritePort(19, "sell");
		ns.tprint("Mo' Money Mo' Money ;)");
    }
}
