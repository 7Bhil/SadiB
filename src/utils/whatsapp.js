const WHATSAPP_NUMBER = '2290197038901' // +229 01 97 03 89 01

export function buildWhatsAppUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!message) return base

  const encoded = encodeURIComponent(message)
  return `${base}?text=${encoded}`
}

