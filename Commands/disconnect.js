const Discord = require('discord.js')

module.exports = {
    name: "disconnect",
    description: "Deconnecte le bot",
    permission : "Aucune",
    dm : false,
    

    async run(client, message) {
        await message.reply(`bot déconnecté`)
        client.destroy()
    }
}