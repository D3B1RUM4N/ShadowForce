const Discord = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const client = new Discord.Client({intents})
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config')
//Les loader
const loadCommands = require('./loader/loadCommands')
const loadEvents = require('./loader/loadEvents')
//pour la fonction radio
const schedule = require('node-schedule');

    

    const channelID = '1195078035616055356'; // ID du canal où le message sera envoyé


    client.once('ready', () => {
      console.log('Le bot est en ligne !');
      
      // Définir la règle pour planifier l'envoi du message
      const rule = new schedule.RecurrenceRule();
      rule.tz = 'Etc/GMT-2'; // Définir le fuseau horaire pour éviter les problèmes liés à l'heure d'été / d'hiver
      rule.hour = 2; // Définir l'heure
      rule.minute = 0; // Définir les minutes
    
      // Planifier l'envoi du message
      schedule.scheduleJob(rule, () => {
        const channel = client.channels.cache.get(channelID);
        if (channel) {
          const randomNum = Math.floor(Math.random() * 1000);
          channel.send(`Radio journalière : ${randomNum}\n`+
                      `Les Gitan : 69`);
        } else {
          console.error(`Impossible de trouver le salon d'ID ${channelID} pour envoyer le message !`);
        }
      });
    });




//client.on('raw', console.log);

client.commands = new Discord.Collection()

client.login(config.token)
loadEvents(client)
loadCommands(client)
