const {bot} = require('../bot')
const {process_params} = require("express/lib/router");
const {adminKeyboard, userKeyboard} = require('../menu/keyboard')
const User = require('../../model/user')
const start = async (msg) => {
    const chatId = msg.from.id
    let checkUser = await User.findOne({chatId})
    if (!checkUser) {
        let newUser = new User({
            name: msg.from.first_name, chatId, status: true, createdAt: new Date(), action: 'request_contact'
        })
        await newUser.save();
        await bot.sendMessage(chatId, `Assalomu alaykum hurmatli ${msg.from.first_name}. Iltimos telefon raqamingizni share qiling`, {
            reply_markup: {
                keyboard: [[{
                    text: 'Telefon raqamni yuborish', request_contact: true
                }]

                ], resize_keyboard: true
            }
        })
    } else {
        await User.findByIdAndUpdate(checkUser._id, {...checkUser, action: 'menu'}, {new: true})
        bot.sendMessage(chatId, `Menyuni tanlang ${checkUser.admin ? 'Admin' : checkUser.name}`, {
            reply_markup: {
                keyboard: checkUser.admin ? adminKeyboard : userKeyboard,
                resize_keyboard: true
            },
        })
    }
}
const requestContact = async (msg) => {
    const chatId = msg.from.id
    if (msg.contact && msg.contact.phone_number) {
        let user = await User.findOne({chatId}).lean()
        user.phone = msg.contact.phone_number
        user.admin = msg.contact.phone_number === '+998950960153'
        user.action = 'menu'
        await User.findByIdAndUpdate(user._id, user, {new: true})
        bot.sendMessage(chatId, `Menyuni tanlang ${user.admin ? 'Admin' : user.name}`, {
            reply_markup: {
                keyboard: user.admin ? adminKeyboard : userKeyboard,
                resize_keyboard: true
            },
        })
    }
}


module.exports = {
    start, requestContact
}
