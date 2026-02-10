<template>
  <div class="orders-view">
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Suivi</span>
        <h2>Mes Commandes</h2>
        <p>Suivez l'état de vos commandes SadiB</p>
      </div>
    </section>

    <section class="orders-content">
      <div class="container">
        <div v-if="loading" class="loading-state">
          <div class="luxury-loader">
            <i class="fas fa-gem gold-shimmer"></i>
            <p>Chargement de vos commandes...</p>
          </div>
        </div>

        <div v-else-if="orders.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-clipboard-list"></i>
          </div>
          <h3>Vous n'avez pas encore de commande</h3>
          <p>Découvrez nos créations exclusives et passez votre première commande.</p>
          <router-link to="/boutique" class="btn btn-gold">
            <i class="fas fa-gem"></i>
            Découvrir la boutique
          </router-link>
        </div>

        <div v-else class="orders-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <div class="order-header">
              <div class="order-info">
                <h3>Commande {{ order.id }}</h3>
                <p class="order-date">{{ formatDate(order.date) }}</p>
              </div>
              <div class="order-status">
                <span class="status-badge" :class="getStatusClass(order.status)">
                  {{ getStatusText(order.status) }}
                </span>
              </div>
            </div>

            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <div class="item-image">
                  <div class="image-placeholder">
                    <i class="fas fa-gem"></i>
                  </div>
                </div>
                <div class="item-details">
                  <h4>{{ item.name }}</h4>
                  <p class="item-category">{{ item.category }}</p>
                  <p class="item-quantity">Quantité: {{ item.quantity }}</p>
                </div>
                <div class="item-price">
                  {{ formatPrice(item.price * item.quantity, item.currency) }}
                </div>
              </div>
            </div>

            <div class="order-summary">
              <div class="summary-line">
                <span>Total commande:</span>
                <span>{{ formatPrice(order.total, 'XOF') }}</span>
              </div>
              <div class="summary-line">
                <span>Livraison:</span>
                <span>{{ order.delivery.address }}</span>
              </div>
            </div>

            <div class="order-timeline">
              <h4>Historique</h4>
              <div class="timeline">
                <div 
                  v-for="(step, index) in getTimelineSteps(order.status)" 
                  :key="index"
                  class="timeline-item"
                  :class="{ active: step.completed, current: step.current }"
                >
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h5>{{ step.title }}</h5>
                    <p>{{ step.description }}</p>
                    <span v-if="step.date" class="timeline-date">{{ formatDate(step.date) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="order-actions">
              <button 
                v-if="order.status === 'pending'" 
                class="btn btn-outline"
                @click="cancelOrder(order.id)"
              >
                <i class="fas fa-times"></i>
                Annuler la commande
              </button>
              
              <a 
                :href="buildWhatsAppUrl(`Bonjour, je souhaite suivre ma commande ${order.id}`)"
                target="_blank"
                class="btn btn-gold"
              >
                <i class="fab fa-whatsapp"></i>
                Contacter SadiB
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const orders = ref([])
const loading = ref(true)

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
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'En attente',
    'confirmed': 'Confirmée',
    'preparing': 'En préparation',
    'shipped': 'Expédiée',
    'delivered': 'Livrée',
    'cancelled': 'Annulée'
  }
  return statusMap[status] || status
}

const getStatusClass = (status) => {
  return `status-${status}`
}

const getTimelineSteps = (status) => {
  const steps = [
    {
      title: 'Commande créée',
      description: 'Votre commande a été reçue',
      completed: true,
      current: status === 'pending'
    },
    {
      title: 'Confirmée',
      description: 'Commande confirmée par SadiB',
      completed: ['confirmed', 'preparing', 'shipped', 'delivered'].includes(status),
      current: status === 'confirmed'
    },
    {
      title: 'En préparation',
      description: 'Vos bijoux sont en préparation',
      completed: ['preparing', 'shipped', 'delivered'].includes(status),
      current: status === 'preparing'
    },
    {
      title: 'Expédiée',
      description: 'Votre commande est en route',
      completed: ['shipped', 'delivered'].includes(status),
      current: status === 'shipped'
    },
    {
      title: 'Livrée',
      description: 'Commande livrée avec succès',
      completed: status === 'delivered',
      current: status === 'delivered'
    }
  ]
  
  if (status === 'cancelled') {
    return steps.slice(0, 1).concat([{
      title: 'Annulée',
      description: 'La commande a été annulée',
      completed: true,
      current: true
    }])
  }
  
  return steps
}

const cancelOrder = async (orderId) => {
  if (!confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
    return
  }
  
  try {
    // Update order status in localStorage
    const ordersList = JSON.parse(localStorage.getItem('sadiB-orders') || '[]')
    const orderIndex = ordersList.findIndex(o => o.id === orderId)
    
    if (orderIndex > -1) {
      ordersList[orderIndex].status = 'cancelled'
      localStorage.setItem('sadiB-orders', JSON.stringify(ordersList))
      
      // Update local state
      orders.value = ordersList
      
      // Send cancellation message via WhatsApp
      const message = `Bonjour, je souhaite annuler ma commande ${orderId}.`
      window.open(buildWhatsAppUrl(message), '_blank')
    }
  } catch (error) {
    console.error('Erreur lors de l\'annulation:', error)
    alert('Une erreur est survenue. Veuillez réessayer.')
  }
}

onMounted(() => {
  // Load orders from localStorage
  setTimeout(() => {
    orders.value = JSON.parse(localStorage.getItem('sadiB-orders') || '[]')
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.page-header {
  padding: 150px 5% 60px;
  text-align: center;
  background: linear-gradient(to bottom, #121212, var(--color-black));
}

.orders-content {
  padding: 60px 0 100px;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 80px 0;
}

.empty-icon {
  font-size: 64px;
  color: var(--color-gold);
  margin-bottom: 30px;
}

.empty-state h3 {
  font-size: 28px;
  margin-bottom: 15px;
  color: var(--color-text);
}

.empty-state p {
  color: var(--color-text-muted);
  margin-bottom: 40px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.order-card {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(249, 245, 241, 0.1);
}

.order-info h3 {
  font-size: 20px;
  color: var(--color-text);
  margin-bottom: 5px;
}

.order-date {
  color: var(--color-text-muted);
  font-size: 14px;
}

.status-badge {
  padding: 8px 16px;
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

.status-cancelled {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

.order-items {
  margin-bottom: 30px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(249, 245, 241, 0.1);
}

.order-item:last-child {
  border-bottom: none;
}

.item-image .image-placeholder {
  width: 60px;
  height: 60px;
  background: #1a1a1a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
}

.item-details {
  flex: 1;
}

.item-details h4 {
  font-size: 16px;
  color: var(--color-text);
  margin-bottom: 5px;
}

.item-category,
.item-quantity {
  color: var(--color-text-muted);
  font-size: 14px;
  margin-bottom: 2px;
}

.item-price {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-gold);
}

.order-summary {
  background: var(--color-black);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
}

.summary-line:first-child {
  font-weight: 600;
  color: var(--color-gold);
}

.order-timeline {
  margin-bottom: 30px;
}

.order-timeline h4 {
  font-size: 16px;
  color: var(--color-text);
  margin-bottom: 20px;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(249, 245, 241, 0.1);
}

.timeline-item {
  position: relative;
  margin-bottom: 25px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -22px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(249, 245, 241, 0.2);
  border: 2px solid rgba(249, 245, 241, 0.1);
}

.timeline-item.active .timeline-dot {
  background: var(--color-gold);
  border-color: var(--color-gold);
}

.timeline-item.current .timeline-dot {
  background: var(--color-gold);
  border-color: var(--color-gold);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.timeline-content h5 {
  font-size: 14px;
  color: var(--color-text);
  margin-bottom: 5px;
}

.timeline-content p {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 5px;
}

.timeline-date {
  font-size: 11px;
  color: var(--color-gold);
}

.order-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .order-card {
    padding: 20px;
  }
  
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .order-actions {
    flex-direction: column;
  }
  
  .order-actions .btn {
    width: 100%;
  }
}
</style>
