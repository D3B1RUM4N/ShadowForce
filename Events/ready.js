const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const loadSlashCommands = require('../loader/loadSlashCommands')

module.exports = async client => {

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