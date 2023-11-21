const {bot} = require('../bot')
const {process_params} = require("express/lib/router");
const {adminKeyboard, userKeyboard} = require('../menu/keyboard')
const User = require('../../model/user')


const get_all_users = async (msg) => {
    const chatId = msg.from.id
    let user = await User.findOne({chatId}).lean()
    if (user.admin) {
        let users = await User.find().lean()
        let list = ''
        users.forEach(user => {
            list += `${user.name} : ${user.chatId}\n`
        })

        bot.sendMessage(chatId, `Foydalanuvchilar ro'yxati :  
        ${list} `)
    } else {
        bot.sendMessage(chatId, 'Sizga bunday so`rov mumkin emas', {
            reply_markup: {
                keyboard: userKeyboard,
                resize_keyboard: true
            }
        })
    }
}

module.exports = {get_all_users}