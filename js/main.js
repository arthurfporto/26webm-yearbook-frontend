// Demonstração de DOM (aula 43). Renderiza cards de um array fixo
// num container #demo-cards, se ele existir na página.
const alunosDemo = [
  { nome: 'Maria Silva', cidade: 'Salinas' },
  { nome: 'João Souza', cidade: 'Montes Claros' },
  { nome: 'Ana Lima', cidade: 'Taiobeiras' },
];

const container = document.getElementById('demo-cards');
if (container) {
  alunosDemo.forEach((aluno) => {
    const card = document.createElement('article');
    card.classList.add('card');
    const h3 = document.createElement('h3');
    h3.textContent = aluno.nome;
    const p = document.createElement('p');
    p.textContent = aluno.cidade;
    card.append(h3, p);
    container.appendChild(card);
  });
}
