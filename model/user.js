const {Schema, model} = require('mongoose')

const User = new Schema({
    name: String,
    chatId: Number,
    phone: String,

    action: String,
    createdAt: Date,
    status: {
        type: Boolean,
        default: true
    },
    admin: {
        type: Boolean,
        default: false
    }
})


module.exports = model('User', User)