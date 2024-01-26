const Discord = require('discord.js')

module.exports = {
    name: "disconnect",
    description: "Deconnecte le bot",
    permission : Discord.PermissionFlagsBits.Administrator,
    category : "Moderation",
    dm : false,
    

    async run(client, message) {
        await message.reply(`bot déconnecté`)
        client.destroy()
    }
}