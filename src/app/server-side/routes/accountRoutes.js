const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const ACCOUNT = require('../models/account');

ROUTER.get('/', async(req, res) => {
  try {
    console.log(req.query)
    const FIND_ACCOUNT = await ACCOUNT.findOne({
      email: req.query.email,
      password:req.query.password
    })
    if (!FIND_ACCOUNT) return res.status(404).send('Not found');
    res.status(200).send(FIND_ACCOUNT);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

ROUTER.post('/', async(req, res) => {
  try {
    const FIND_ACCOUNT = await ACCOUNT.findOne({
      email: req.body.email
    })
    console.log(FIND_ACCOUNT)
    if (FIND_ACCOUNT) return res.status(409).send('Already been');
    console.log(req.body)
    const CREATED_ACCOUNT = new ACCOUNT({...req.body})
    console.log(CREATED_ACCOUNT)
    await CREATED_ACCOUNT.save()
    res.status(200).send({message:'Account created'});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

ROUTER.put('/', async (req, res) => {
  try {
    console.log(req.body)
    let FIND_ACCOUNT = await ACCOUNT.findOne({
      email: req.body.email
    })
    if (!FIND_ACCOUNT) return res.status(404).send('Not found');
    FIND_ACCOUNT.faculty = req.body.faculty
    FIND_ACCOUNT.gender = req.body.gender
    FIND_ACCOUNT.course = req.body.course
    FIND_ACCOUNT.about = req.body.about
    FIND_ACCOUNT.name = req.body.name
    FIND_ACCOUNT.tg = req.body.tg
    console.log(FIND_ACCOUNT)
    await FIND_ACCOUNT.save()
    res.status(201).send('Account updated');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = ROUTER;
