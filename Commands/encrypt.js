const Discord = require('discord.js')
const logs = require('../Functions/log.js')

module.exports = {
    name: "encrypt",
    description: "Ecris un message en anonyme, il serra crypté!",
    permission: "Aucune",
    category: "RP",
    dm: false,
    options: [{
        name: "pseudo",
        type: "string",
        description: "Le pseudo à afficher",
        required: true
    }, {
        name: "message",
        type: "string",
        description: "Le message à envoyer ( | pour les retours à la ligne)",
        required: true
    }, {
        name: "key",
        type: "number",
        description: "clé de cryptage",
        required: true
    }],


    async run(client, message, args) {
        logs.log(`[${new Date().toISOString()}]\t ${message.user.tag} a envoyé un message crypté dans le canal ${message.channel.name} : \n"${message}"`);

        let crypted = ``;
        crypted += `\`\`\`Mail crypté\nCryptage effectué\`\`\``
        crypted += `**${args.get("pseudo").value}** : `;

        // je veux remplacer les caractères spéciaux par leur équivalent
        let decrypted = args.get("message").value.replace(/[^\x00-\x7F]/g, match => replacements[match] || match);
        let shift = Number(args.get("key").value)

        // Vérifier si le décalage est dans la plage valide
        if (shift < 0) {
            shift = shift % 26 + 26;
        } else {
            shift = shift % 26;
        }

        // Convertir le message en tableau de caractères
        for (var i = 0; i < decrypted.length; i++) {
            if (decrypted[i].match(/[a-z]/i)) {
                const ascii = decrypted[i].charCodeAt(0)
                if (ascii >= 65 && ascii <= 90) {
                    crypted += String.fromCharCode(((ascii - 65 + shift) % 26) + 65)
                } else if (ascii >= 97 && ascii <= 122) {
                    crypted += String.fromCharCode(((ascii - 97 + shift) % 26) + 97);
                }
            }
            else {
                if (decrypted[i] === '|') {
                    crypted += '\n';
                }
                else {
                    crypted += decrypted[i];
                }
            }
        }

        channel = client.channels.cache.get(message.channel.id);
        await message.reply({ content: `message original : ${args.get("message").value}`, ephemeral: true })
        await channel.send(crypted)
    }
}


const replacements = {
    'é': 'e',
    'è': 'e',
    'ê': 'e',
    'à': 'a',
    'â': 'a',
    'ô': 'o',
    'î': 'i',
    'û': 'u',
    'ç': 'c',
    'ù': 'u',
    'ë': 'e',
    'ï': 'i',
    'ü': 'u',
    'ö': 'o',
    'É': 'E',
    'È': 'E',
    'Ê': 'E',
    'À': 'A',
    'Â': 'A',
    'Ô': 'O',
    'Î': 'I',
    'Û': 'U',
    'Ç': 'C',
    'Ù': 'U',
    'Ë': 'E',
    'Ï': 'I',
    'Ü': 'U',
    'Ö': 'O',
    // Add more replacements as needed
};