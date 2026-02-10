import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  
  // Getters
  const cartItems = computed(() => items.value)
  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })
  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  // Actions
  const addToCart = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        ...product,
        quantity
      })
    }
    
    saveCart()
  }
  
  const removeFromCart = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveCart()
    }
  }
  
  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveCart()
    }
  }
  
  const clearCart = () => {
    items.value = []
    saveCart()
  }
  
  const saveCart = () => {
    localStorage.setItem('sadiB-cart', JSON.stringify(items.value))
  }
  
  const loadCart = () => {
    const savedCart = localStorage.getItem('sadiB-cart')
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
  }
  
  // Initialize cart on store creation
  loadCart()
  
  return {
    items: cartItems,
    total: cartTotal,
    count: cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})
