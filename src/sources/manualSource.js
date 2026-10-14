import { supabase } from '../lib/supabase.js'

/**
 * "manual" source plugin.
 *
 * Implements the source interface defined in src/sources/index.js.
 * The /add screen calls manualSource.ingest(data) — it does NOT
 * talk to Supabase directly.
 *
 * Rollback strategy: if applications or events insert fails, we
 * delete what we already created so no half-saved item is left behind.
 */

const manualSource = {
  id: 'manual',
  name: 'Manual entry',

  /**
   * @param {import('./index.js').RawOpportunity} data
   * @returns {Promise<{ opportunityId: string }>}
   */
  async ingest(data) {
    // ── Step 1: Insert the opportunity ────────────────────────────────────
    const { data: opp, error: oppErr } = await supabase
      .from('opportunities')
      .insert({
        title: data.title,
        organization: data.organization || null,
        deadline: data.deadline || null,
        requirements: data.requirements || null,
        link: data.link || null,
        how_to_apply: data.how_to_apply || null,
        source: 'manual',
      })
      .select('id')
      .single()

    if (oppErr) throw new Error(`Failed to save opportunity: ${oppErr.message}`)

    const opportunityId = opp.id

    // ── Step 2: Insert the application row with status "New" ──────────────
    const { data: app, error: appErr } = await supabase
      .from('applications')
      .insert({
        opportunity_id: opportunityId,
        status: 'New',
      })
      .select('id')
      .single()

    if (appErr) {
      // Roll back the opportunity
      await supabase.from('opportunities').delete().eq('id', opportunityId)
      throw new Error(`Failed to save application: ${appErr.message}`)
    }

    // ── Step 3: Insert the "created" event ────────────────────────────────
    const { error: evtErr } = await supabase
      .from('events')
      .insert({
        opportunity_id: opportunityId,
        type: 'created',
      })

    if (evtErr) {
      // Roll back both application and opportunity
      await supabase.from('applications').delete().eq('id', app.id)
      await supabase.from('opportunities').delete().eq('id', opportunityId)
      throw new Error(`Failed to save event: ${evtErr.message}`)
    }

    return { opportunityId }
  },
}

export default manualSource
