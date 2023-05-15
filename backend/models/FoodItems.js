const mongoose = require('mongoose');
const {Schema}=require('mongoose');

const itemSchema = new Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  reviews: {
    type: Array,
    required: true,
  },
  count: {
    type:Number,
    required: true,
  },
});

module.exports = mongoose.model('food_items', itemSchema);
