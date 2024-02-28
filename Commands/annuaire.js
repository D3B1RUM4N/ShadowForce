const Discord = require('discord.js')


module.exports = {
    name: "annuaire",
    description: "affiche la liste des personnes!",
    permission: "Aucune",
    category: "RP",
    dm: false,
    options: [{
        name: "id",
        type: "number",
        description: "id de l'annuaire",
        required: false
    }, {
        name: "telephone",
        type: "string",
        description: "cherher par son numero de telephone",
        required: false
    }, {
        name: "nom",
        type: "string",
        description: "chercher par son nom",
        required: false
    }, {
        name: "prenom",
        type: "string",
        description: "chercher par son prenom",
        required: false
    }, {
        name: "job",
        type: "string",
        description: "chercher par son job",
        required: false
    }],

    async run(client, message, args) {
        const id = args.get("id")?.value
        const telephone = args.get("telephone")?.value
        const nom = args.get("nom")?.value
        const prenom = args.get("prenom")?.value
        const job = args.get("job")?.value

        const personnes = await client.db.personne.findMany({
            where: {
                id: { contains: id },
                phoneNumber: { contains: telephone },
                lastName: { contains: nom },
                firstName: { contains: prenom },
                job: { contains: job }
            },
            orderBy: {
                firstName: 'asc'
            }
        })

        if (personnes.length === 0) {
            message.reply({ content: `Aucun résultat`, ephemeral: true })
            return
        }

        let Embed = new Discord.EmbedBuilder()
            .setColor(client.color)
            .setTitle(`Annuaire`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Liste des personnes trouvées`)
            .setFooter({ text: `Demandé par ${message.user.tag}` })
            .setTimestamp()
        await personnes.forEach(personne => {
            Embed.addFields({ name: `${personne.firstName}`, value: `ID : #${personne.id} - ${personne.lastName} - ${personne.phoneNumber} - ${personne.job} - ${personne.groupe}` })
        })

        await message.reply({ embeds: [Embed] })
    }
}