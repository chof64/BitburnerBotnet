/**	An log only script that reports the current status of our botnet's activities.
 * Driven 100% by port data
 * 	Written By: Zharay
 * 	URL: https://github.com/Zharay/BitburnerBotnet
**/

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");

    // Inline formatting replacements used instead of a helper function

	// Options
	const showTargetCount = false;
	const showHostCount = false;

	var serverProcesses = ns.ps();
	var coordinatorID = 0;

	serverProcesses.forEach ( function(x) {
		if (x.filename == "coordinator.js")
			coordinatorID = x.pid;
	});

	var gTargets = ns.getPortHandle(1);
	var gHosts = ns.getPortHandle(2);
	var gStatus = ns.getPortHandle(3);
	var gRam = ns.getPortHandle(4);
	var gExp = ns.getPortHandle(5);

	while(gTargets.peek() == "NULL PORT DATA" && gStatus.peek() == "NULL PORT DATA") {
		ns.print("Waiting for data...");
		await ns.sleep(500);
	}

	await ns.sleep(1000);

	var runTime = 0;
	while (ns.isRunning(coordinatorID)) {
		ns.clearLog();

		var rawTargets = gTargets.peek();
		var rawHosts = gHosts.peek();
		var rawStatus = gStatus.peek();
		var rawRam = gRam.peek();
		var rawExp = gExp.peek();

		if (rawTargets != "NULL PORT DATA" && rawStatus != "NULL PORT DATA") {
			var jTargets = JSON.parse(rawTargets);
			var jStatus = JSON.parse(rawStatus);

			if (jTargets.length == jStatus.length) {
				for(var i = 0; i < jTargets.length; i++) {

					if (isNaN(jTargets[i].security) || isNaN(jTargets[i].curMoney) || isNaN(jTargets[i].maxMoney) || !jStatus[i].isTarget)
						continue;

					var TIX = jStatus[i].TIX != "" ? `[${jStatus[i].TIX}]` : "";
					var stockLabel = jStatus[i].isLong ? "   [L] " : (jStatus[i].isShort ? "   [S]" : "");
					ns.print(`Target: ${jTargets[i].target} ${TIX} ${stockLabel}     (HL ${jTargets[i].hackerLevel})`);
                    ns.print(`Security: ${ns.formatNumber(jTargets[i].security)}  / ${(jTargets[i].minSecurity+5)} [${ns.formatNumber(jStatus[i].security)}]`);
                    ns.print(`Money: $${ns.formatNumber(jTargets[i].curMoney)} / $${ns.formatNumber(jTargets[i].maxMoney)} [${'$' + ns.formatNumber(jTargets[i].maxMoney * jTargets[i].thresholdModifier)}]`);
                    ns.print(`Growth: ${jTargets[i].growth} | Hack Chance: ${ns.formatPercent(ns.hackAnalyzeChance(jTargets[i].target))}`);
                    if (jStatus[i].isLong || jStatus[i].isShort) ns.print(`Longs?: ${jStatus[i].isLong} | Shorts?: ${jStatus[i].isShort} | pChng: ${ns.formatPercent(jStatus[i].profitChange)}`);

					if (isNaN(jStatus[i].hackRam) || isNaN(jStatus[i].growRam) || isNaN(jStatus[i].weakenRam))
						continue;

                    ns.print(`Hack: ${jStatus[i].hackThreads} threads | ${ns.formatRam(jStatus[i].hackRam * Math.pow(1000,3))} RAM`);
                    ns.print(`Grow: ${jStatus[i].growThreads} threads | ${ns.formatRam(jStatus[i].growRam * Math.pow(1000,3))} RAM`);
                    ns.print(`Weak: ${jStatus[i].weakenThreads} threads | ${ns.formatRam(jStatus[i].weakenRam * Math.pow(1000,3))} RAM`);
					ns.print(" ");
				}
			}
		}

		if (rawExp != "NULL PORT DATA") {
			var jExp = JSON.parse(rawExp);
			var eHack = 0, eGrow = 0, eWeak = 0;

			jExp.forEach( function(x) {
				if (isNaN(x.hackThreads) || isNaN(x.growThreads) || isNaN(x.weakenThreads))
					return;

				eHack += Math.floor(x.hackThreads);
				eGrow += Math.floor(x.growThreads);
				eWeak += Math.floor(x.weakenThreads);
			} );
			ns.print(`EXP Threads: ${eHack} H | ${eGrow} G | ${eWeak} W`);
			ns.print(" ");
		}

		if (rawRam != "NULL PORT DATA") {
			var jRam = JSON.parse(rawRam);
			if (isNaN(jRam.usedRam) || isNaN(jRam.totalRam))
				continue;
            ns.print(`${ns.formatRam(jRam.usedRam * Math.pow(1000,3))} / ${ns.formatRam(jRam.totalRam * Math.pow(1000,3))} (${ns.formatPercent((jRam.totalRam == 0 ? 0 : jRam.usedRam / jRam.totalRam))})`);
		}

		if (showTargetCount && rawTargets != "NULL PORT DATA") {
			ns.print(`Number of Targets: ${JSON.parse(rawTargets).length}`);
		}

		if (showHostCount && rawHosts != "NULL PORT DATA") {
			ns.print(`Number of Hosts: ${JSON.parse(rawHosts).length}`);
		}

		ns.print(`Runtime: ${ns.tFormat(runTime*1000)}`);
		runTime++;
		await ns.sleep(1000);
	}
}
