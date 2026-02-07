/**
 * optional/sendkill.js - Sends kill signals to target processes via ports.
 *
 * Author: Zharay (Original Repository: https://github.com/Zharay/BitburnerBotnet)
 *
 * Usage:
 * ```
 * run optional/sendkill.js
 * ```
 *
 * Requirements:
 * - API: ns.tprint, ns.tryWritePort
 * - RAM: TODO (suggested: 0.1 GB)
 *
 * File URL: https://raw.githubusercontent.com/chof64/BitburnerBotnet/main/optional/sendkill.js
 */

/** @param {NS} ns */
export async function main(ns) {
    ns.tprint("Sending Kill Command...");
    await ns.tryWritePort(20, "die");
    ns.tprint("Have a nice day :)");
}
