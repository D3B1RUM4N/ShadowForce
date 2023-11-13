const Discord = require('discord.js')
const loadSlashCommands = require('../loader/loadSlashCommands')

module.exports = async client => {

    await loadSlashCommands(client)

    //client.user.setActivity("🔥 | !help", {type: "WATCHING"})
    console.log(`${client.user.tag} est bien en ligne !`)
}