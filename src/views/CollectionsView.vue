<template>
  <div class="collections-view">
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Thématiques</span>
        <h2>Nos Collections</h2>
        <p>
          Des univers singuliers, du quotidien précieux aux grandes occasions de la vie.
        </p>
      </div>
    </section>

    <section class="collections-section">
      <div class="container">
        <div class="collections-filters">
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            class="filter-pill"
          >
            {{ filter }}
          </button>
        </div>

        <div class="collections-grid">
          <article
            v-for="collection in collections"
            :key="collection.id"
            class="collection-card reveal"
          >
            <div class="collection-image">
              <div class="gradient-overlay" />
              <div class="collection-tag">
                {{ collection.mood }}
              </div>
              <div class="collection-title">
                <h3>{{ collection.name }}</h3>
                <p>{{ collection.subtitle }}</p>
              </div>
            </div>
            <div class="collection-body">
              <p class="description">
                {{ collection.description }}
              </p>
              <ul class="highlights">
                <li v-for="item in collection.highlights" :key="item">
                  <i class="fas fa-circle" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>

        <div class="cta">
          <p>
            Vous souhaitez imaginer une pièce entièrement sur mesure à partir d’une
            collection ?
          </p>
          <router-link to="/contact" class="btn btn-outline">
            Parler à un conseiller
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const filters = [
  'Toutes les collections',
  'Haute Joaillerie',
  'Mariage & Engagement',
  'Quotidien Précieux'
]

const collections = [
  {
    id: 'haute-joaillerie',
    name: 'Haute Joaillerie',
    subtitle: 'Pièces d’exception',
    mood: 'Soirées d’exception',
    description:
      'Une sélection de pièces uniques, réalisées à la main dans notre atelier parisien, pour les instants les plus rares.',
    highlights: [
      'Diamants et pierres précieuses rares',
      'Séries ultra‑limitées numérotées',
      'Montures sculptées sur commande'
    ]
  },
  {
    id: 'bridal',
    name: 'Bridal SadiB',
    subtitle: 'Mariage & Engagement',
    mood: 'Éternité',
    description:
      'Des alliances et solitaires pensés comme des promesses, à personnaliser selon votre histoire et vos envies.',
    highlights: [
      'Solitaires personnalisables',
      'Gravure offerte',
      'Accompagnement sur rendez‑vous'
    ]
  },
  {
    id: 'everyday',
    name: 'Éclats du Quotidien',
    subtitle: 'SadiB au jour le jour',
    mood: 'Quotidien précieux',
    description:
      'Des créations fines et lumineuses, conçues pour être portées, superposées et réinventées chaque jour.',
    highlights: [
      'Pièces légères et confortables',
      'Or responsable certifié',
      'Idéal pour offrir'
    ]
  }
]
</script>

<style scoped>
.page-header {
  padding: 150px 5% 60px;
  text-align: center;
}

.collections-section {
  padding: 70px 0 110px;
}

.collections-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.filter-pill {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: var(--color-text);
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 8px 16px;
  cursor: pointer;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
}

.collection-card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.collection-image {
  position: relative;
  height: 230px;
  background: radial-gradient(circle at 0 0, #4A3080, #050505);
  display: flex;
  align-items: flex-end;
  padding: 18px 20px;
}

.collection-image .gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 0, rgba(212, 175, 55, 0.4), transparent);
  opacity: 0.7;
}

.collection-tag {
  position: absolute;
  top: 16px;
  left: 18px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-cream);
  opacity: 0.9;
}

.collection-title {
  position: relative;
}

.collection-title h3 {
  font-size: 20px;
  margin: 0 0 4px;
}

.collection-title p {
  font-size: 13px;
  color: var(--color-text-muted);
  margin: 0;
}

.collection-body {
  padding: 18px 20px 20px;
}

.description {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 14px;
}

.highlights {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}

.highlights li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.highlights i {
  font-size: 6px;
  color: var(--color-gold);
}

.cta {
  margin-top: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.cta p {
  color: var(--color-text-muted);
  font-size: 14px;
}

@media (max-width: 768px) {
  .collections-filters {
    justify-content: flex-start;
  }
}
</style>
