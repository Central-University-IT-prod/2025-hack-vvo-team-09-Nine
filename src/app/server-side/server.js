const EXPRESS = require('express');
const BODYPARSER = require('body-parser');
const CORS = require('cors');
const CONNECT_DB = require('./config/db');
const TAG_ROUTES = require('./routes/tagRoutes');
const ROOM_ROUTES = require('./routes/roomRoutes');
const ACCOUNT_ROUTES = require('./routes/accountRoutes');
const APPLICATION_ROUTES = require('./routes/applicationRoutes');
// const ROOM_IMAGE_ROUTES = require('./routes/roomImageRoutes');

const APP_PORT = 5000;

const APP = EXPRESS();
// Подключение к базе данных
CONNECT_DB(); 

// Мидлвары
APP.use(CORS());
APP.use(BODYPARSER.json());
APP.use(BODYPARSER.urlencoded({ extended: true }));
APP.use('/uploads', EXPRESS.static('server-side/uploads'));

// Маршруты
APP.use('/tag', TAG_ROUTES);
APP.use('/room', ROOM_ROUTES);
APP.use('/account', ACCOUNT_ROUTES);
APP.use('/application', APPLICATION_ROUTES);
// APP.use('/room/image', ROOM_IMAGE_ROUTES);

// Запуск сервера
APP.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});

// Middleware для обработки ошибок
APP.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});