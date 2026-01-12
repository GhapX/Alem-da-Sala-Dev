const data = require('../../src/data/data.json');

module.exports = (req, res) => {
  try {
    const { id } = req.query;
    const item = data.find(p => String(p.id) === String(id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(item));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
