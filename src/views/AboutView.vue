<template>
  <div class="about-view">
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Héritage</span>
        <h2>Notre Histoire</h2>
        <p>
          L'excellence d'un savoir-faire joaillier transmis de génération en génération.
        </p>
      </div>
    </section>

    <section class="about-content">
      <div class="container about-grid">
        <div class="about-story reveal">
          <h3>Une histoire signée SadiB</h3>
          <p>
            SadiB naît de la passion pour les bijoux qui accompagnent les grands moments
            comme le quotidien. Depuis plusieurs années, chaque création est pensée pour
            mettre en valeur la personnalité de celle ou celui qui la porte.
          </p>
          <p>
            Chaque pièce est le fruit d'un dialogue entre la créatrice et la cliente.
            Les choix de matières, de formes et de finitions sont guidés par votre
            histoire personnelle.
          </p>

          <div class="values">
            <div class="value-card">
              <span class="value-label">Savoir‑faire</span>
              <p>Des gestes précis, hérités des grandes maisons de joaillerie.</p>
            </div>
            <div class="value-card">
              <span class="value-label">Sur mesure</span>
              <p>Chaque bijou est dessiné pour raconter votre propre histoire.</p>
            </div>
            <div class="value-card">
              <span class="value-label">Éthique</span>
              <p>Or responsable et pierres certifiées, traçabilité transparente.</p>
            </div>
          </div>
        </div>

        <div class="about-timeline reveal">
          <div class="timeline-card">
            <h3>Les grandes dates</h3>
            <ul class="timeline">
              <li>
                <span class="year">Les débuts</span>
                <p>Création des premières pièces SadiB pour un cercle de proches.</p>
              </li>
              <li>
                <span class="year">La marque</span>
                <p>Lancement officiel de l’univers SadiB et de ses premières collections.</p>
              </li>
              <li>
                <span class="year">Aujourd’hui</span>
                <p>Créations sur mesure et collections pour une clientèle fidèle.</p>
              </li>
            </ul>
          </div>
          <div class="atelier-card">
            <span class="eyebrow small">L’univers SadiB</span>
            <h3>Un accompagnement chaleureux, à votre rythme</h3>
            <p>
              Les échanges se font simplement, notamment via WhatsApp, pour imaginer avec
              vous la pièce qui marquera vos instants précieux.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  padding: 150px 5% 60px;
  text-align: center;
}

.about-content {
  padding: 80px 0 120px;
  background: var(--color-surface);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.6fr 1.2fr;
  gap: 70px;
  align-items: flex-start;
}

.about-story h3 {
  font-size: 28px;
  margin-bottom: 20px;
}

.about-story p {
  color: var(--color-text-muted);
  margin-bottom: 18px;
  font-size: 15px;
}

.values {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.value-card {
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px 18px;
}

.value-label {
  display: inline-block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-gold);
  margin-bottom: 6px;
}

.value-card p {
  margin: 0;
  font-size: 13px;
}

.about-timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timeline-card {
  background: #0c0c0c;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 22px 22px 18px;
}

.timeline-card h3 {
  font-size: 20px;
  margin-bottom: 16px;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.timeline li {
  padding-left: 16px;
  margin-bottom: 14px;
  position: relative;
}

.timeline li::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-gold);
}

.timeline .year {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-text-muted);
  margin-bottom: 2px;
}

.timeline p {
  margin: 0;
  font-size: 14px;
}

.atelier-card {
  background: linear-gradient(135deg, #1a1a1a, #2D1B4D);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 22px 22px 20px;
}

.atelier-card h3 {
  font-size: 18px;
  margin: 10px 0 10px;
}

.atelier-card p {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-muted);
}

.eyebrow.small {
  font-size: 10px;
  letter-spacing: 3px;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .values {
    grid-template-columns: 1fr;
  }
}
</style>
