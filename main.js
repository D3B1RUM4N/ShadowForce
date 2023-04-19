const Discord = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const client = new Discord.Client({intents})
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config')
//Les loader
const loadCommands = require('./loader/loadCommands')
const loadEvents = require('./loader/loadEvents')



function sendMessage() {
    const channel = client.channels.cache.get('1098305173165715508'); // Remplacez CHANNEL_ID par l'identifiant du salon où vous souhaitez envoyer le message
    /*if (channel) {
      channel.send("Bonjour à tous !");
    } else {
      console.error("Impossible de trouver le salon pour envoyer le message !");
    }*/
    //lancer la commande reroll
    const randomNum = Math.floor(Math.random() * 1000);
    channel.send(`Radio journaliere : ${randomNum}`);
  }

  // Définir l'intervalle pour envoyer le message tous les jours à 6h
  //const interval = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
    const interval = 1 * 60 * 1000; // 1 min en millisecondes
    const now = new Date();
    const delay = interval - now % interval;
    setTimeout(() => {
        sendMessage();
        setInterval(sendMessage, interval);
    }, delay);






//client.on('raw', console.log);

client.commands = new Discord.Collection()

client.login(config.token)
loadCommands(client)
loadEvents(client)
