<template>
  <div class="order-confirmation-view">
    <section class="confirmation-section">
      <div class="container">
        <div class="confirmation-card">
          <div class="success-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          
          <h1>Commande Confirmée!</h1>
          <h2>Merci pour votre confiance</h2>
          
          <div class="order-details">
            <div class="detail-item">
              <span class="label">Numéro de commande:</span>
              <span class="value">{{ orderId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Date:</span>
              <span class="value">{{ formatDate(order.date) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Total:</span>
              <span class="value">{{ formatPrice(order.total, 'XOF') }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Statut:</span>
              <span class="value status" :class="statusClass">{{ getStatusText(order.status) }}</span>
            </div>
          </div>
          
          <div class="next-steps">
            <h3>Prochaines étapes</h3>
            <div class="steps">
              <div class="step">
                <div class="step-icon">
                  <i class="fab fa-whatsapp"></i>
                </div>
                <div class="step-content">
                  <h4>Confirmation WhatsApp</h4>
                  <p>Nous vous avons contacté sur WhatsApp pour finaliser les détails de paiement.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">
                  <i class="fas fa-credit-card"></i>
                </div>
                <div class="step-content">
                  <h4>Paiement</h4>
                  <p>Effectuez le paiement selon les modalités discutées.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">
                  <i class="fas fa-box"></i>
                </div>
                <div class="step-content">
                  <h4>Préparation</h4>
                  <p>Votre commande est préparée avec soin (1-2 jours).</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">
                  <i class="fas fa-truck"></i>
                </div>
                <div class="step-content">
                  <h4>Livraison</h4>
                  <p>Recevez vos créations SadiB à votre adresse.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="actions">
            <router-link to="/boutique" class="btn btn-gold">
              <i class="fas fa-gem"></i>
              Continuer mes achats
            </router-link>
            <router-link to="/mes-commandes" class="btn btn-outline">
              <i class="fas fa-list"></i>
              Suivre ma commande
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = ref(route.params.id)
const order = ref(null)

const statusClass = computed(() => {
  if (!order.value) return ''
  return `status-${order.value.status}`
})

const formatPrice = (price, currency = 'XOF') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'En attente de confirmation',
    'confirmed': 'Confirmée',
    'preparing': 'En préparation',
    'shipped': 'Expédiée',
    'delivered': 'Livrée',
    'cancelled': 'Annulée'
  }
  return statusMap[status] || status
}

onMounted(() => {
  // Load order from localStorage
  const orders = JSON.parse(localStorage.getItem('sadiB-orders') || '[]')
  order.value = orders.find(o => o.id === orderId.value)
  
  if (!order.value) {
    // Order not found, redirect to home
    window.location.href = '/'
  }
})
</script>

<style scoped>
.confirmation-section {
  padding: 100px 5% 60px;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.confirmation-card {
  max-width: 800px;
  margin: 0 auto;
  background: var(--color-surface);
  padding: 60px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.success-icon {
  font-size: 80px;
  color: #4CAF50;
  margin-bottom: 30px;
  animation: successPulse 0.6s ease-out;
}

@keyframes successPulse {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

h1 {
  font-size: 36px;
  color: var(--color-text);
  margin-bottom: 10px;
}

h2 {
  font-size: 20px;
  color: var(--color-text-muted);
  margin-bottom: 40px;
  font-weight: 400;
}

.order-details {
  background: var(--color-black);
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 40px;
  text-align: left;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(249, 245, 241, 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.label {
  color: var(--color-text-muted);
  font-size: 14px;
}

.value {
  color: var(--color-text);
  font-weight: 600;
}

.status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-pending {
  background: rgba(255, 193, 7, 0.2);
  color: #FFC107;
}

.status-confirmed {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.status-preparing {
  background: rgba(33, 150, 243, 0.2);
  color: #2196F3;
}

.status-shipped {
  background: rgba(156, 39, 176, 0.2);
  color: #9C27B0;
}

.status-delivered {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.next-steps {
  text-align: left;
  margin-bottom: 40px;
}

.next-steps h3 {
  font-size: 20px;
  color: var(--color-text);
  margin-bottom: 25px;
  text-align: center;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.step-icon {
  width: 50px;
  height: 50px;
  background: var(--color-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-black);
  font-size: 18px;
  flex-shrink: 0;
}

.step-content h4 {
  font-size: 16px;
  color: var(--color-text);
  margin-bottom: 8px;
}

.step-content p {
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1.4;
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .confirmation-card {
    padding: 40px 20px;
  }
  
  .steps {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .actions .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
