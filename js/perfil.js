import { buscarAluno, atualizarAluno } from './api.js';
import { getUsuarioLogado, getToken } from './auth.js';

const FOTO_PADRAO = 'https://picsum.photos/200';
const container = document.getElementById('perfil');
const areaEdicao = document.getElementById('area-edicao');
const params = new URLSearchParams(window.location.search);
// sem ?id na URL (link "Meu perfil"), usa o id de quem está logado
const id = params.get('id') ?? getUsuarioLogado()?.id;

function naoEncontrado() {
  container.innerHTML = '<p>Perfil não encontrado. <a href="index.html">Voltar</a></p>';
}

async function carregar() {
  if (!id) return naoEncontrado();

  try {
    const aluno = await buscarAluno(id);
    if (!aluno) return naoEncontrado();

    renderizar(aluno);

    // edição só para o dono
    const usuario = getUsuarioLogado();
    if (usuario && usuario.id === Number(id)) {
      ativarEdicao(aluno);
    }
  } catch (e) {
    container.textContent = 'Erro ao carregar o perfil.';
  }
}

function renderizar(aluno) {
  container.innerHTML = '';
  container.classList.add('perfil');

  const foto = document.createElement('img');
  foto.src = aluno.fotoUrl ?? FOTO_PADRAO;
  foto.alt = `Foto de ${aluno.nome}`;
  foto.classList.add('perfil-foto');

  const nome = document.createElement('h2');
  nome.textContent = aluno.nome;
  const cidade = document.createElement('p');
  cidade.textContent = aluno.cidade ?? '';
  const frase = document.createElement('blockquote');
  frase.textContent = aluno.frase ?? '';
  const planos = document.createElement('p');
  planos.textContent = aluno.planosFuturos ?? '';

  container.append(foto, nome, cidade, frase, planos);
}

function ativarEdicao(aluno) {
  areaEdicao.hidden = false;
  document.getElementById('edit-cidade').value = aluno.cidade ?? '';
  document.getElementById('edit-frase').value = aluno.frase ?? '';
  document.getElementById('edit-planos').value = aluno.planosFuturos ?? '';

  document.getElementById('form-edicao').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const dados = {
      cidade: document.getElementById('edit-cidade').value.trim(),
      frase: document.getElementById('edit-frase').value.trim(),
      planosFuturos: document.getElementById('edit-planos').value.trim(),
    };
    try {
      const atualizado = await atualizarAluno(id, dados, getToken());
      renderizar(atualizado);
      document.getElementById('feedback').textContent = 'Perfil atualizado!';
    } catch (e) {
      document.getElementById('feedback').textContent = 'Não foi possível salvar.';
    }
  });
}

carregar();
