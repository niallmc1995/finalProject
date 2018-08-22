const mongoose = require('mongoose');

//**REFERENCE 
//https://mongoosejs.com/docs/guide.html*/
//specifying the data that will be used for a mongoose schema for mongodb
const postSchema = mongoose.Schema({
  title: {type: String, required: true },
  content: { type: String, required: true},
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  memeLink: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);
