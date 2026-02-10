require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// Basic configuration
const PORT = process.env.PORT || 4000;
const API_PREFIX = '/api';

app.use(cors());
app.use(express.json());

// In-memory demo data for now (can be moved to PostgreSQL later)
const products = [
  {
    id: 1,
    name: 'Éclat Solaire',
    category: "Boucles d'oreilles",
    price: 2450,
    currency: 'EUR',
    reference: 'LUM-BO-001',
    description:
      "Créoles en or 24 carats serties de diamants taille brillant, inspirées des rayons du soleil.",
    materials: ['Or 24K éthique', 'Diamants certifiés GIA'],
    mainImage: null,
    badges: ['Iconique', 'Best-seller'],
  },
  {
    id: 2,
    name: 'Nuit Étoilée',
    category: 'Collier Diamant',
    price: 5800,
    currency: 'EUR',
    reference: 'LUM-CO-002',
    description:
      'Collier rivière en diamants évoquant un ciel d’hiver constellé d’étoiles.',
    materials: ['Or blanc 18K', 'Diamants certifiés GIA'],
    mainImage: null,
    badges: ['Édition limitée'],
  },
  {
    id: 3,
    name: 'Aube Royale',
    category: 'Bague Saphir',
    price: 3200,
    currency: 'EUR',
    reference: 'LUM-BA-003',
    description:
      'Bague solitaire sertie d’un saphir bleu profond entouré d’un halo de diamants.',
    materials: ['Or rose 18K', 'Saphir naturel', 'Diamants'],
    mainImage: null,
    badges: ['Nouvelle collection'],
  },
  {
    id: 4,
    name: "Essence d'Or",
    category: 'Bracelet Gourmette',
    price: 1950,
    currency: 'EUR',
    reference: 'LUM-BR-004',
    description:
      'Gourmette minimaliste en or massif, pensée pour un port quotidien élégant.',
    materials: ['Or 18K'],
    mainImage: null,
    badges: [],
  },
];

// In-memory contact messages (for demo; replace with DB later)
const contactMessages = [];

// Health check
app.get(`${API_PREFIX}/health`, (req, res) => {
  res.json({
    status: 'ok',
    app: 'Lumiere API',
    timestamp: new Date().toISOString(),
  });
});

// Products list
app.get(`${API_PREFIX}/products`, (req, res) => {
  res.json(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      currency: p.currency,
      reference: p.reference,
      badges: p.badges,
      // Frontend can decide how to format price (e.g. 2 450 €)
    })),
  );
});

// Single product details
app.get(`${API_PREFIX}/products/:id`, (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Produit introuvable.' });
  }

  return res.json(product);
});

// Contact form submission
app.post(`${API_PREFIX}/contact`, (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Les champs nom, email et message sont obligatoires.',
    });
  }

  const newMessage = {
    id: contactMessages.length + 1,
    name,
    email,
    phone: phone || null,
    subject: subject || 'Demande de contact',
    message,
    createdAt: new Date().toISOString(),
  };

  contactMessages.push(newMessage);

  // For now we just log in the server console
  // This can be replaced by a PostgreSQL insertion or an email service.
  // eslint-disable-next-line no-console
  console.log('Nouveau message de contact:', newMessage);

  return res.status(201).json({
    success: true,
    message: 'Votre demande a bien été reçue. Nous vous répondrons au plus vite.',
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Lumiere API is running on http://localhost:${PORT}${API_PREFIX}`);
});

