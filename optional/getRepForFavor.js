/**
 * optional/getRepForFavor.js - Calculates reputation needed for a faction favor.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run optional/getRepForFavor.js [targetFavor] [currentRep]
 * ```
 *
 * Requirements:
 * - API: ns.tprint, ns.args
 * - RAM: TODO (suggested: 0.6 GB)
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/optional/getRepForFavor.js
 */

function repNeededForFavor(targetFavor) {

    let favorGain = 0;
    let rep = 0;

    let ReputationToFavorBase = 500;
    let ReputationToFavorMult = 1.02;

    let reqdRep = ReputationToFavorBase;
    while (favorGain < targetFavor) {
        rep += reqdRep;
        ++favorGain;
        reqdRep *= ReputationToFavorMult;
    }

    return rep;
}

export async function main(ns) {
    if (ns.args.length != 2) {
        ns.tprint("Usage: getRepForFavor.js [target favor] [current rep]");
        return;
    }
    let targetFavor = ns.args[0];
    let currentRep = ns.args[1];

    let repNeeded = repNeededForFavor(targetFavor);


    ns.tprint(`You need ${repNeeded.toLocaleString()} total reputation to get ${targetFavor} favor.`);
}
