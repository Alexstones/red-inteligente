const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la petición');
  }

  return response.json();
}

export const authApi = {
  login: (credentials: any) => apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (data: any) => apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export const nodesApi = {
  getNodes: () => apiFetch('/nodes'),
  createNode: (node: any) => apiFetch('/nodes', {
    method: 'POST',
    body: JSON.stringify(node),
  }),
  // Business Neurons
  addInventory: (product: any) => apiFetch('/business/inventory', {
    method: 'POST',
    body: JSON.stringify(product),
  }),
  recordSale: (sale: any) => apiFetch('/business/sale', {
    method: 'POST',
    body: JSON.stringify(sale),
  }),
};
