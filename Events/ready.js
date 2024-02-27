const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const loadSlashCommands = require('../loader/loadSlashCommands')
const loadDatabase = require('../loader/loadDatabase')


module.exports = async client => {

    client.db = await loadDatabase()

    await loadSlashCommands(client)

    client.user.setPresence({
        activities: [{
            status: 'dnd',
            name: `/encrypt -> msg crypté`,
            type: ActivityType.Watching,
            url: 'https://discord.gg/SHV4jQ77Kq'
        }],
    });

    console.log(`${client.user.tag} est bien en ligne !`)
    console.log('done')
}