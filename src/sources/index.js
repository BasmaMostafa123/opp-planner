/**
 * Source plugin interface (JSDoc reference — not enforced at runtime).
 *
 * Every source plugin must export a default object matching this shape:
 *
 * @typedef {Object} SourcePlugin
 * @property {string}   id     - Unique machine identifier, e.g. "manual", "whatsapp"
 * @property {string}   name   - Human-readable label shown in the UI
 * @property {Function} ingest - (data: RawOpportunity) => Promise<{ opportunityId: string }>
 *
 * @typedef {Object} RawOpportunity
 * @property {string}      title
 * @property {string}      [organization]
 * @property {string|null} [deadline]      - ISO date string or null
 * @property {string}      [requirements]
 * @property {string}      [link]          - Already normalized by the caller
 * @property {string}      [how_to_apply]
 * @property {string}      source          - Must equal the plugin's id
 *
 * The ingest function is responsible for:
 *   1. Inserting the opportunities row
 *   2. Inserting the applications row with status "New"
 *   3. Inserting the events row with type "created"
 *
 * If any step fails, it must roll back everything already written and throw
 * an error so the caller can surface it to the user.
 */

// Re-export so callers can import from one place:
// import { SOURCE_INTERFACE_VERSION } from '@/sources/index.js'
export const SOURCE_INTERFACE_VERSION = 1
