---
date: 2026-02-08
topic: "ns.nFormat Migration"
status: draft
---

## Problem Statement

The `ns.nFormat` function in Bitburner scripts has been marked as deprecated and will soon be removed. This function is widely used for formatting monetary values, RAM sizes, percentages, and other quantities. To maintain compatibility and prevent runtime errors, we need to migrate all instances of `ns.nFormat` to the recommended alternatives (`ns.formatNumber`, `ns.formatRam`, or `ns.formatPercent`).

## Constraints

1. The migration must ensure minimal disruption to existing functionality.
2. While the formatting output may differ due to API changes, it must remain functionally acceptable.
3. The solution must strictly adhere to documented Bitburner APIs.

## Approach

### Inline API Replacement

We will directly replace all instances of `ns.nFormat` with the appropriate Bitburner APIs. This ensures minimal complexity and aligns with the latest recommendations.

### Proposed Replacements

| Use Case               | `ns.nFormat` Pattern  | Replacement                |
|------------------------|-----------------------|----------------------------|
| Monetary Values        | `$0.00a`, `$0.000a`  | `ns.formatNumber`          |
| RAM Sizes              | `0.00b`              | `ns.formatRam`             |
| Percentages            | `0.00%`              | `ns.formatPercent`         |

## Architecture

### Migration Process

1. **Identify `ns.nFormat` Usages:**
   - Use search tools to locate all instances of `ns.nFormat` in the codebase.

2. **Replace with Appropriate APIs:**
   - Replace `ns.nFormat` with:
     - `ns.formatNumber` for monetary values and general numbers.
     - `ns.formatRam` for RAM sizes.
     - `ns.formatPercent` for percentages.

3. **Testing:**
   - Verify outputs manually or through script execution.
   - Note that output differences are expected due to API changes.

4. **Documentation:**
   - Update code comments to reflect the new API usage.

## Data Flow

- **Input:** Values such as monetary amounts, RAM sizes, or percentages.
- **Processing:** Values are passed to the corresponding `ns` API function for formatting.
- **Output:** Formatted values are returned directly to the calling scripts.

## Error Handling

- Validate input values before formatting.
- Log warnings for any unexpected scenarios during migration.
- Provide fallback values for invalid inputs.

## Testing Strategy

1. **Manual Verification:**
   - Validate formatting outputs script-by-script to ensure replacements function correctly.

2. **Rollback Plan:**
   - Maintain a branch with the old `ns.nFormat` usages for quick restoration if issues arise.

---