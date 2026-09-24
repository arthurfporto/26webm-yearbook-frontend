# yearbook-frontend-ref

> Repositório-resposta privado do professor para o `yearbook-frontend` da disciplina **Desenvolvimento Web — IFNMG Salinas 2026**.

Front-end do Yearbook Digital — site estático (HTML, CSS, JS vanilla) que consome a API do `yearbook-backend` via `fetch`. Organizado em branches de checkpoint ao longo da Fase 4.

## Stack

- HTML5 semântico
- CSS3 (bloco 4.2)
- JavaScript ES Modules + Fetch API (bloco 4.3+)
- Uploadcare via CDN (upload de imagens)
- Deploy: Vercel (site estático) | CI: GitHub Actions (smoke test)

## Estado atual

**Bloco 4.4 — funcionalidades completas (checkpoint/aula-58).** Aplicação completa: login/logout/proteção, cadastro com Uploadcare, listagem e perfil individual, edição (só dono), mural (listar/enviar/imagem/excluir), feedbacks (toasts), tratamento de 401/403, responsividade. Falta só o deploy final e o encerramento (bloco 4.5).

```
yearbook-frontend-ref/
├── .github/workflows/smoke-test.yml
├── css/style.css   identidade, layout, responsivo, toasts, dinâmicos
├── js/
│   ├── api.js      API_URL + login, registrar, alunos, mensagens, tratarAuth
│   ├── auth.js     token + getUsuarioLogado
│   ├── utils.js    exibirToast
│   ├── login.js    login (form → API → token → redirect)
│   ├── cadastro.js register + Uploadcare
│   ├── perfis.js   listagem de perfis
│   ├── perfil.js   perfil individual + edição (dono)
│   ├── mural.js    listar/enviar/imagem/excluir mensagens
│   └── main.js     demo de DOM (aula 43)
├── index.html  login.html  cadastro.html  perfil.html  mural.html
```

> A `API_URL` em `js/api.js` e a `UPLOADCARE_PUBLIC_KEY` nos HTMLs são placeholders — ajuste para os valores reais.

> Imagens usam URLs do picsum.photos como placeholder — funcionam sem assets binários. No projeto do aluno, podem ser arquivos locais em `img/`.

## Checkpoints da Fase 4

| Branch | Aula | Estado |
| --- | --- | --- |
| `checkpoint/aula-35` | 35 | HTML completo — todas as páginas estruturadas |
| `checkpoint/aula-42` | 42 | CSS completo — layout e responsividade |
| `checkpoint/aula-46` | 46 | JS cliente — DOM, eventos, Fetch, serviço |
| `checkpoint/aula-54` | 54 | Funcionalidades completas — CRUD, auth, upload |
| `checkpoint/aula-58` | 58 | Frontend finalizado |
