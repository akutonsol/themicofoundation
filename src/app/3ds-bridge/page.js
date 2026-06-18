'use client';
import { useEffect } from 'react';

// Same-origin bridge for the PowerTranz 3DS RedirectData.
//
// We must NOT render the RedirectData via an iframe `srcDoc`: a form POST from
// an `about:srcdoc` document (opaque origin) to PowerTranz's cross-origin
// /Api/spi/Conductor endpoint gets mishandled by browsers as a *download*
// (the infamous "conductor" file), leaving the iframe blank and stuck.
//
// Instead the parent stores the RedirectData HTML in sessionStorage and points
// the iframe at this same-origin route. We then replace this document with the
// RedirectData via document.write, so the 3DS form submits from a real,
// same-origin document and the Conductor response renders normally.
export default function ThreeDSBridge() {
  useEffect(() => {
    let html = '';
    try { html = sessionStorage.getItem('mf_3ds_rd') || ''; } catch {}
    if (!html) return;
    try {
      document.open();
      document.write(html);
      document.close();
    } catch (e) {
      // If document.write is unavailable, fall back to writing into body.
      document.body.innerHTML = html;
    }
  }, []);

  return null;
}
