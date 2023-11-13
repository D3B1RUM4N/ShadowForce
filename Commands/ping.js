const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Affiche la latence du bot !",
    permission : "Aucune",
    dm : true,
    

    async run(client, message) {

        await message.reply(`Pong :ping_pong: : \`${client.ws.ping}\` ms :)`)
    }
}