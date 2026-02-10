// Simuler un délai réseau pour une expérience réaliste
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchProducts() {
  try {
    // Simuler un délai de chargement
    await delay(800)
    
    // Charger les produits depuis le fichier JSON
    const response = await fetch('/products.json')
    if (!response.ok) {
      throw new Error('Erreur de chargement des produits')
    }
    
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error)
    
    // Fallback vers les données mock si le JSON n'est pas disponible
    const mockProducts = [
      {
        id: '1',
        name: 'Collier Éclat Lunaire',
        category: 'Colliers',
        reference: 'CL-001',
        price: 2450,
        currency: 'XOF',
        description: 'Un collier élégant avec pierres fines et argent 925.',
        badges: ['Nouveauté', 'Exclusif']
      },
      {
        id: '2',
        name: 'Bracelet Solaire',
        category: 'Bracelets',
        reference: 'BR-002',
        price: 1800,
        currency: 'XOF',
        description: 'Bracelet en or jaune 18 carats avec diamants.',
        badges: ['Best-seller']
      }
    ]
    
    return mockProducts
  }
}

export async function fetchProductById(id) {
  try {
    const products = await fetchProducts()
    return products.find(product => product.id === parseInt(id))
  } catch (error) {
    console.error('Erreur lors du chargement du produit:', error)
    return null
  }
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

