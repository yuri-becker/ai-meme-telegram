const md5 = require('crypto').createHash('md5')
const config = require('./config.json')

module.exports = `b${md5.update(config.telegramBotToken).digest('hex')}`
