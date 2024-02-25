const Discord = require('discord.js')
const logs = require('../Functions/log.js')

module.exports = {
    name: "decrypt",
    description: "decrypte un message!",
    permission: "Aucune",
    category: "RP",
    dm: false,
    options: [{
        name: "message",
        type: "string",
        description: "Le message à decrypter ( | pour les retours à la ligne)",
        required: true
    }, {
        name: "key",
        type: "number",
        description: "clé de cryptage",
        required: true
    }],


    async run(client, message, args) {
        let shift = Number(args.get("key").value)
        // Vérifier si le décalage est dans la plage valide
        if (shift < 0) {
            shift = shift % 26 + 26;
        }else{
            shift = shift % 26;
        }
        let decrypted = ``;

        // je veux remplacer les caractères spéciaux par leur équivalent
        let crypted = args.get("message").value


        // Convertir le message en tableau de caractères
        for (let i = 0; i < crypted.length; i++) {
            if (crypted[i].match(/[a-z]/i)) {
                const ascii = crypted[i].charCodeAt(0);
                if (ascii >= 65 && ascii <= 90) {
                    decrypted += String.fromCharCode(((ascii - 65 - shift + 26) % 26) + 65);
                } else if (ascii >= 97 && ascii <= 122) {
                    decrypted += String.fromCharCode(((ascii - 97 - shift + 26) % 26) + 97);
                }
            } else {
                if (crypted[i] === '|') {
                    decrypted += '\n';
                } else {
                    decrypted += crypted[i];
                }
            }
        }

        channel = client.channels.cache.get(message.channel.id);
        await message.reply({content: `message decrypté : ${decrypted}`, ephemeral: true})    }
}