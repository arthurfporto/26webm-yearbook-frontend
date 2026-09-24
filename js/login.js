import { login } from './api.js';
import { salvarToken } from './auth.js';
import { exibirToast } from './utils.js';

const form = document.querySelector('form');
const erro = document.getElementById('erro');

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  if (!email || senha.length < 6) {
    erro.textContent = 'Preencha email e senha (mín. 6 caracteres).';
    return;
  }
  erro.textContent = '';

  try {
    const { token } = await login(email, senha);
    salvarToken(token);
    exibirToast('sucesso', 'Bem-vindo!');
    window.location.href = 'index.html';
  } catch (e) {
    exibirToast('erro', 'Email ou senha incorretos.');
  }
});
