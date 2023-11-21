const {bot} = require('./bot')
const User = require('../model/user')
const {request} = require("express");
const {add_category} = require("./helper/category");

bot.on('callback_query', async query => {
    const chatId = query.from.id
    const {data} = query
    console.log(data)
    if (data === 'add_category') {
        add_category(chatId)
    }

})