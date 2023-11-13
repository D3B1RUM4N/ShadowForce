const Discord = require('discord.js')

module.exports = {
    name: "reroll",
    description: "reroll la radio !",
    permission : "Aucune",
    dm : false,

    async run(client, message) {
        
        const randomNum = Math.floor(Math.random() * 1000);
        await message.reply(`Radio journaliere : ${randomNum}`);

        //await message.reply(`Pong :ping_pong: : \`${client.ws.ping}\`ms :)`)
    }
}


