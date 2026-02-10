<template>
  <div class="product-detail-view">
    <section class="page-header">
      <div class="container">
        <router-link to="/boutique" class="back-link">
          <i class="fas fa-arrow-left"></i>
          Retour à la boutique
        </router-link>
      </div>
    </section>

    <section v-if="loading" class="loading-section">
      <div class="container">
        <div class="luxury-loader">
          <i class="fas fa-gem gold-shimmer"></i>
          <p>Chargement du produit...</p>
        </div>
      </div>
    </section>

    <section v-else-if="error" class="error-section">
      <div class="container">
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Produit non trouvé</h3>
          <p>{{ error }}</p>
          <router-link to="/boutique" class="btn-gold">
            Retour à la boutique
          </router-link>
        </div>
      </div>
    </section>

    <section v-else-if="product" class="product-content">
      <div class="container">
        <div class="product-grid">
          <div class="product-image-section">
            <div class="main-image">
              <div class="image-placeholder-large">
                <i class="fas fa-gem"></i>
                <span>{{ product.name }}</span>
              </div>
            </div>
            
            <div class="image-thumbnails">
              <div 
                v-for="i in 3" 
                :key="i"
                class="thumbnail"
                :class="{ active: currentImage === i }"
                @click="currentImage = i"
              >
                <div class="thumbnail-placeholder">
                  <i class="fas fa-gem"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="product-info-section">
            <div class="product-header">
              <span class="category">{{ product.category }}</span>
              <h1>{{ product.name }}</h1>
              <p class="reference">Référence: {{ product.reference }}</p>
            </div>

            <div class="price-section">
              <div class="price">
                {{ formatPrice(product.price, product.currency) }}
              </div>
              
              <div v-if="product.badges?.length" class="badges">
                <span
                  v-for="badge in product.badges"
                  :key="badge"
                  class="badge"
                >
                  {{ badge }}
                </span>
              </div>
            </div>

            <div class="description-section">
              <h3>Description</h3>
              <p>{{ product.description }}</p>
            </div>

            <div class="product-features">
              <h3>Caractéristiques</h3>
              <ul>
                <li><i class="fas fa-check"></i> Matériaux de haute qualité</li>
                <li><i class="fas fa-check"></i> Certificat d'authenticité inclus</li>
                <li><i class="fas fa-check"></i> Livraison sécurisée</li>
                <li><i class="fas fa-check"></i> Garantie 2 ans</li>
              </ul>
            </div>

            <div class="action-section">
              <a
                :href="buildProductWhatsAppUrl(product)"
                target="_blank"
                rel="noopener"
                class="btn-whatsapp-large"
              >
                <i class="fab fa-whatsapp"></i>
                Commander sur WhatsApp
              </a>
              
              <button class="btn-favorite" @click="toggleFavorite">
                <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
                {{ isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProductById } from '../services/api'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const error = ref('')
const currentImage = ref(1)
const isFavorite = ref(false)

const productId = computed(() => route.params.id)

const formatPrice = (amount, currency) => {
  if (typeof amount !== 'number') return ''
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency || 'XOF'
  }).format(amount)
}

const buildProductWhatsAppUrl = (product) => {
  const name = product?.name || ''
  const reference = product?.reference || ''
  const message = `Bonjour, je souhaite finaliser une commande pour le bijou "${name}" (réf. ${reference}) chez SadiB.`
  return buildWhatsAppUrl(message)
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // TODO: Sauvegarder dans localStorage ou backend
}

onMounted(async () => {
  try {
    loading.value = true
    error.value = ''
    
    const foundProduct = await fetchProductById(productId.value)
    
    if (foundProduct) {
      product.value = foundProduct
    } else {
      error.value = 'Ce produit n\'existe pas ou n\'est plus disponible.'
    }
  } catch (e) {
    error.value = e?.message || 'Impossible de charger le produit.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page-header {
  padding: 150px 5% 40px;
  background: linear-gradient(to bottom, #121212, var(--color-black));
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-gold);
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: var(--transition-smooth);
}

.back-link:hover {
  color: var(--color-gold-light);
  transform: translateX(-4px);
}

.loading-section, .error-section {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.luxury-loader {
  text-align: center;
  color: var(--color-gold);
}

.luxury-loader i {
  font-size: 48px;
  margin-bottom: 20px;
}

.gold-shimmer {
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.5; transform: scale(1); }
}

.error-message {
  text-align: center;
  color: var(--color-text);
}

.error-message i {
  font-size: 48px;
  color: #ff6b6b;
  margin-bottom: 20px;
}

.error-message h3 {
  margin-bottom: 10px;
}

.product-content {
  padding: 60px 0 100px;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.product-image-section {
  position: sticky;
  top: 100px;
}

.main-image {
  margin-bottom: 20px;
}

.image-placeholder-large {
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #1a1a1a, #2D1B4D);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 8px;
}

.image-placeholder-large i {
  font-size: 84px;
  color: var(--color-gold);
  opacity: 0.2;
}

.image-thumbnails {
  display: flex;
  gap: 12px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.thumbnail.active {
  border-color: var(--color-gold);
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.thumbnail-placeholder i {
  color: var(--color-royal-light);
  opacity: 0.5;
}

.product-info-section {
  padding: 20px 0;
}

.product-header {
  margin-bottom: 30px;
}

.category {
  display: inline-block;
  color: var(--color-gold);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.product-header h1 {
  font-size: 42px;
  margin-bottom: 10px;
  line-height: 1.2;
}

.reference {
  color: var(--color-text-muted);
  font-size: 14px;
}

.price-section {
  margin-bottom: 40px;
}

.price {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: 15px;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(212, 175, 55, 0.5);
}

.description-section {
  margin-bottom: 40px;
}

.description-section h3 {
  font-size: 20px;
  margin-bottom: 15px;
}

.description-section p {
  line-height: 1.8;
  color: var(--color-text-muted);
}

.product-features {
  margin-bottom: 40px;
}

.product-features h3 {
  font-size: 20px;
  margin-bottom: 20px;
}

.product-features ul {
  list-style: none;
}

.product-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.product-features i {
  color: var(--color-gold);
}

.action-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn-whatsapp-large {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 8px;
  border: 2px solid rgba(37, 211, 102, 0.7);
  background: rgba(37, 211, 102, 0.1);
  color: #25d366;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: var(--transition-smooth);
}

.btn-whatsapp-large:hover {
  background: rgba(37, 211, 102, 0.2);
  transform: translateY(-2px);
}

.btn-favorite {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  background: transparent;
  color: var(--color-text);
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.btn-favorite:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .product-image-section {
    position: static;
  }
}

@media (max-width: 768px) {
  .product-header h1 {
    font-size: 32px;
  }
  
  .price {
    font-size: 24px;
  }
  
  .image-placeholder-large {
    height: 300px;
  }
}
</style>
