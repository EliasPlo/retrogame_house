const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'], required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
