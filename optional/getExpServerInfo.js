/**
 * optional/getExpServerInfo.js - Reports server info useful for EXP farming.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run optional/getExpServerInfo.js
 * ```
 *
 * Requirements:
 * - API: ns.getPortHandle, ns.tprint, ns.getServerMaxMoney, ns.getServerRequiredHackingLevel, ns.getServerSecurityLevel, ns.formatNumber, ns.formatRam, ns.formatPercent, ns.getServerMoneyAvailable, ns.getServerGrowth
 * - RAM: TODO (suggested: 2.0 GB)
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/optional/getExpServerInfo.js
 */

/** @param {NS} ns */
export async function main(ns) {
	var gExp = ns.getPortHandle(5);
	if (gExp.peek() == "NULL PORT DATA") {
		ns.tprint("No EXP servers found!");
		return;
	}

	var jEXp = JSON.parse(gExp.peek());
	jEXp.sort((a, b) => ns.getServerMaxMoney(b.target) - ns.getServerMaxMoney(a.target));

	for (var i = 0; i < jEXp.length; i++) {
		var target = jEXp[i].target;
		ns.tprint(`Host: ${target}\t (HL ${ns.getServerRequiredHackingLevel(target)})`);
		ns.tprint(`Security: ${ns.formatNumber(ns.getServerSecurityLevel(target))} / ${ns.getServerMinSecurityLevel(target) + 5}`);
		ns.tprint(`Money: ${ns.formatNumber(ns.getServerMoneyAvailable(target))} / ${ns.formatNumber(ns.getServerMaxMoney(target))}`);
		ns.tprint(`Growth: ${ns.getServerGrowth(target)}`);
		ns.tprint("");
	}
}
