// gerenciamento do token JWT no cliente

export function salvarToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removerToken() {
  localStorage.removeItem('token');
}

export function estaLogado() {
  return !!getToken();
}

export function protegerPagina() {
  if (!estaLogado()) {
    window.location.href = 'login.html';
  }
}

// decodifica o payload do token (id, role) — apenas leitura, sem validar
export function getUsuarioLogado() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}
