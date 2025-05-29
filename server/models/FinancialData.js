const mongoose = require('mongoose');

const FinancialDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default: 'Other'
  },
  fileType: {
    type: String
  },
  filename: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FinancialData', FinancialDataSchema);