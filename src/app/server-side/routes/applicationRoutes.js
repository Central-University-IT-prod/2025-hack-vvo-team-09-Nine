const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const ACCOUNT = require('../models/account');
const APPLICATION = require('../models/application');
const ROOM = require('../models/room');

ROUTER.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const FIND_ACCOUNT = await ACCOUNT.findOne({
      email: req.body.email,
      password: req.body.password
    })
    const FIND_ROOM = await ROOM.findById(req.body.roomId)
    console.log(FIND_ROOM,FIND_ACCOUNT)
    if (!FIND_ACCOUNT||!FIND_ROOM) return res.status(404).send('Not found ');
    const CREATED_APPLICATION = new APPLICATION({
      accountId: FIND_ACCOUNT._id,
      roomId: req.body.roomId,
      status: 'pending'
    })
    await CREATED_APPLICATION.save()
    res.status(201).send(CREATED_APPLICATION);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

ROUTER.put('/', async (req, res) => {
  try {
    const FIND_ACCOUNT = ACCOUNT.findOne({
      email: req.body.email,
      password: req.body.password
    })
    if (!FIND_ACCOUNT) return res.status(404).send('Not found account');
    let FIND_APPLICATION = await APPLICATION.findOne({
      accountId: FIND_ACCOUNT._id,
      roomId: req.body.roomId
    })
    if (FIND_ACCOUNT) return res.status(404).send('Not found application');
    FIND_APPLICATION.status = req.body.status
    res.status(201).send('Application updated');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

ROUTER.get('/account/', async (req, res) => {
  try {
    const FIND_ACCOUNT = ACCOUNT.findOne({
      email: req.query.email,
      password: req.query.password
    })
    if (!FIND_ACCOUNT) return res.status(404).send('Not found account');
    let FIND_APPLICATIONS = await APPLICATION.find({
      accountId: FIND_ACCOUNT._id
    })
    res.status(201).send({applications:FIND_APPLICATIONS});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = ROUTER;
