<template>
  <div class="cart-view">
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Panier</span>
        <h2>Votre Panier SadiB</h2>
        <p>{{ cartCount }} article{{ cartCount > 1 ? 's' : '' }} dans votre panier</p>
      </div>
    </section>

    <section class="cart-content">
      <div class="container">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <div class="empty-icon">
            <i class="fas fa-shopping-bag"></i>
          </div>
          <h3>Votre panier est vide</h3>
          <p>Découvrez nos créations exclusives et ajoutez vos bijoux préférés.</p>
          <router-link to="/boutique" class="btn btn-gold">
            <i class="fas fa-gem"></i>
            Découvrir la boutique
          </router-link>
        </div>

        <div v-else class="cart-grid">
          <div class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="item-image">
                <div class="image-placeholder">
                  <i class="fas fa-gem"></i>
                  <span>{{ item.name }}</span>
                </div>
              </div>
              
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="item-category">{{ item.category }}</p>
                <p class="item-reference">Réf. {{ item.reference }}</p>
                <p class="item-price">{{ formatPrice(item.price, item.currency) }}</p>
              </div>
              
              <div class="item-quantity">
                <button 
                  class="quantity-btn" 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-value">{{ item.quantity }}</span>
                <button 
                  class="quantity-btn" 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              
              <div class="item-total">
                <p class="total-price">{{ formatPrice(item.price * item.quantity, item.currency) }}</p>
                <button class="remove-btn" @click="removeFromCart(item.id)">
                  <i class="fas fa-trash"></i>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
          
          <div class="cart-summary">
            <div class="summary-card">
              <h3>Récapitulatif</h3>
              
              <div class="summary-line">
                <span>Sous-total</span>
                <span>{{ formatPrice(cartTotal, 'XOF') }}</span>
              </div>
              
              <div class="summary-line">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              
              <div class="summary-line total">
                <span>Total</span>
                <span>{{ formatPrice(cartTotal, 'XOF') }}</span>
              </div>
              
              <div class="summary-actions">
                <router-link 
                  v-if="cartItems.length > 0" 
                  to="/checkout" 
                  class="btn btn-green btn-large"
                >
                  <i class="fas fa-lock"></i>
                  Valider la commande
                </router-link>
                
                <button 
                  v-if="cartItems.length > 0" 
                  class="btn btn-danger" 
                  @click="confirmClearCart"
                >
                  <i class="fas fa-trash-alt"></i>
                  Vider le panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.total)
const cartCount = computed(() => cartStore.count)

const formatPrice = (price, currency = 'XOF') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(price)
}

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, quantity)
}

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId)
}

const confirmClearCart = () => {
  // Create custom confirmation modal
  const modal = document.createElement('div')
  modal.className = 'clear-cart-modal'
  modal.innerHTML = `
    <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Confirmer la suppression</h3>
      </div>
      <div class="modal-body">
        <p>Êtes-vous sûr de vouloir vider votre panier ?</p>
        <p class="modal-detail">Cette action supprimera tous les articles ({{ cartCount }}) de votre panier.</p>
      </div>
      <div class="modal-actions">
        <button class="btn btn-outline" onclick="this.closest('.clear-cart-modal').remove()" style="width: auto; max-width: 150px;">
          Annuler
        </button>
        <button class="btn btn-danger" onclick="window.clearCartAndClose()" style="width: auto; max-width: 180px;">
          <i class="fas fa-trash-alt"></i>
          Vider le panier
        </button>
      </div>
    </div>
  `
  
  // Add styles
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
  `
  
  modal.querySelector('.modal-overlay').style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
  `
  
  modal.querySelector('.modal-content').style.cssText = `
    background: var(--color-surface);
    border: 1px solid rgba(249, 245, 241, 0.1);
    border-radius: 12px;
    padding: 30px;
    max-width: 400px;
    width: 90%;
    position: relative;
    animation: slideUp 0.3s ease-out;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  `
  
  modal.querySelector('.modal-header').style.cssText = `
    text-align: center;
    margin-bottom: 20px;
  `
  
  modal.querySelector('.modal-header i').style.cssText = `
    font-size: 48px;
    color: #ff6b6b;
    margin-bottom: 15px;
    display: block;
  `
  
  modal.querySelector('.modal-header h3').style.cssText = `
    color: var(--color-text);
    margin: 0;
    font-size: 20px;
  `
  
  modal.querySelector('.modal-body').style.cssText = `
    text-align: center;
    margin-bottom: 25px;
  `
  
  modal.querySelector('.modal-body p').style.cssText = `
    color: var(--color-text);
    margin: 0 0 10px 0;
    font-size: 16px;
  `
  
  modal.querySelector('.modal-detail').style.cssText = `
    color: var(--color-text-muted);
    font-size: 14px;
    margin: 0;
  `
  
  modal.querySelector('.modal-actions').style.cssText = `
    display: flex;
    gap: 12px;
    justify-content: center;
  `
  
  // Add global function for clearing cart
  window.clearCartAndClose = () => {
    cartStore.clearCart()
    modal.remove()
  }
  
  // Add animations
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
  document.head.appendChild(style)
  
  document.body.appendChild(modal)
}
</script>

<style scoped>
.page-header {
  padding: 150px 5% 60px;
  text-align: center;
  background: linear-gradient(to bottom, #121212, var(--color-black));
}

.cart-content {
  padding: 60px 0 100px;
}

.empty-cart {
  text-align: center;
  padding: 80px 0;
}

.empty-icon {
  font-size: 64px;
  color: var(--color-gold);
  margin-bottom: 30px;
}

.empty-cart h3 {
  font-size: 28px;
  margin-bottom: 15px;
  color: var(--color-text);
}

.empty-cart p {
  color: var(--color-text-muted);
  margin-bottom: 40px;
}

.cart-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 60px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 30px;
  align-items: center;
  background: var(--color-surface);
  padding: 30px;
  border-radius: 12px;
  transition: var(--transition-smooth);
}

.cart-item:hover {
  transform: translateY(-2px);
}

.item-image .image-placeholder {
  width: 120px;
  height: 120px;
  background: #1a1a1a;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
}

.item-image .image-placeholder i {
  font-size: 24px;
  margin-bottom: 10px;
}

.item-details h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: var(--color-text);
}

.item-category {
  color: var(--color-text-muted);
  font-size: 14px;
  margin-bottom: 4px;
}

.item-reference {
  color: var(--color-text-muted);
  font-size: 14px;
  margin-bottom: 12px;
}

.item-price {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-gold);
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-gold);
  background: transparent;
  color: var(--color-gold);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.quantity-btn:hover:not(:disabled) {
  background: var(--color-gold);
  color: var(--color-black);
}

.quantity-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.quantity-value {
  font-size: 16px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.item-total {
  text-align: right;
}

.total-price {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-gold);
  margin-bottom: 15px;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-size: 14px;
  transition: var(--transition-smooth);
}

.remove-btn:hover {
  color: #ff6666;
}

.summary-card {
  background: var(--color-surface);
  padding: 40px;
  border-radius: 12px;
  position: sticky;
  top: 100px;
}

.summary-card h3 {
  font-size: 24px;
  margin-bottom: 30px;
  color: var(--color-text);
}

.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(249, 245, 241, 0.1);
}

.summary-line:last-child {
  border-bottom: none;
}

.summary-line.total {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-gold);
  padding-top: 20px;
  border-top: 2px solid var(--color-gold);
}

.summary-actions {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn-large {
  padding: 18px 30px;
  font-size: 16px;
  width: 100%;
  justify-content: center;
}

.btn-danger {
  background: #ff4444;
  color: white;
  border: 2px solid #ff4444;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  width: auto;
  max-width: 200px;
}

.btn-danger:hover {
  background: #ff6666;
  border-color: #ff6666;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
}

.btn-green {
  background: #28a745;
  color: white;
  border: 2px solid #28a745;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  width: auto;
  max-width: 200px;
}

.btn-green:hover {
  background: #218838;
  border-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--color-text);
  border: 2px solid rgba(249, 245, 241, 0.3);
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  width: auto;
  max-width: 200px;
}

.btn-outline:hover {
  background: rgba(249, 245, 241, 0.1);
  border-color: rgba(249, 245, 241, 0.5);
  color: var(--color-text);
}

@media (max-width: 1024px) {
  .cart-grid {
    grid-template-columns: 1fr;
  }
  
  .summary-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 20px;
  }
  
  .item-quantity,
  .item-total {
    grid-column: 2;
  }
  
  .item-total {
    text-align: left;
    margin-top: 15px;
  }
  
  .summary-card {
    padding: 30px 20px;
  }
}
</style>
