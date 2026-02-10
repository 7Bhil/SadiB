<template>
  <div class="lumiere-landing" :class="{ 'scrolled': isScrolled }">
    <!-- Header -->
    <header :class="{ 'header-glass': isScrolled }">
      <div class="container header-container">
        <div class="logo">
          <div class="logo-icon">L</div>
          <div class="logo-text">
            <h1>Lumière</h1>
            <span>Bijouterie de Luxe</span>
          </div>
        </div>

        <nav :class="{ 'nav-open': mobileOpen }">
          <ul class="nav-links">
            <li><a href="#boutique" class="nav-link active">Boutique</a></li>
            <li><a href="#collection" class="nav-link">Collection</a></li>
            <li><a href="#about" class="nav-link">Histoire</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <button class="icon-btn" aria-label="Recherche">
            <i class="fas fa-search"></i>
          </button>
          <router-link to="/panier" class="icon-btn" aria-label="Panier">
            <i class="fas fa-shopping-bag"></i>
            <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
          </router-link>
          <button class="mobile-toggle" @click="mobileOpen = !mobileOpen" aria-label="Menu">
            <div class="hamburger" :class="{ 'active': mobileOpen }">
              <span></span><span></span>
            </div>
          </button>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg">
          <div class="gradient-overlay"></div>
        </div>
        
        <div class="container hero-content">
          <div class="reveal">
            <span class="eyebrow">Excellence Artisanale</span>
            <h2 class="hero-title">L'Éclat de l'Éternité <br/><span class="text-gold">à Votre Portée</span></h2>
            <p class="hero-description">
              Plongez dans un univers où chaque bijou raconte une histoire unique de passion, 
              de raffinement et de savoir-faire ancestral.
            </p>
            <div class="hero-btns">
              <a href="#collection" class="btn btn-gold">Découvrir la Collection</a>
              <a href="#about" class="btn btn-outline">Notre Histoire</a>
            </div>
          </div>
        </div>

        <div class="scroll-indicator">
          <span>Explorez</span>
          <div class="line"></div>
        </div>
      </section>

      <!-- Featured Collection -->
      <section id="collection" class="featured-collection">
        <div class="container">
          <div class="section-header reveal">
            <span class="eyebrow">Collection 2026</span>
            <h2>Pièces Maîtresses</h2>
            <p>Une sélection exclusive de nos créations les plus prestigieuses.</p>
          </div>

          <div class="product-grid">
            <div v-for="(item, index) in featuredProducts" :key="index" class="product-card reveal" :style="{ transitionDelay: (index * 100) + 'ms' }">
              <div class="product-image">
                <div class="image-placeholder">
                  <i class="fas fa-gem"></i>
                  <span>{{ item.name }}</span>
                </div>
                <div class="product-overlay">
                  <button class="btn btn-gold-sm">Aperçu rapide</button>
                </div>
              </div>
              <div class="product-info">
                <h3>{{ item.name }}</h3>
                <p class="category">{{ item.category }}</p>
                <p class="price">{{ item.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About/Philosophy -->
      <section id="about" class="philosophy">
        <div class="container philosophy-grid">
          <div class="philosophy-text reveal">
            <span class="eyebrow">Héritage</span>
            <h2>La Philosophie Lumière</h2>
            <p>
              Depuis plus de trois décennies, Lumière s'engage à sublimer la beauté naturelle 
              à travers des créations d'exception. Chaque pierre est choisie à la main, 
              chaque monture est forgée avec une précision chirurgicale.
            </p>
            <ul class="features">
              <li><i class="fas fa-check"></i> Or 24 Carats éthique</li>
              <li><i class="fas fa-check"></i> Diamants certifiés GIA</li>
              <li><i class="fas fa-check"></i> Design sur mesure</li>
            </ul>
          </div>
          <div class="philosophy-image reveal">
            <div class="image-placeholder-large">
              <i class="fas fa-crown"></i>
              <span>Artisanat d'Art</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer>
      <div class="container footer-grid">
        <div class="footer-brand">
          <h2 class="font-serif">Lumière</h2>
          <p>L'élégance intemporelle pour chaque instant précieux de la vie.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-pinterest"></i></a>
          </div>
        </div>
        <div class="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#">Boutique</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Sur Mesure</a></li>
          </ul>
        </div>
        <div class="footer-newsletter">
          <h4>Lettre d'Élite</h4>
          <p>Recevez nos invitations exclusives et nouveautés.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Votre email">
            <button class="btn-gold-icon"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
      <div class="footer-bottom container">
        <p>&copy; 2026 Lumière Bijouterie. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.count)

const mobileOpen = ref(false)
const isScrolled = ref(false)

const featuredProducts = [
  { name: 'Éclat Solaire', category: 'Boucles d\'oreilles', price: '2,450 €' },
  { name: 'Nuit Étoilée', category: 'Collier Diamant', price: '5,800 €' },
  { name: 'Aube Royale', category: 'Bague Saphir', price: '3,200 €' },
  { name: 'Essence d\'Or', category: 'Bracelet Gourmette', price: '1,950 €' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.lumiere-landing {
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
}

/* Header & Nav */
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
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  position: relative;
}

.nav-link:hover, .nav-link.active {
  opacity: 1;
  color: var(--color-gold);
}

.nav-link.active::after {
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

/* Hero Section */
.hero {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #050505;
}

/* Animating gradient */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(45, 27, 77, 0.4) 0%, rgba(10, 10, 10, 1) 70%);
  animation: pulse 8s infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(1.2); opacity: 1; }
}

.eyebrow {
  display: inline-block;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(40px, 8vw, 84px);
  margin-bottom: 30px;
  letter-spacing: -1px;
}

.text-gold {
  color: var(--color-gold);
}

.hero-description {
  max-width: 600px;
  margin: 0 auto 40px;
  font-size: 18px;
  color: var(--color-text-muted);
  font-weight: 300;
}

.hero-btns {
  display: flex;
  gap: 20px;
  justify-content: center;
}

/* Buttons */
.btn {
  padding: 16px 32px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  display: inline-block;
}

.btn-gold {
  background: var(--color-gold);
  color: var(--color-black);
  border: 1px solid var(--color-gold);
}

.btn-gold:hover {
  background: var(--color-gold-light);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
}

.btn-outline {
  background: transparent;
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-outline:hover {
  border-color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  opacity: 0.6;
}

.scroll-indicator span {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.scroll-indicator .line {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, var(--color-gold), transparent);
  animation: scrollDown 2s infinite;
}

@keyframes scrollDown {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* Featured Collection */
.featured-collection {
  padding: var(--section-padding);
  background-color: var(--color-background);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 42px;
  margin-bottom: 15px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.product-card {
  background: var(--color-surface);
  transition: var(--transition-smooth);
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-10px);
}

.product-image {
  height: 400px;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: linear-gradient(45deg, #121212, #1a1a1a);
  color: #333;
}

.image-placeholder i {
  font-size: 48px;
  color: var(--color-royal-light);
  opacity: 0.5;
}

.image-placeholder span {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.btn-gold-sm {
  background: var(--color-gold);
  color: var(--color-black);
  border: none;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-info {
  padding: 25px;
  text-align: center;
}

.product-info h3 {
  font-size: 20px;
  margin-bottom: 5px;
}

.product-info .category {
  font-size: 12px;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.product-info .price {
  font-size: 18px;
  font-weight: 600;
}

/* Philosophy Section */
.philosophy {
  padding: var(--section-padding);
  background-color: var(--color-surface);
}

.philosophy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 80px;
}

.philosophy-text h2 {
  font-size: 42px;
  margin-bottom: 30px;
}

.philosophy-text p {
  font-size: 18px;
  color: var(--color-text-muted);
  margin-bottom: 30px;
}

.features {
  display: grid;
  gap: 15px;
}

.features li {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
}

.features li i {
  color: var(--color-gold);
}

.image-placeholder-large {
  width: 100%;
  height: 600px;
  background: linear-gradient(135deg, #1a1a1a, #2D1B4D);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  border: 1px solid rgba(212, 175, 55, 0.1);
}

.image-placeholder-large i {
  font-size: 84px;
  color: var(--color-gold);
  opacity: 0.2;
}

/* Footer */
footer {
  padding: 80px 5% 40px;
  background-color: #050505;
  border-top: 1px solid rgba(255,255,255,0.05);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 60px;
  margin-bottom: 60px;
}

.footer-brand h2 {
  font-size: 32px;
  margin-bottom: 20px;
  color: var(--color-gold);
}

.footer-brand p {
  color: var(--color-text-muted);
  margin-bottom: 30px;
}

.social-links {
  display: flex;
  gap: 20px;
}

.social-links a {
  font-size: 20px;
  color: var(--color-text-muted);
}

.social-links a:hover {
  color: var(--color-gold);
}

.footer-links h4, .footer-newsletter h4 {
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 25px;
  letter-spacing: 2px;
}

.footer-links ul li {
  margin-bottom: 12px;
}

.footer-links ul a {
  color: var(--color-text-muted);
  font-size: 14px;
}

.footer-links ul a:hover {
  color: var(--color-gold);
  padding-left: 5px;
}

.newsletter-form {
  display: flex;
}

.newsletter-form input {
  flex: 1;
  background: #121212;
  border: 1px solid #333;
  padding: 12px 20px;
  color: white;
  outline: none;
}

.btn-gold-icon {
  background: var(--color-gold);
  border: none;
  width: 50px;
  cursor: pointer;
  color: var(--color-black);
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.05);
  text-align: center;
  color: rgba(255,255,255,0.3);
  font-size: 12px;
}

/* Mobile Toggle */
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

.hamburger.active span:first-child {
  transform: translateY(6px) rotate(45deg);
}

.hamburger.active span:last-child {
  transform: translateY(-6px) rotate(-45deg);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .philosophy-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .philosophy-image {
    order: -1;
  }

  .nav-links {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .hero-title {
    font-size: 48px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>

