const MONGOOSE = require('mongoose');

const APPLICATION_SCHEM = new MONGOOSE.Schema({
  accountId:String,
  roomId:String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected']
  },
  message: {
    type: String,
    required: false
  }
})

const APPLICATION = MONGOOSE.model('Application', APPLICATION_SCHEM);

module.exports = APPLICATION;
