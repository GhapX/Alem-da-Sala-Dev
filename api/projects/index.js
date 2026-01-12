const data = require('../../src/data/data.json');

module.exports = (req, res) => {
  try {
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
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(result));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
