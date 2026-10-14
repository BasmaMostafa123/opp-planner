import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import manualSource from '../sources/manualSource.js'
import { normalizeUrl, isValidUrl } from '../lib/normalizeUrl.js'

// ─── Field config ────────────────────────────────────────────────────────────
const INITIAL = {
  title: '',
  organization: '',
  deadline: '',
  requirements: '',
  link: '',
  how_to_apply: '',
}

// ─── Reusable field components ───────────────────────────────────────────────
function FieldLabel({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300 mb-1.5">
      {children}
      {required && <span className="text-brand ml-1">*</span>}
    </label>
  )
}
FieldLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
}
FieldLabel.defaultProps = { required: false }

function FieldError({ message }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
        <path fillRule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>
      {message}
    </p>
  )
}
FieldError.propTypes = { message: PropTypes.string }

const inputClass =
  'w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-3 ' +
  'text-white placeholder-slate-500 text-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent ' +
  'transition-all min-h-[44px]'

const inputErrorClass =
  'w-full bg-navy-900 border border-red-500/60 rounded-xl px-4 py-3 ' +
  'text-white placeholder-slate-500 text-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent ' +
  'transition-all min-h-[44px]'

// ─── Validation ──────────────────────────────────────────────────────────────
function validate(fields) {
  const errors = {}
  if (!fields.title.trim()) {
    errors.title = 'Title is required.'
  }
  if (fields.link && !isValidUrl(fields.link)) {
    errors.link = 'Please enter a valid URL (e.g. https://example.com).'
  }
  return errors
}

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function AddOpportunity() {
  const navigate = useNavigate()
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')

    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus first errored field
      const firstKey = Object.keys(validationErrors)[0]
      document.getElementById(`field-${firstKey}`)?.focus()
      return
    }

    setSaving(true)
    try {
      await manualSource.ingest({
        title: fields.title.trim(),
        organization: fields.organization.trim(),
        deadline: fields.deadline || null,
        requirements: fields.requirements.trim(),
        link: fields.link.trim() ? normalizeUrl(fields.link.trim()) : null,
        how_to_apply: fields.how_to_apply.trim(),
        source: 'manual',
      })
      navigate('/', { replace: true })
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="flex-1 flex flex-col pb-24 px-4 pt-6 overflow-y-auto">
      {/* Header */}
      <header className="mb-6">
        <p className="text-sm text-brand font-semibold tracking-widest uppercase mb-1">Manual entry</p>
        <h1 className="text-2xl font-bold text-white">Add Opportunity</h1>
        <p className="text-slate-400 text-sm mt-1">Fill in what you know — you can edit later.</p>
      </header>

      {/* Global save error */}
      {submitError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 bg-red-500/10 border border-red-500/30
                     rounded-xl px-4 py-3 text-sm text-red-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               className="w-5 h-5 shrink-0 mt-0.5">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

        {/* Title — required */}
        <div>
          <FieldLabel htmlFor="field-title" required>Title</FieldLabel>
          <input
            id="field-title"
            name="title"
            type="text"
            autoComplete="off"
            placeholder="e.g. Google Summer of Code 2025"
            value={fields.title}
            onChange={handleChange}
            className={errors.title ? inputErrorClass : inputClass}
            aria-describedby={errors.title ? 'err-title' : undefined}
            aria-required="true"
          />
          <FieldError message={errors.title} />
        </div>

        {/* Organization */}
        <div>
          <FieldLabel htmlFor="field-organization">Organization</FieldLabel>
          <input
            id="field-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="e.g. Google, UNICEF, MIT"
            value={fields.organization}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Deadline */}
        <div>
          <FieldLabel htmlFor="field-deadline">Deadline</FieldLabel>
          <input
            id="field-deadline"
            name="deadline"
            type="date"
            value={fields.deadline}
            onChange={handleChange}
            className={inputClass + ' [color-scheme:dark]'}
          />
          <p className="mt-1.5 text-xs text-slate-500">Optional — leave blank if unknown.</p>
        </div>

        {/* Link */}
        <div>
          <FieldLabel htmlFor="field-link">Link</FieldLabel>
          <input
            id="field-link"
            name="link"
            type="url"
            autoComplete="url"
            placeholder="https://example.com/opportunity"
            value={fields.link}
            onChange={handleChange}
            className={errors.link ? inputErrorClass : inputClass}
            aria-describedby={errors.link ? 'err-link' : undefined}
            inputMode="url"
          />
          <FieldError message={errors.link} />
        </div>

        {/* Requirements */}
        <div>
          <FieldLabel htmlFor="field-requirements">Requirements</FieldLabel>
          <textarea
            id="field-requirements"
            name="requirements"
            rows={4}
            placeholder="What skills, documents or eligibility criteria are needed?"
            value={fields.requirements}
            onChange={handleChange}
            className={inputClass + ' resize-none min-h-[110px]'}
          />
        </div>

        {/* How to apply */}
        <div>
          <FieldLabel htmlFor="field-how_to_apply">How to apply</FieldLabel>
          <textarea
            id="field-how_to_apply"
            name="how_to_apply"
            rows={3}
            placeholder="Steps to apply, email to contact, portal link, etc."
            value={fields.how_to_apply}
            onChange={handleChange}
            className={inputClass + ' resize-none min-h-[88px]'}
          />
        </div>

        {/* Save button */}
        <button
          id="btn-save"
          type="submit"
          disabled={saving}
          className="btn-primary w-full mt-2"
          aria-busy={saving}
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4Z" />
              </svg>
              Saving…
            </span>
          ) : (
            'Save opportunity'
          )}
        </button>

        {/* Required field hint */}
        <p className="text-center text-xs text-slate-500 -mt-2 pb-2">
          <span className="text-brand">*</span> Required field
        </p>
      </form>
    </main>
  )
}
