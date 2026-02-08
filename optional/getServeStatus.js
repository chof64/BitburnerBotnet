/**
 * optional/getServeStatus.js - Reports server status and metrics.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run optional/getServeStatus.js [ThresholdModifier] [Server] [Server] ...
 * ```
 *
 * Requirements:
 * - API: ns.serverExists, ns.getServerMaxMoney, ns.getServerMinSecurityLevel, ns.getServerRam, ns.getServerSecurityLevel, ns.getServerMoneyAvailable, ns.formatNumber, ns.getServerGrowth, ns.sleep, ns.tprint
 * - RAM: TODO (suggested: 2.2 GB)
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/optional/getServeStatus.js
 */

/** @param {NS} ns */
export async function main(ns) {

	if (!ns.args.length) {
		ns.tprint("ERROR: Arguements = [ThresholdModifier] [Server] [Server] [Server]...")
		return;
	}

	var threshModifier = 0.75;
	if (ns.args.length > 1) {
		threshModifier = parseFloat(ns.args[0]);
		if (threshModifier <= 0) {
			ns.tprint("ERROR: Threshold is set to [" + threshModifier + "]");
			return;
		}
	}

	while (true) {
		for (var i = 1; i < ns.args.length; i++) {
			var target = ns.args[i];

			ns.tprint("Target: " + target);

			if (!ns.serverExists(target)) {
				ns.tprint("ERROR: Server [" + target + "] does not exist");
				continue;
			}

			var moneyTreshold = ns.getServerMaxMoney(target) * threshModifier;
			var securityThreshold = ns.getServerMinSecurityLevel(target) + 5;

			ns.tprint(`RAM: ${ns.getServerRam(target)}`);
			ns.tprint("Security: " + ns.getServerSecurityLevel(target) + " / " + securityThreshold);
            ns.tprint("Money: " + ns.formatNumber(ns.getServerMoneyAvailable(target)) + " / " + ns.formatNumber(moneyTreshold) + " (" + ns.formatNumber(ns.getServerMaxMoney(target)) + ")");
			ns.tprint("Growth: " + ns.getServerGrowth(target));
		}

		await ns.sleep(1000);
		return;
	}
}
