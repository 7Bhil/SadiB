export function trackEvent(action, label) {
  const payload = {
    event: action,
    label,
    timestamp: new Date().toISOString(),
  }

  // Google Analytics v4 (gtag) if present
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: 'interaction',
      event_label: label,
    })
    return
  }

  // Fallback: console log (ne casse rien si GA n’est pas configuré)
  // eslint-disable-next-line no-console
  console.debug('[trackEvent]', payload)
}

