const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = 'Une erreur est survenue.';
    try {
      const data = await response.json();
      if (data?.error) errorMessage = data.error;
    } catch {
      // ignore JSON parsing errors
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  return handleResponse(res);
}

export async function submitContactForm(payload) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

