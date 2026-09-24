import { listarMensagens, criarMensagem, deletarMensagem } from './api.js';
import { estaLogado, getToken, getUsuarioLogado } from './auth.js';
import { exibirToast } from './utils.js';

const lista = document.getElementById('lista-mensagens');
const form = document.querySelector('form');
const erro = document.getElementById('erro');

// Uploadcare (chave pública no <head> da mural.html)
const widget = uploadcare.Widget('[role=uploadcare-uploader]');

async function urlDaImagem() {
  const arquivo = widget.value();
  if (!arquivo) return null;
  const info = await arquivo.promise();
  if (info.cdnUrl) return info.cdnUrl;
  if (info.uuid) return `https://ucarecdn.com/${info.uuid}/`;
  return null;
}

function formatarData(iso) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(iso));
}

async function renderizar() {
  lista.textContent = 'Carregando...';
  try {
    const mensagens = await listarMensagens();
    lista.innerHTML = '';

    if (mensagens.length === 0) {
      lista.textContent = 'Nenhuma mensagem ainda.';
      return;
    }

    const usuario = getUsuarioLogado();

    mensagens.forEach((msg) => {
      const card = document.createElement('article');
      card.classList.add('card', 'mensagem');

      const texto = document.createElement('p');
      texto.textContent = msg.texto;
      card.appendChild(texto);

      if (msg.imagemUrl) {
        const img = document.createElement('img');
        img.src = msg.imagemUrl;
        img.alt = 'Imagem da mensagem';
        img.classList.add('mensagem-imagem');
        card.appendChild(img);
      }

      const meta = document.createElement('p');
      meta.classList.add('mensagem-autor');
      meta.textContent = `Por ${msg.autor?.nome ?? 'Anônimo'} · ${formatarData(msg.criadoEm)}`;
      card.appendChild(meta);

      const podeExcluir =
        usuario && (usuario.id === msg.autorId || usuario.role === 'ADMIN');
      if (podeExcluir) {
        const btn = document.createElement('button');
        btn.textContent = 'Excluir';
        btn.classList.add('btn');
        btn.addEventListener('click', async () => {
          if (!confirm('Excluir esta mensagem?')) return;
          try {
            await deletarMensagem(msg.id, getToken());
            card.remove();
            exibirToast('sucesso', 'Mensagem excluída.');
          } catch (e) {
            exibirToast('erro', e.message);
          }
        });
        card.appendChild(btn);
      }

      lista.appendChild(card);
    });
  } catch (e) {
    lista.textContent = 'Não foi possível carregar o mural.';
  }
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  if (!estaLogado()) {
    erro.textContent = 'Faça login para postar.';
    return;
  }
  const texto = document.getElementById('texto').value.trim();
  if (!texto) {
    erro.textContent = 'Escreva uma mensagem.';
    return;
  }

  const dados = { texto };
  const imagemUrl = await urlDaImagem();
  if (imagemUrl) dados.imagemUrl = imagemUrl;

  try {
    await criarMensagem(dados, getToken());
    document.getElementById('texto').value = '';
    widget.value(null);
    erro.textContent = '';
    exibirToast('sucesso', 'Mensagem publicada!');
    renderizar();
  } catch (e) {
    exibirToast('erro', e.message);
  }
});

renderizar();
