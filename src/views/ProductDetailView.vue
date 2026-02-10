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
        <div class="product-layout">
          <!-- Product Images -->
          <div class="product-gallery">
            <div class="main-image">
              <div class="image-container">
                <div class="product-image">
                  <div class="icon-product-image">
                    <i class="fas fa-gem"></i>
                    <div class="product-overlay-text">{{ product.name }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="image-thumbnails">
              <div 
                v-for="index in 3" 
                :key="index"
                class="thumbnail"
                :class="{ active: currentImage === index }"
                @click="currentImage = index"
              >
                <div class="thumbnail-placeholder">
                  <i class="fas fa-gem"></i>
                  <span>{{ index }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Information -->
          <div class="product-details">
            <div class="product-header">
              <div class="product-badges" v-if="product.badges && product.badges.length">
                <span v-for="badge in product.badges" :key="badge" class="badge">
                  {{ badge }}
                </span>
              </div>
              
              <h1 class="product-title">{{ product.name }}</h1>
              <p class="product-reference">Référence: {{ product.reference }}</p>
              <p class="product-category">{{ product.category }}</p>
            </div>

            <div class="price-section">
              <div class="price-info">
                <span class="current-price">{{ formatPrice(product.price, product.currency) }}</span>
                <span v-if="!isInStock" class="out-of-stock">Rupture de stock</span>
                <span v-else-if="product.stock <= 3" class="low-stock">Plus que {{ product.stock }} disponibles</span>
              </div>
            </div>

            <div class="purchase-actions">
              <button 
                class="btn btn-gold btn-large" 
                @click="addToCart"
                :disabled="!isInStock"
              >
                <i class="fas fa-shopping-cart"></i>
                {{ isInStock ? 'Ajouter au panier' : 'Indisponible' }}
              </button>
              
              <a
                :href="buildProductWhatsAppUrl(product)"
                target="_blank"
                class="btn btn-outline btn-large"
              >
                <i class="fab fa-whatsapp"></i>
                Commander sur WhatsApp
              </a>
              
              <button class="btn-favorite" @click="toggleFavorite">
                <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
                {{ isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
              </button>
            </div>

            <div class="product-description">
              <h3>Description</h3>
              <p>{{ product.description }}</p>
            </div>

            <div class="product-specs">
              <h3>Caractéristiques</h3>
              <div class="specs-grid">
                <div class="spec-item" v-if="product.materials">
                  <span class="spec-label">Matériaux:</span>
                  <span class="spec-value">{{ product.materials.join(', ') }}</span>
                </div>
                <div class="spec-item" v-if="product.dimensions">
                  <span class="spec-label">Dimensions:</span>
                  <span class="spec-value">{{ product.dimensions }}</span>
                </div>
                <div class="spec-item" v-if="product.weight">
                  <span class="spec-label">Poids:</span>
                  <span class="spec-value">{{ product.weight }}</span>
                </div>
              </div>
            </div>

            <div class="product-features">
              <h3>Services inclus</h3>
              <ul>
                <li><i class="fas fa-check"></i> Certificat d'authenticité</li>
                <li><i class="fas fa-check"></i> Livraison sécurisée</li>
                <li><i class="fas fa-check"></i> Garantie 2 ans</li>
                <li><i class="fas fa-check"></i> Emballage premium</li>
              </ul>
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
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const product = ref(null)
const loading = ref(true)
const error = ref('')
const currentImage = ref(1)
const isFavorite = ref(false)

const productId = computed(() => route.params.id)

const isInStock = computed(() => {
  return product.value && product.value.stock > 0
})

const addToCart = () => {
  if (product.value && isInStock.value) {
    cartStore.addToCart(product.value, 1)
    // Show success notification
    const notification = document.createElement('div')
    notification.className = 'cart-notification'
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Produit ajouté au panier!</span>
    `
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-gold);
      color: var(--color-black);
      padding: 15px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out'
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // TODO: Sauvegarder dans localStorage ou backend
}

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
  gap: 10px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 16px;
  transition: var(--transition-smooth);
}

.back-link:hover {
  color: var(--color-gold);
}

.product-content {
  padding: 40px 0 80px;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

/* Gallery Styles */
.product-gallery {
  position: sticky;
  top: 100px;
}

.main-image {
  margin-bottom: 20px;
}

.image-container {
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-surface);
}

.product-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
}

.image-placeholder-large {
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #1a1a1a, #2D1B4D);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
}

.image-placeholder-large i {
  font-size: 48px;
  margin-bottom: 20px;
}

.image-thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: var(--transition-smooth);
}

.thumbnail:hover {
  border-color: var(--color-gold);
}

.icon-product-image {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.icon-product-image i {
  font-size: 80px;
  color: var(--color-gold);
  margin-bottom: 20px;
  animation: gold-shimmer 3s ease-in-out infinite;
}

.product-overlay-text {
  color: var(--color-text);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 0 20px;
}

.thumbnail-placeholder {
  width: 100%;
  height: 80px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.thumbnail-placeholder i {
  font-size: 24px;
  color: var(--color-gold);
  margin-bottom: 4px;
}

.thumbnail-placeholder span {
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: 600;
}

.thumbnail:hover .thumbnail-placeholder {
  background: linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%);
}

.thumbnail:hover .thumbnail-placeholder i {
  color: #d4af37;
}

@keyframes gold-shimmer {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.thumbnail.active {
  border-color: var(--color-gold);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Details */
.product-details {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.product-header {
  border-bottom: 1px solid rgba(249, 245, 241, 0.1);
  padding-bottom: 20px;
}

.product-badges {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.badge {
  background: var(--color-gold);
  color: var(--color-black);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.product-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
  line-height: 1.2;
}

.product-reference {
  color: var(--color-text-muted);
  font-size: 14px;
  margin-bottom: 5px;
}

.product-category {
  color: var(--color-gold);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
}

.price-section {
  margin-bottom: 30px;
}

.current-price {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-gold);
  display: block;
  margin-bottom: 10px;
}

.out-of-stock {
  color: #ff4444;
  font-size: 16px;
  font-weight: 500;
  display: block;
  margin-top: 10px;
}

.low-stock {
  color: #ff9800;
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-top: 5px;
}

.purchase-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.btn-large {
  padding: 18px 30px;
  font-size: 16px;
  width: 100%;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  background: rgba(212, 175, 55, 0.1);
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.product-description,
.product-specs,
.product-features {
  background: var(--color-surface);
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.product-description h3,
.product-specs h3,
.product-features h3 {
  font-size: 18px;
  color: var(--color-text);
  margin-bottom: 15px;
}

.product-description p {
  color: var(--color-text-muted);
  line-height: 1.6;
}

.specs-grid {
  display: grid;
  gap: 15px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(249, 245, 241, 0.1);
}

.spec-label {
  color: var(--color-text-muted);
  font-size: 14px;
}

.spec-value {
  color: var(--color-text);
  font-weight: 500;
  text-align: right;
}

.product-features ul {
  list-style: none;
  padding: 0;
}

.product-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  color: var(--color-text);
}

.product-features i {
  color: var(--color-gold);
}

/* Loading and Error States */
.loading-section,
.error-section {
  padding: 100px 5%;
  text-align: center;
}

.luxury-loader {
  color: var(--color-gold);
}

.luxury-loader i {
  font-size: 48px;
  margin-bottom: 20px;
}

.error-message {
  background: var(--color-surface);
  padding: 40px;
  border-radius: 12px;
  text-align: center;
}

.error-message i {
  font-size: 48px;
  color: #ff4444;
  margin-bottom: 20px;
}

.error-message h3 {
  color: var(--color-text);
  margin-bottom: 15px;
}

.error-message p {
  color: var(--color-text-muted);
  margin-bottom: 30px;
}

/* Cart notification animations */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .product-gallery {
    position: static;
  }
  
  .product-image img,
  .image-placeholder-large {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .product-content {
    padding: 20px 0 40px;
  }
  
  .product-title {
    font-size: 24px;
  }
  
  .current-price {
    font-size: 28px;
  }
  
  .purchase-actions {
    gap: 12px;
  }
  
  .product-description,
  .product-specs,
  .product-features {
    padding: 20px;
  }
}
</style>
