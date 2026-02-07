/**
 * shareCPU.js - Runs ns.share() to boost contracts and reputation.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run shareCPU.js
 * ```
 *
 * Requirements:
 * - API: ns.peek, ns.share, ns.sleep
 * - RAM: TODO (suggested: 0.1 GB)
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/shareCPU.js
 */

/** @param {NS} ns */
export async function main(ns) {
	while (ns.peek(17) != "NULL PORT DATA" && ns.peek(20) == "NULL PORT DATA") {
		await ns.share();
		await ns.sleep(1000);
	}
}
