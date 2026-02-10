<template>
  <div class="checkout-view">
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Finalisation</span>
        <h2>Finaliser votre Commande</h2>
        <p>Dernière étape avant de recevoir vos créations SadiB</p>
      </div>
    </section>

    <section class="checkout-content">
      <div class="container">
        <div class="checkout-grid">
          <!-- Order Summary -->
          <div class="order-summary">
            <h3>Récapitulatif de la commande</h3>
            <div class="summary-items">
              <div v-for="item in cartItems" :key="item.id" class="summary-item">
                <div class="item-info">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-quantity">x{{ item.quantity }}</span>
                </div>
                <span class="item-price">{{ formatPrice(item.price * item.quantity, item.currency) }}</span>
              </div>
            </div>
            
            <div class="summary-totals">
              <div class="total-line">
                <span>Sous-total</span>
                <span>{{ formatPrice(cartTotal, 'XOF') }}</span>
              </div>
              <div class="total-line">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div class="total-line final">
                <span>Total</span>
                <span>{{ formatPrice(cartTotal, 'XOF') }}</span>
              </div>
            </div>
          </div>

          <!-- Checkout Form -->
          <div class="checkout-form">
            <form @submit.prevent="submitOrder">
              <!-- Contact Information -->
              <div class="form-section">
                <h3>Informations de contact</h3>
                <div class="form-grid">
                  <div class="form-group">
                    <label for="firstName">Prénom *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="orderData.firstName"
                      required
                      class="form-input"
                    >
                  </div>
                  <div class="form-group">
                    <label for="lastName">Nom *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      v-model="orderData.lastName"
                      required
                      class="form-input"
                    >
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="phone">Téléphone *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="orderData.phone"
                    required
                    placeholder="+229 XX XX XX XX"
                    class="form-input"
                  >
                </div>
                
                <div class="form-group">
                  <label for="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="orderData.email"
                    placeholder="votre@email.com"
                    class="form-input"
                  >
                </div>
              </div>

              <!-- Delivery Information -->
              <div class="form-section">
                <h3>Adresse de livraison</h3>
                <div class="form-group">
                  <label for="address">Adresse complète *</label>
                  <textarea 
                    id="address" 
                    v-model="orderData.address"
                    required
                    rows="3"
                    class="form-input"
                    placeholder="Numéro, rue, quartier..."
                  ></textarea>
                </div>
                
                <div class="form-grid">
                  <div class="form-group">
                    <label for="city">Ville *</label>
                    <input 
                      type="text" 
                      id="city" 
                      v-model="orderData.city"
                      required
                      class="form-input"
                    >
                  </div>
                  <div class="form-group">
                    <label for="postalCode">Code postal</label>
                    <input 
                      type="text" 
                      id="postalCode" 
                      v-model="orderData.postalCode"
                      class="form-input"
                    >
                  </div>
                </div>
              </div>

              <!-- Delivery Method -->
              <div class="form-section">
                <h3>Mode de livraison</h3>
                <div class="delivery-options">
                  <label class="delivery-option">
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="standard"
                      v-model="orderData.deliveryMethod"
                      checked
                    >
                    <div class="option-content">
                      <span class="option-title">Livraison standard</span>
                      <span class="option-desc">3-5 jours ouvrés</span>
                      <span class="option-price">Gratuite</span>
                    </div>
                  </label>
                  
                  <label class="delivery-option">
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="express"
                      v-model="orderData.deliveryMethod"
                    >
                    <div class="option-content">
                      <span class="option-title">Livraison express</span>
                      <span class="option-desc">24-48h</span>
                      <span class="option-price">2 000 XOF</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Order Notes -->
              <div class="form-section">
                <h3>Notes de commande</h3>
                <div class="form-group">
                  <textarea 
                    id="notes" 
                    v-model="orderData.notes"
                    rows="3"
                    class="form-input"
                    placeholder="Instructions spéciales pour votre commande..."
                  ></textarea>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="form-actions">
                <button 
                  type="submit" 
                  class="btn btn-gold btn-large"
                  :disabled="isSubmitting"
                >
                  <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fab fa-whatsapp"></i>
                  {{ isSubmitting ? 'Traitement...' : 'Finaliser sur WhatsApp' }}
                </button>
                
                <router-link to="/panier" class="btn btn-outline">
                  Retour au panier
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const router = useRouter()
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.total)
const isSubmitting = ref(false)

const orderData = ref({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  deliveryMethod: 'standard',
  notes: ''
})

const formatPrice = (price, currency = 'XOF') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(price)
}

const generateOrderNumber = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `SAD-${year}${month}${day}-${random}`
}

const submitOrder = async () => {
  try {
    isSubmitting.value = true
    
    const orderNumber = generateOrderNumber()
    
    // Build order summary for WhatsApp
    let message = `📋 NOUVELLE COMMANDE SADIB\n\n`
    message += `🔢 Numéro: ${orderNumber}\n`
    message += `📅 Date: ${new Date().toLocaleDateString('fr-FR')}\n\n`
    
    message += `👤 CLIENT:\n`
    message += `${orderData.value.firstName} ${orderData.value.lastName}\n`
    message += `📱 ${orderData.value.phone}\n`
    if (orderData.value.email) message += `📧 ${orderData.value.email}\n`
    message += `\n`
    
    message += `📍 LIVRAISON:\n`
    message += `${orderData.value.address}\n`
    message += `${orderData.value.city} ${orderData.value.postalCode}\n`
    message += `Mode: ${orderData.value.deliveryMethod === 'express' ? 'Express (24-48h)' : 'Standard (3-5j)'}\n\n`
    
    message += `🛍️ COMMANDE:\n`
    cartItems.value.forEach(item => {
      message += `• ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity, item.currency)}\n`
    })
    
    message += `\n💰 TOTAL: ${formatPrice(cartTotal.value, 'XOF')}\n\n`
    
    if (orderData.value.notes) {
      message += `📝 NOTES: ${orderData.value.notes}\n\n`
    }
    
    message += `Merci de confirmer cette commande et procéder au paiement.`
    
    // Open WhatsApp with order details
    const whatsappUrl = buildWhatsAppUrl(message)
    window.open(whatsappUrl, '_blank')
    
    // Save order to localStorage for tracking
    const order = {
      id: orderNumber,
      date: new Date().toISOString(),
      customer: {
        firstName: orderData.value.firstName,
        lastName: orderData.value.lastName,
        phone: orderData.value.phone,
        email: orderData.value.email
      },
      delivery: {
        address: orderData.value.address,
        city: orderData.value.city,
        postalCode: orderData.value.postalCode,
        method: orderData.value.deliveryMethod
      },
      items: cartItems.value,
      total: cartTotal.value,
      status: 'pending',
      notes: orderData.value.notes
    }
    
    // Save to orders history
    const orders = JSON.parse(localStorage.getItem('sadiB-orders') || '[]')
    orders.push(order)
    localStorage.setItem('sadiB-orders', JSON.stringify(orders))
    
    // Clear cart and redirect to confirmation
    cartStore.clearCart()
    
    setTimeout(() => {
      router.push({
        name: 'order-confirmation',
        params: { id: orderNumber }
      })
    }, 2000)
    
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
    alert('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.page-header {
  padding: 150px 5% 60px;
  text-align: center;
  background: linear-gradient(to bottom, #121212, var(--color-black));
}

.checkout-content {
  padding: 60px 0 100px;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 60px;
  align-items: start;
}

.order-summary {
  background: var(--color-surface);
  padding: 40px;
  border-radius: 12px;
  position: sticky;
  top: 100px;
}

.order-summary h3 {
  font-size: 20px;
  margin-bottom: 30px;
  color: var(--color-text);
}

.summary-items {
  margin-bottom: 30px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(249, 245, 241, 0.1);
}

.item-info {
  flex: 1;
}

.item-name {
  display: block;
  color: var(--color-text);
  margin-bottom: 4px;
}

.item-quantity {
  color: var(--color-text-muted);
  font-size: 14px;
}

.item-price {
  font-weight: 600;
  color: var(--color-gold);
}

.summary-totals {
  border-top: 2px solid var(--color-gold);
  padding-top: 20px;
}

.total-line {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.total-line.final {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-gold);
}

.checkout-form {
  background: var(--color-surface);
  padding: 40px;
  border-radius: 12px;
}

.form-section {
  margin-bottom: 40px;
}

.form-section h3 {
  font-size: 20px;
  margin-bottom: 25px;
  color: var(--color-text);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--color-text);
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 15px;
  background: var(--color-black);
  border: 1px solid rgba(249, 245, 241, 0.2);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 16px;
  transition: var(--transition-smooth);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-gold);
}

.delivery-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.delivery-option {
  display: flex;
  align-items: center;
  padding: 20px;
  background: var(--color-black);
  border: 1px solid rgba(249, 245, 241, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.delivery-option:hover {
  border-color: var(--color-gold);
}

.delivery-option input[type="radio"] {
  margin-right: 15px;
}

.option-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.option-title {
  font-weight: 500;
  color: var(--color-text);
}

.option-desc {
  color: var(--color-text-muted);
  font-size: 14px;
}

.option-price {
  color: var(--color-gold);
  font-weight: 600;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.btn-large {
  padding: 18px 30px;
  font-size: 16px;
  width: 100%;
  justify-content: center;
}

@media (max-width: 1024px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .option-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>
