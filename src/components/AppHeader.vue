<template>
  <header :class="{ 'header-glass': isScrolled }">
    <div class="container header-container">
      <router-link to="/" class="logo">
        <div class="logo-icon">S</div>
        <div class="logo-text">
          <h1>SadiB</h1>
          <span>Bijoux & Créations</span>
        </div>
      </router-link>

      <nav :class="{ 'nav-open': mobileOpen }">
        <ul class="nav-links">
          <li><router-link to="/" class="nav-link" @click="closeMobileMenu">Accueil</router-link></li>
          <li><router-link to="/boutique" class="nav-link" @click="closeMobileMenu">Boutique</router-link></li>
          <li><router-link to="/collections" class="nav-link" @click="closeMobileMenu">Collection</router-link></li>
          <li><router-link to="/histoire" class="nav-link" @click="closeMobileMenu">Histoire</router-link></li>
          <li><router-link to="/contact" class="nav-link" @click="closeMobileMenu">Contact</router-link></li>
        </ul>
      </nav>

      <div class="header-actions">
        <a
          :href="whatsAppUrl"
          target="_blank"
          rel="noopener"
          class="icon-btn whatsapp-btn"
          aria-label="Contacter SadiB sur WhatsApp"
        >
          <i class="fab fa-whatsapp"></i>
          <span class="whatsapp-label">WhatsApp</span>
        </a>
        <button class="mobile-toggle" @click="mobileOpen = !mobileOpen" aria-label="Menu">
          <div class="hamburger" :class="{ 'active': mobileOpen }">
            <span></span><span></span>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { trackEvent } from '../utils/tracking'

const mobileOpen = ref(false)
const isScrolled = ref(false)

const whatsAppUrl = computed(() =>
  buildWhatsAppUrl(
    'Bonjour, je souhaite en savoir plus sur les créations de la maison SadiB.'
  )
)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'header')
}

const closeMobileMenu = () => {
  mobileOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 1000;
  transition: var(--transition-smooth);
}

.header-glass {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  height: 70px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: var(--color-gold);
  color: var(--color-black);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 24px;
  border-radius: 5px;
}

.logo-text h1 {
  font-size: 22px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
}

.logo-text span {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--color-gold);
  display: block;
}

.nav-links {
  display: flex;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  position: relative;
  transition: var(--transition-smooth);
}

.nav-link:hover, .router-link-active {
  opacity: 1;
  color: var(--color-gold);
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--color-gold);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-btn {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 18px;
  cursor: pointer;
  position: relative;
  transition: var(--transition-smooth);
}

.icon-btn:hover {
  color: var(--color-gold);
}

.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(37, 211, 102, 0.4);
  color: #25d366;
}

.whatsapp-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--color-gold);
  color: var(--color-black);
  font-size: 10px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger {
  width: 24px;
  height: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  transition: var(--transition-smooth);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .nav-open .nav-links {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 40px 20px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    overflow-y: auto;
    z-index: 999;
  }

  .nav-open .nav-links li {
    margin-bottom: 20px;
    opacity: 0;
    animation: slideInRight 0.3s ease forwards;
  }

  .nav-open .nav-links li:nth-child(1) { animation-delay: 0.1s; }
  .nav-open .nav-links li:nth-child(2) { animation-delay: 0.15s; }
  .nav-open .nav-links li:nth-child(3) { animation-delay: 0.2s; }
  .nav-open .nav-links li:nth-child(4) { animation-delay: 0.25s; }
  .nav-open .nav-links li:nth-child(5) { animation-delay: 0.3s; }

  .nav-link {
    font-size: 18px;
    padding: 15px 20px;
    border-radius: 8px;
    transition: var(--transition-smooth);
    display: block;
    text-align: center;
  }

  .nav-link:hover {
    background: rgba(212, 175, 55, 0.1);
    transform: translateX(8px);
  }

  .router-link-active {
    background: rgba(212, 175, 55, 0.15);
    color: var(--color-gold);
  }

  .router-link-active::after {
    display: none;
  }

  .hamburger span {
    transition: var(--transition-smooth);
  }

  .hamburger.active span:first-child {
    transform: translateY(6px) rotate(45deg);
  }

  .hamburger.active span:last-child {
    transform: translateY(-6px) rotate(-45deg);
  }

  .nav-open::before {
    content: '';
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
