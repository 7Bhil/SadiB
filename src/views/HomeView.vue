<template>
  <div class="home-view">
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
              <router-link to="/collections" class="btn btn-gold">Découvrir la Collection</router-link>
              <router-link to="/histoire" class="btn btn-outline">Notre Histoire</router-link>
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
  </div>
</template>

<script setup>
const featuredProducts = [
  { name: 'Éclat Solaire', category: 'Boucles d\'oreilles', price: '2,450 €' },
  { name: 'Nuit Étoilée', category: 'Collier Diamant', price: '5,800 €' },
  { name: 'Aube Royale', category: 'Bague Saphir', price: '3,200 €' },
  { name: 'Essence d\'Or', category: 'Bracelet Gourmette', price: '1,950 €' }
]
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
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
  list-style: none;
  padding: 0;
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

@media (max-width: 768px) {
  .philosophy-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .philosophy-image {
    order: -1;
  }

  .hero-title {
    font-size: 48px;
  }
}
</style>
