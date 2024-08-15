const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'profissional'],
    default: 'profissional',
  },
});




// Encrypt password using bcrypt

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Use return para garantir que o fluxo de controle continue
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;