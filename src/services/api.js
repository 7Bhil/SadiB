// Mock data pour éviter les erreurs réseau en développement
const mockProducts = [
  {
    id: '1',
    name: 'Collier Éclat Lunaire',
    category: 'Colliers',
    reference: 'CL-001',
    price: 2450,
    currency: 'EUR',
    description: 'Un collier élégant avec pierres fines et argent 925.',
    badges: ['Nouveauté', 'Exclusif']
  },
  {
    id: '2',
    name: 'Bracelet Solaire',
    category: 'Bracelets',
    reference: 'BR-002',
    price: 1800,
    currency: 'EUR',
    description: 'Bracelet en or jaune 18 carats avec diamants.',
    badges: ['Best-seller']
  },
  {
    id: '3',
    name: 'Boucles d\'oreilles Étoiles',
    category: 'Boucles d\'oreilles',
    reference: 'BE-003',
    price: 950,
    currency: 'EUR',
    description: 'Boucles d\'oreilles en or blanc avec saphirs.',
    badges: []
  },
  {
    id: '4',
    name: 'Anneau Harmonie',
    category: 'Anneaux',
    reference: 'AN-004',
    price: 1200,
    currency: 'EUR',
    description: 'Anneau en platine avec émeraude centrale.',
    badges: ['Collection Limitée']
  }
]

// Simuler un délai réseau pour une expérience réaliste
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchProducts() {
  // Simuler un délai de chargement
  await delay(800)
  
  // Simuler une erreur aléatoire (10% de chance)
  if (Math.random() < 0.1) {
    throw new Error('Erreur de connexion au serveur')
  }
  
  return mockProducts
}

export async function submitContactForm(payload) {
  // Simuler l'envoi du formulaire
  await delay(1000)
  
  console.log('Formulaire de contact:', payload)
  
  return {
    success: true,
    message: 'Message envoyé avec succès'
  }
}

