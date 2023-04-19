const Discord = require('discord.js')

module.exports = {
    name: "ping",

    async run(client, message) {

        await message.reply(`Pong :ping_pong: : \`${client.ws.ping}\`ms :)`)
    }
}