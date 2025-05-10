const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const ROOM = require('../models/room');

ROUTER.get('/all', async (req, res) => {
  try {
    let { tags } = req.query;

    // Если теги не переданы, возвращаем все комнаты
    if (!tags) {
      const allRooms = await ROOM.find({});
      return res.status(200).json({ rooms: allRooms });
    }

    // Если теги есть, преобразуем их в массив (если передан один тег)
    tags = tags.split(',');

    // Забираем все комнаты из базы
    const allRooms = await ROOM.find({});
    const matchedRooms = [];

    // Перебор всех комнат и расчет совпадений
    for (const room of allRooms) {
      if (!Array.isArray(room.tags)) continue;

      const roomTagsSet = new Set(room.tags);
      const incomingTagsSet = new Set(tags);

      // Считаем количество совпадающих тегов
      let matchCount = 0;
      for (const tag of incomingTagsSet) {
        if (roomTagsSet.has(tag)) {
          matchCount++;
        }
      }

      if (matchCount > 0) {
        matchedRooms.push({ room, matchCount });
      }
    }

    // Сортируем: сначала больше совпадений — потом меньше
    matchedRooms.sort((a, b) => b.matchCount - a.matchCount);

    // Оставляем только 10 лучших
    const resultRooms = matchedRooms.slice(0, 10).map(entry => entry.room);

    return res.status(200).json({ rooms: resultRooms });
  } catch (err) {
    console.error('Ошибка при поиске комнат:', err);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});


ROUTER.get('/account', async (req, res) => {
  try {
    const FIND_ROOMS = await ROOM.find({
      accounts: req.query.accountId
    })
    res.status(200).send(FIND_ROOMS);
  } catch (err) {
    result.status(400).json({ message: err.message });
  }
});
ROUTER.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const CREATE_ROOM = new ROOM(req.body)
    await CREATE_ROOM.save()
    res.status(200).send(CREATE_ROOM);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

ROUTER.put('/', async(req, res) => {
  try {
    let FIND_ROOM = await ROOM.findById(req.body.id)
    if (!FIND_ROOM) return res.status(404).send('Not found');
    FIND_ROOM.status=req.body.status
    await FIND_ROOM.save()
    res.status(200).send(FIND_ROOM);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = ROUTER;
