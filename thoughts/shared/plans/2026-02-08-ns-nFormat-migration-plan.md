# ns.nFormat Migration Implementation Plan

**Goal:** Replace all instances of the deprecated `ns.nFormat` with Bitburner-supported APIs (`ns.formatNumber`, `ns.formatRam`, `ns.formatPercent`).

**Architecture:**
- Directly replace `ns.nFormat` calls inline with appropriate Bitburner APIs.
- No utility modules or abstractions will be introduced.
- Testing will rely on manual validation inside Bitburner.
- Work will be done directly on the main branch. No separate branches will be used.

**Design:** [ns.nFormat Migration Design](../designs/2026-02-08-ns-nFormat-migration-design.md)

---

## Dependency Graph

```
Batch 1 (parallel): Replace instances of ns.nFormat, divided by file.
```

---

## Batch 1: Replace `ns.nFormat` (divided by file)

All tasks in this batch have NO dependencies and can run simultaneously.

### Task Assignments
Each task focuses on replacing `ns.nFormat` instances in the specified file.

#### Task 1.1: `optional/getExpServerInfo.js`
**Replace:**
- Monetary values → `ns.formatNumber`
- RAM sizes → `ns.formatRam`
- Percentages → `ns.formatPercent`

#### Task 1.2: `stock-bot-v2.js`
**Replace:**
- Monetary values → `ns.formatNumber`

#### Task 1.3: `corpo.js`
**Replace:**
- Monetary values → `ns.formatNumber`

#### Task 1.4: `gang-nullsec.js`
**Replace:**
- Monetary values → `ns.formatNumber`
- Percentages → `ns.formatPercent`

#### Task 1.5: `hacknet-mgr.js`
**Replace:**
- Monetary values → `ns.formatNumber`
- RAM sizes → `ns.formatRam`

#### Task 1.6: `stock-bot.js`
**Replace:**
- Monetary values → `ns.formatNumber`

#### Task 1.7: `buy-server.js`
**Replace:**
- Monetary values → `ns.formatNumber`
- RAM sizes → `ns.formatRam`

#### Task 1.8: `optional/getServeStatus.js`
**Replace:**
- Monetary values → `ns.formatNumber`

#### Task 1.9: `coordinator.js`
**Replace:**
- RAM sizes → `ns.formatRam`

#### Task 1.10: `check-status.js`
**Replace:**
- Monetary values → `ns.formatNumber`
- RAM sizes → `ns.formatRam`
- Percentages → `ns.formatPercent`

---

### Examples of Replacement

```typescript
// Old:
const formatted = ns.nFormat(value, "$0.00a");

// New:
const formatted = ns.formatNumber(value);

// Old:
const ramFormatted = ns.nFormat(ram, "0.00b");

// New:
const ramFormatted = ns.formatRam(ram);

// Old:
const percentFormatted = ns.nFormat(percentage, "0.00%");

// New:
const percentFormatted = ns.formatPercent(percentage);
```

---

### Rollback Plan
- Manual handling of commits and changes if issues arise.

---

### Commit
`feat: migrate from ns.nFormat to Bitburner-supported APIs`