const MONGOOSE = require('mongoose');
const ROOM_IMAGE_SCHEM = new MONGOOSE.Schema({
  filename: String,
  userId:String
})

const ROOM_IMAGE = MONGOOSE.model('RoomImage', ROOM_IMAGE_SCHEM);

module.exports = ROOM_IMAGE;
