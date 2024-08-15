const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    minlength: 11,
    maxlength: 11,
    match: /^\d+$/ // Garante que o CPF contém apenas dígitos
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
