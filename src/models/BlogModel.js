const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },

  {
    timestamps: true,
    strict: true,
    collection: 'blogs'
  }

);

module.exports = mongoose.model('Blog', blogSchema);
