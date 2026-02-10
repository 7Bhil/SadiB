<template>
  <div class="contact-view">
    <section class="page-header">
      <div class="container">
        <span class="eyebrow">Contact</span>
        <h2>Contacter SadiB</h2>
        <p>
          Le seul moyen de nous joindre et de finaliser vos commandes est via WhatsApp.
        </p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container contact-grid">
        <div class="contact-main">
          <h3>WhatsApp SadiB</h3>
          <p>
            Pour toute question, devis ou commande, envoyez‑nous simplement un message
            sur WhatsApp. Nous vous répondrons directement depuis la conversation.
          </p>

          <a
            :href="whatsAppUrl"
            target="_blank"
            rel="noopener"
            class="btn btn-gold whatsapp-cta"
          >
            <i class="fab fa-whatsapp"></i>
            Écrire sur WhatsApp – 01 97 03 89 01
          </a>

          <p class="hint">
            En cliquant, vous serez redirigé·e vers la conversation WhatsApp de SadiB pour
            finaliser votre demande.
          </p>
        </div>

        <div class="contact-side">
          <h3>Informations</h3>
          <ul class="info-list">
            <li>
              <i class="fab fa-whatsapp"></i>
              <div>
                <strong>WhatsApp uniquement</strong>
                <p>01 97 03 89 01</p>
              </div>
            </li>
            <li>
              <i class="fas fa-info-circle"></i>
              <div>
                <strong>Commandes</strong>
                <p>Toute commande est finalisée directement dans l’échange WhatsApp.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const whatsAppUrl = computed(() =>
  buildWhatsAppUrl(
    'Bonjour, je souhaite discuter avec SadiB concernant une commande ou une création.'
  )
)
</script>

<style scoped>
.page-header {
  padding: 150px 5% 60px;
  text-align: center;
}

.contact-section {
  padding: 60px 5% 100px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: 60px;
  align-items: flex-start;
}

.contact-main h3,
.contact-side h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.contact-main p {
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.whatsapp-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.whatsapp-cta i {
  font-size: 18px;
}

.hint {
  margin-top: 10px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.info-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 16px;
}

.info-list li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.info-list i {
  color: var(--color-gold);
  margin-top: 4px;
}

.info-list strong {
  font-size: 14px;
}

.info-list p {
  margin: 2px 0 0;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
