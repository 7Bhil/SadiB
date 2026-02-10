<template>
  <div class="floating-cart" :class="{ 'has-items': cartCount > 0 }">
    <router-link to="/panier" class="cart-button">
      <div class="cart-icon">
        <i class="fas fa-shopping-bag"></i>
        <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
      </div>
      <div class="cart-info">
        <span class="cart-text">Panier</span>
        <span v-if="cartTotal > 0" class="cart-total">{{ formatPrice(cartTotal, 'XOF') }}</span>
      </div>
    </router-link>
    
    <!-- Cart preview on hover -->
    <div class="cart-preview" v-if="cartItems.length > 0">
      <div class="cart-preview-header">
        <h4>Votre panier</h4>
        <span class="item-count">{{ cartCount }} article{{ cartCount > 1 ? 's' : '' }}</span>
      </div>
      <div class="cart-preview-items">
        <div v-for="item in cartItems.slice(0, 3)" :key="item.id" class="preview-item">
          <div class="preview-item-image">
            <div class="image-placeholder">
              <i class="fas fa-gem"></i>
            </div>
          </div>
          <div class="preview-item-info">
            <h5>{{ item.name }}</h5>
            <p>{{ item.quantity }} × {{ formatPrice(item.price, item.currency) }}</p>
          </div>
        </div>
      </div>
      <div v-if="cartItems.length > 3" class="more-items">
        +{{ cartItems.length - 3 }} autre{{ cartItems.length - 3 > 1 ? 's' : '' }}
      </div>
      <div class="cart-preview-footer">
        <div class="preview-total">
          <span>Total:</span>
          <span>{{ formatPrice(cartTotal, 'XOF') }}</span>
        </div>
        <router-link to="/panier" class="btn-view-cart">
          Voir le panier
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const cartCount = computed(() => cartStore.count)
const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.total)

const formatPrice = (amount, currency = 'XOF') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(amount)
}
</script>

<style scoped>
.floating-cart {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.cart-button {
  display: flex;
  align-items: center;
  gap: 15px;
  background: var(--color-gold);
  color: var(--color-black);
  padding: 15px 20px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  position: relative;
}

.cart-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(212, 175, 55, 0.4);
}

.cart-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.cart-icon i {
  font-size: 18px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.cart-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cart-text {
  font-weight: 600;
  font-size: 14px;
}

.cart-total {
  font-size: 12px;
  opacity: 0.8;
}

/* Cart Preview */
.floating-cart:hover .cart-preview {
  opacity: 1;
  visibility: visible;
  transform: translateY(-10px);
}

.cart-preview {
  position: absolute;
  bottom: 100%;
  right: 0;
  width: 320px;
  background: var(--color-surface);
  border: 1px solid rgba(249, 245, 241, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
  transition: all 0.3s ease;
  margin-bottom: 15px;
}

.cart-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(249, 245, 241, 0.1);
}

.cart-preview-header h4 {
  font-size: 16px;
  color: var(--color-text);
  margin: 0;
}

.item-count {
  font-size: 12px;
  color: var(--color-text-muted);
}

.cart-preview-items {
  max-height: 200px;
  overflow-y: auto;
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(249, 245, 241, 0.05);
}

.preview-item:last-child {
  border-bottom: none;
}

.preview-item-image {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a, #2D1B4D);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
  font-size: 14px;
}

.preview-item-info {
  flex: 1;
}

.preview-item-info h5 {
  font-size: 14px;
  color: var(--color-text);
  margin: 0 0 5px 0;
  font-weight: 500;
}

.preview-item-info p {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0;
}

.more-items {
  padding: 10px 20px;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-muted);
  background: rgba(249, 245, 241, 0.02);
}

.cart-preview-footer {
  padding: 15px 20px;
  border-top: 1px solid rgba(249, 245, 241, 0.1);
}

.preview-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-weight: 600;
  color: var(--color-text);
}

.btn-view-cart {
  display: block;
  width: 100%;
  background: var(--color-gold);
  color: var(--color-black);
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-view-cart:hover {
  background: #d4af37;
}

/* Empty state */
.floating-cart:not(.has-items) .cart-info {
  display: none;
}

.floating-cart:not(.has-items) .cart-button {
  padding: 15px;
}

.floating-cart:not(.has-items) .cart-icon {
  width: 50px;
  height: 50px;
}

.floating-cart:not(.has-items) .cart-icon i {
  font-size: 20px;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .floating-cart {
    bottom: 20px;
    right: 20px;
  }
  
  .cart-preview {
    width: 280px;
    right: -20px;
  }
  
  .cart-button {
    padding: 12px 15px;
  }
  
  .cart-icon {
    width: 35px;
    height: 35px;
  }
  
  .cart-icon i {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .floating-cart {
    bottom: 15px;
    right: 15px;
  }
  
  .cart-preview {
    width: calc(100vw - 30px);
    right: -15px;
  }
}
</style>
