const WHATSAPP_NUMBER = '33197038901' // +33 1 97 03 89 01

export function buildWhatsAppUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!message) return base

  const encoded = encodeURIComponent(message)
  return `${base}?text=${encoded}`
}

