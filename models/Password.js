const mongoose = require('mongoose');

const PasswordSchema = new mongoose.Schema({
    websiteName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    password: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Password', PasswordSchema);
