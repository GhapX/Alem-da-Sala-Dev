const express = require('express');
const cors = require('cors');
const path = require('path');

// handlers globais para capturar erros que causam crash
process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err && err.stack ? err.stack : err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
});

let data;
try {
  data = require('../../../src/data/data.json');
} catch (e) {
  console.error('Não foi possível carregar src/data/data.json:', e.message);
  data = [];
}

const app = express();
app.use(cors());
app.use(express.json());

// servir imagens do frontend/public/img
app.use('/img', express.static(path.join(__dirname, '..', 'public', 'img')));

app.get('/api/projects', (req, res) => {
  let result = data;
  const { tipo, curso, q } = req.query;
  if (tipo) {
    result = result.filter(p => String(p.tipo).toLowerCase() === String(tipo).toLowerCase());
  }
  if (curso) {
    result = result.filter(p => {
      if (Array.isArray(p.curso)) return p.curso.map(c => String(c).toLowerCase()).includes(String(curso).toLowerCase());
      return String(p.curso).toLowerCase() === String(curso).toLowerCase();
    });
  }
  if (q) {
    const term = String(q).toLowerCase();
    result = result.filter(p => (p.nome && p.nome.toLowerCase().includes(term)) || (p.descricao && p.descricao.toLowerCase().includes(term)));
  }
  res.json(result);
});

app.get('/api/projects/:id', (req, res) => {
  const item = data.find(p => String(p.id) === String(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API rodando na porta ${port}`));
