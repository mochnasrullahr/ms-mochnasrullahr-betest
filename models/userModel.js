const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true, // Ensure unique account numbers
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
    },
    identityNumber: {
        type: String,
        required: true,
        unique: true, // Ensure unique identity numbers
    },
});

module.exports = mongoose.model('User', userSchema);