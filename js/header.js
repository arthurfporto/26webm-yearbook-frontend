// header compartilhado — mostra Sair ou Entrar conforme o estado de login (aula 47)
import { removerToken, estaLogado } from './auth.js';

const btnSair = document.getElementById('btn-sair');
const linkEntrar = document.getElementById('link-entrar');

if (btnSair) {
  btnSair.hidden = !estaLogado();
  btnSair.addEventListener('click', () => {
    removerToken();
    window.location.href = 'login.html';
  });
}

if (linkEntrar) {
  linkEntrar.parentElement.hidden = estaLogado();
}
