const Discord = require('discord.js')
const logs = require('../Functions/log.js')

module.exports = {
    name: "crypted",
    description: "Ecris un message en anonyme, il serra crypté!",
    permission : "Aucune",
    category : "RP",
    dm : false,
    options: [{
        name: "pseudo",
        type: "string",
        description: "Le pseudo à afficher (optionnel)",
        required: true
    },{
        name: "message",
        type: "string",
        description: "Le message à envoyer ( | pour les retours à la ligne)",
        required: true
    },{
        name: "channel",
        type: "channel",
        description: "Le channel où envoyer le message (optionnel)",
        required: false
    }],
    
    
    
    async run(client, message, args) {

        const replacements = {
            '|' : '\n',
            'e': '3',
            'E': '3',
            'a': '4',
            'A': '4',
            'O' : '0',
            'o' : '0',
            'I' : '1',
            'i' : '1',
            'L' : '1',
            'l' : '1'
            
            // Add more replacements as needed
        };
    

        let msg = ``;
        msg += `\`\`\`Mail crypté \nConnection en cours... \`\`\``
        msg += `**${args.get("pseudo").value}** : `;

        msg += args.get("message").value.replace(/[ea]/gi, match => replacements[match] || match);
        let channelID = args.get("channel")?.value;
        let channel = client.channels.cache.get(channelID);


        if (!channel) {
        // Si aucun channel n'est spécifié, vous pouvez spécifier un channel par défaut ici
        channel = client.channels.cache.get(message.channel.id);
        }

        console.log(channelID);
        channel.send(msg);
        logs.log(`[${new Date().toISOString()}]\t ${message.user.tag} a envoyé un message anonyme dans le canal ${message.channel.name} : \n"${message}"`);


        //await message.reply(`Pong :ping_pong: : \`${client.ws.ping}\` ms :)`)
    }


    
}