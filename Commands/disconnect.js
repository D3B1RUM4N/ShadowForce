const Discord = require('discord.js')

module.exports = {
    name: "disconnect",

    async run(client, message) {
        await message.reply(`bot déconnecté`)
        client.destroy()
    }
}