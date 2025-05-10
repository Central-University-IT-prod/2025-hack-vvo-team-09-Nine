const MONGOOSE = require('mongoose');
const TAG_SCHEM = new MONGOOSE.Schema({
  value: String
});

const TAG = MONGOOSE.model('Tag', TAG_SCHEM);

module.exports = TAG;
