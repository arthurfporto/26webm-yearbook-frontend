import { registrar } from './api.js';
import { exibirToast } from './utils.js';

// Uploadcare (chave pública definida no <head> da cadastro.html)
const widget = uploadcare.Widget('[role=uploadcare-uploader]');

// Lê a URL no submit: espera o upload terminar, em vez de depender só do callback
async function urlDaFoto() {
  const arquivo = widget.value();
  if (!arquivo) return null;
  const info = await arquivo.promise();
  if (info.cdnUrl) return info.cdnUrl;
  if (info.uuid) return `https://ucarecdn.com/${info.uuid}/`;
  return null;
}

const form = document.querySelector('form');
const erro = document.getElementById('erro');

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const dados = {
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    senha: document.getElementById('senha').value,
    cidade: document.getElementById('cidade').value.trim(),
    frase: document.getElementById('frase').value.trim(),
    planosFuturos: document.getElementById('planosFuturos').value.trim(),
  };

  if (!dados.nome || !dados.email || dados.senha.length < 6) {
    erro.textContent = 'Nome, email e senha (mín. 6) são obrigatórios.';
    return;
  }

  try {
    dados.fotoUrl = await urlDaFoto();
    await registrar(dados);
    exibirToast('sucesso', 'Conta criada! Faça login.');
    window.location.href = 'login.html?cadastrado=1';
  } catch (e) {
    erro.textContent = e.message;
    exibirToast('erro', e.message);
  }
});
