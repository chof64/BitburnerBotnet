/**
 * optional/killServer.js - Utility to kill scripts on a specified server.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run optional/killServer.js [hostname]
 * ```
 *
 * Requirements:
 * - API: ns.disableLog, ns.args, ns.tprint, ns.serverExists, ns.tryWritePort
 * - RAM: TODO (suggested: 0.6 GB)
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/optional/killServer.js
 */

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");

	var host = "";
	if (ns.args.length) {
		host = ns.args[0];
	} else {
		ns.tprint("ERROR: No host set!");
		ns.tprint("run killServer.js [hostname]");
		return;
	}

	if (!ns.serverExists(host)) {
		ns.tprint(`ERROR: Host [${host}] does not exist!`)
		ns.tprint("run killServer.js [hostname]");
		return;
	}

	await ns.tryWritePort(18, host);
	ns.tprint(`Send kill request to [${host}]!`);
}
