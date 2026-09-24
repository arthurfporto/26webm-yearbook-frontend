import { listarAlunos } from './api.js';

const FOTO_PADRAO = 'https://picsum.photos/200';

async function carregar() {
  const container = document.getElementById('lista-alunos');
  if (!container) return;
  container.textContent = 'Carregando...';

  try {
    const alunos = await listarAlunos();
    container.innerHTML = '';

    if (alunos.length === 0) {
      container.textContent = 'Nenhum perfil ainda. Seja o primeiro!';
      return;
    }

    alunos.forEach((aluno) => {
      const link = document.createElement('a');
      link.href = `perfil.html?id=${aluno.id}`;

      const card = document.createElement('article');
      card.classList.add('card');

      const foto = document.createElement('img');
      foto.src = aluno.fotoUrl ?? FOTO_PADRAO;
      foto.alt = `Foto de ${aluno.nome}`;
      foto.classList.add('perfil-foto');

      const nome = document.createElement('h3');
      nome.textContent = aluno.nome;
      const frase = document.createElement('p');
      frase.textContent = aluno.frase ?? '';

      card.append(foto, nome, frase);
      link.appendChild(card);
      container.appendChild(link);
    });
  } catch (erro) {
    container.textContent = 'Não foi possível carregar os perfis.';
  }
}

carregar();
