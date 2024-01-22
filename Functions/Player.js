const Discord = require('discord.js')
const puppeteer = require('puppeteer');

let isFirst

module.exports = {
    getInfos:async function(client, config) {
        try {
            
                const browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                });
                const page = await browser.newPage();

                await page.goto(config.URL_FIVEM);

                //console.log('INFORMATIONS OF SERVER RECEIVED...');
                const element = await page.$('.label-players');
            

                //console.log(element);

                if (!!element) {

                    const gamersText = await page.evaluate(el => el.textContent, element);
                    const gamers = gamersText.split('/');
                    //console.log(gamers);


                    const text = await (await element.getProperty('textContent')).jsonValue();

                    /**
                     * SET NUMBER OF PLAYERS INTO NAME CHANNEL DISCORD
                     * COMMENT/DECOMMENT BLOCK TO USE IT
                     **/
                    /*client.channels.fetch(config.ID_CHANNEL_PLAYERS).then(channel => {
                        console.log('SET NEW NAME WITH PLAYERS ON CHANNEL NAME...');
                        //channel.setName(`Joueurs: ${text.replace('group', '')}`);
                        //console.log(`JOUEURS: ${text.replace('group', '')}`);
                        channel.setName(`Joueurs connecté: ${gamers[0]}/${gamers[1]}`);
                        console.log(`Joueurs connecté: ${gamers[0]}/${gamers[1]}`);
                    });*/

                    /**
                     * SET NUMBER OF PLAYERS IN ACTIVITY BOT
                     * COMMENT/DECOMMENT LINES TO USE IT
                     **/
                    client.user.setStatus('online');
                    client.user.setActivity(`${gamers[0]}/${gamers[1]} Joueurs`);

                } else {
                    console.log('FIVEM ERROR GET INFORMATIONS... RETRY LATER');
                }
                await browser.close();
            
        } catch (error) {
            console.log(error);
        }
    }
}