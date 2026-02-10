<template>
  <div class="shop-view">
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Le Catalogue</span>
        <h2>La Boutique SadiB</h2>
        <p>Découvrez les créations SadiB et finalisez vos commandes directement sur WhatsApp.</p>
      </div>
    </section>

    <section class="shop-content">
      <div class="container">
        <div v-if="loading" class="content-placeholder">
          <div class="luxury-loader">
            <i class="fas fa-gem gold-shimmer"></i>
            <p>Chargement de la collection...</p>
          </div>
        </div>

        <div v-else>
          <p v-if="error" class="error-message">
            {{ error }}
          </p>

          <div v-else-if="products.length === 0" class="empty-state">
            <p>Aucun produit n’est disponible pour le moment.</p>
          </div>

          <div v-else class="product-grid">
            <router-link
              v-for="product in products"
              :key="product.id"
              :to="`/produit/${product.id}`"
              class="product-card reveal"
            >
              <div class="product-image">
                <div class="image-placeholder">
                  <i class="fas fa-gem"></i>
                  <span>{{ product.name }}</span>
                </div>
              </div>
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="category">{{ product.category }}</p>
                <p class="reference">Réf. {{ product.reference }}</p>
                <p class="price">
                  {{ formatPrice(product.price, product.currency) }}
                </p>

                <div v-if="product.badges?.length" class="badges">
                  <span
                    v-for="badge in product.badges"
                    :key="badge"
                    class="badge"
                  >
                    {{ badge }}
                  </span>
                </div>

                <div class="quick-actions">
                  <span class="view-details">
                    <i class="fas fa-eye"></i>
                    Voir détails
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts } from '../services/api'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const products = ref([])
const loading = ref(true)
const error = ref('')

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

    products.value = await fetchProducts()
  } catch (e) {
    error.value = e?.message || 'Impossible de charger les produits pour le moment.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page-header {
  padding: 150px 5% 60px;
  text-align: center;
  background: linear-gradient(to bottom, #121212, var(--color-black));
}

.shop-content {
  padding: 60px 0 100px;
}

.content-placeholder {
  min-height: 300px;
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
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  margin-top: 40px;
}

.product-card {
  background: var(--color-surface);
  padding-bottom: 24px;
  cursor: pointer;
  transition: var(--transition-smooth);
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-card:hover {
  transform: translateY(-8px);
  text-decoration: none;
  color: inherit;
}

.product-image {
  height: 320px;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--color-text-muted);
}

.image-placeholder i {
  font-size: 40px;
  color: var(--color-royal-light);
}

.image-placeholder span {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.product-info {
  padding: 20px;
  text-align: center;
}

.product-info h3 {
  font-size: 20px;
  margin-bottom: 4px;
}

.category {
  font-size: 12px;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.reference {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.price {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.badges {
  display: flex;
  justify-content: center;
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

.quick-actions {
  margin-top: 14px;
  text-align: center;
}

.view-details {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-gold);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  transition: var(--transition-smooth);
}

.product-card:hover .view-details {
  opacity: 1;
}

.btn-whatsapp {
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(37, 211, 102, 0.7);
  color: #25d366;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.error-message {
  color: #ff6b6b;
  text-align: center;
}

.empty-state {
  text-align: center;
  color: var(--color-text-muted);
}
</style>
