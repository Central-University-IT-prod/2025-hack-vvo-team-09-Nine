const MONGOOSE = require('mongoose');

const ACCOUNT_SCHEMA = new MONGOOSE.Schema({
  email: String,
  password:String,
  name:String,
  faculty:String,
  course:Number,
  gender:String,
  tg: String,
  about:String,
  accountType:String,
});

const ACCOUNT = MONGOOSE.model('Account', ACCOUNT_SCHEMA);

module.exports = ACCOUNT;
