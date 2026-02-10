<template>
  <footer>
    <div class="container footer-grid">
      <div class="footer-brand">
        <h2 class="font-serif">SadiB</h2>
        <p>Créations et bijoux pour sublimer chaque instant de votre vie.</p>
        <a
          :href="whatsAppUrl"
          target="_blank"
          rel="noopener"
          class="whatsapp-link"
        >
          <i class="fab fa-whatsapp"></i>
          <span>Contact uniquement via WhatsApp – 01 97 03 89 01</span>
        </a>
      </div>
      <div class="footer-links">
        <h4>Navigation</h4>
        <ul>
          <li><router-link to="/boutique">Boutique</router-link></li>
          <li><router-link to="/collections">Collections</router-link></li>
          <li><router-link to="/histoire">Notre histoire</router-link></li>
        </ul>
      </div>
      <div class="footer-newsletter">
        <h4>Restez informé·e</h4>
        <p>Suivez les nouveautés directement sur WhatsApp avec SadiB.</p>
      </div>
    </div>
    <div class="footer-bottom container">
      <p>&copy; 2026 SadiB. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const whatsAppUrl = computed(() =>
  buildWhatsAppUrl(
    'Bonjour, je découvre les créations SadiB et souhaite plus d’informations.'
  )
)
</script>

<style scoped>
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

.whatsapp-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #25d366;
}

.whatsapp-link i {
  font-size: 18px;
}

.footer-links h4, .footer-newsletter h4 {
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 25px;
  letter-spacing: 2px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links ul li {
  margin-bottom: 12px;
}

.footer-links ul a {
  color: var(--color-text-muted);
  font-size: 14px;
  transition: var(--transition-smooth);
}

.footer-links ul a:hover {
  color: var(--color-gold);
  padding-left: 5px;
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.05);
  text-align: center;
  color: rgba(255,255,255,0.3);
  font-size: 12px;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
