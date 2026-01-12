# Backend — Alem da Sala

Pequeno backend Express para servir `src/data/data.json` e imagens da pasta `public/img`.

Instalação e execução:

```bash
cd backend
npm install
# em desenvolvimento (recarrega com nodemon):
npm run dev
# em produção:
npm start
```

Endpoints:

- `GET /api/projects` — lista todos os projetos. Query params: `tipo`, `curso`, `q`.
- `GET /api/projects/:id` — retorna projeto por id.
- Imagens: servidas em `/img/<arquivo>` (mapeado para `public/img`).
