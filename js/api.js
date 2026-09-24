// camada de serviço — tudo que fala com a API mora aqui
import { removerToken } from './auth.js';

export const API_URL = 'https://26webm-yearbook-backend.vercel.app';

// tratamento global de auth: 401 desloga, 403 avisa
function tratarAuth(resposta) {
  if (resposta.status === 401) {
    removerToken();
    window.location.href = 'login.html';
    throw new Error('Sessão expirada');
  }
  if (resposta.status === 403) {
    throw new Error('Você não tem permissão para isso');
  }
}

// ===== Auth =====
export async function login(email, senha) {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  if (!resposta.ok) throw new Error('Credenciais inválidas');
  return resposta.json();
}

export async function registrar(dados) {
  const resposta = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (resposta.status === 409) throw new Error('Email já cadastrado');
  if (!resposta.ok) throw new Error('Falha no cadastro');
  return resposta.json();
}

// ===== Alunos =====
export async function listarAlunos() {
  const resposta = await fetch(`${API_URL}/alunos`);
  if (!resposta.ok) throw new Error('Falha ao listar alunos');
  return resposta.json();
}

export async function buscarAluno(id) {
  const resposta = await fetch(`${API_URL}/alunos/${id}`);
  if (resposta.status === 404) return null;
  if (!resposta.ok) throw new Error('Erro ao buscar aluno');
  return resposta.json();
}

export async function atualizarAluno(id, dados, token) {
  const resposta = await fetch(`${API_URL}/alunos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  tratarAuth(resposta);
  if (!resposta.ok) throw new Error('Falha ao atualizar');
  return resposta.json();
}

// ===== Mensagens =====
export async function listarMensagens() {
  const resposta = await fetch(`${API_URL}/mensagens`);
  if (!resposta.ok) throw new Error('Falha ao listar mensagens');
  return resposta.json();
}

export async function criarMensagem(dados, token) {
  const resposta = await fetch(`${API_URL}/mensagens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  tratarAuth(resposta);
  if (!resposta.ok) throw new Error('Falha ao enviar mensagem');
  return resposta.json();
}

export async function deletarMensagem(id, token) {
  const resposta = await fetch(`${API_URL}/mensagens/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  tratarAuth(resposta);
  if (!resposta.ok) throw new Error('Falha ao excluir');
}
