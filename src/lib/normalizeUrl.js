/**
 * Normalize a URL for storage and deduplication.
 * - Trims whitespace
 * - Lowercases the host
 * - Removes trailing slash on the path
 * - Strips utm_* query params
 *
 * Returns the normalized URL string, or the original string if it cannot be
 * parsed (so callers can still display it).
 *
 * @param {string} raw
 * @returns {string}
 */
export function normalizeUrl(raw) {
  if (!raw || typeof raw !== 'string') return raw ?? ''
  const trimmed = raw.trim()
  if (!trimmed) return trimmed

  let url
  try {
    // Prepend https:// if no protocol given, so URL() can parse it
    url = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`)
  } catch {
    // Not a valid URL — return as-is so the caller can surface the error
    return trimmed
  }

  // Lowercase the host
  url.hostname = url.hostname.toLowerCase()

  // Remove utm_* params
  const keysToDelete = []
  url.searchParams.forEach((_, key) => {
    if (key.toLowerCase().startsWith('utm_')) keysToDelete.push(key)
  })
  keysToDelete.forEach(k => url.searchParams.delete(k))

  // Remove trailing slash from pathname (but keep root '/')
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1)
  }

  return url.toString()
}

/**
 * Returns true if the string is a valid absolute URL (http or https).
 * Empty string is considered valid (field is optional).
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isValidUrl(value) {
  if (!value || !value.trim()) return true // optional field
  try {
    const url = new URL(value.trim().includes('://') ? value.trim() : `https://${value.trim()}`)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
