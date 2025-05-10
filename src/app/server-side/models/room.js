const MONGOOSE = require('mongoose');
const ROOM_SCHEM = new MONGOOSE.Schema({
  peopleCurrent:Number,
  peopleMax:Number,
  name:String,
  description:String,
  accounts: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
})

const ROOM = MONGOOSE.model('Room', ROOM_SCHEM);

module.exports = ROOM;
