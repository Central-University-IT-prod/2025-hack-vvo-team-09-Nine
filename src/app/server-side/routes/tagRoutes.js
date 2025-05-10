const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

ROUTER.post('/', (req, res) => {
  // Логика создания тега
  res.status(201).send('Tag created');
});

ROUTER.get('/all', (req, res) => {
  // Логика получения всех тегов
  res.status(200).send('Tags retrieved');
});

module.exports = ROUTER;
