'use client'

import { set, unset } from 'sanity'

/**
 * Reflow pasted text so hard line-breaks inside a paragraph become flowing text,
 * while blank-line paragraph breaks are preserved.
 *
 *   "The Foundation\nwas formed\n\nIt grew."  →  "The Foundation was formed\n\nIt grew."
 */
export function reflowPastedText(input) {
  return String(input)
    .replace(/\r\n?/g, '\n')        // normalise CRLF / CR → LF
    .replace(/[ \t]+\n/g, '\n')     // drop trailing spaces before a newline
    .split(/\n{2,}/)                // paragraphs are separated by blank lines
    .map(p =>
      p.replace(/\n+/g, ' ')        // join wrapped lines within a paragraph
       .replace(/[ \t]{2,}/g, ' ')  // collapse runs of whitespace
       .trim()
    )
    .filter(Boolean)
    .join('\n\n')
}

function isTextType(schemaType) {
  // True when "text" appears anywhere in the field's type chain (covers inline
  // `type: 'text'` fields and any aliases that extend it). Plain `string`,
  // numbers, objects, arrays, etc. never match.
  let t = schemaType
  while (t) {
    if (t.name === 'text') return true
    t = t.type
  }
  return false
}

/**
 * Global Studio input resolver. Leaves every field rendering at its default,
 * but for `text` fields intercepts paste (capture phase) and inserts the
 * reflowed text in place of the raw clipboard content.
 */
export function smartPasteInput(props) {
  if (!isTextType(props.schemaType)) return props.renderDefault(props)

  const { onChange, value = '' } = props

  const handlePaste = event => {
    const target = event.target
    if (!target || target.tagName !== 'TEXTAREA') return
    const pasted = event.clipboardData?.getData('text/plain')
    if (!pasted) return

    event.preventDefault()
    event.stopPropagation()

    const cleaned = reflowPastedText(pasted)
    const start = typeof target.selectionStart === 'number' ? target.selectionStart : value.length
    const end   = typeof target.selectionEnd   === 'number' ? target.selectionEnd   : value.length
    const next  = value.slice(0, start) + cleaned + value.slice(end)

    onChange(next ? set(next) : unset())

    // Restore the caret to just after the inserted text on the next frame.
    requestAnimationFrame(() => {
      try { target.selectionStart = target.selectionEnd = start + cleaned.length } catch {}
    })
  }

  return <div onPasteCapture={handlePaste}>{props.renderDefault(props)}</div>
}
