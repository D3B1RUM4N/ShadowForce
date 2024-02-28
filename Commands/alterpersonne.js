module.exports = {
    name: "alterpersonne",
    description: "modifie une personne de l'annuaire!",
    permission: "Aucune",
    category: "RP",
    dm: false,
    options: [{
        name: "id",
        type: "number",
        description: "id de l'annuaire",
        required: true
    }, {
        name: "telephone",
        type: "string",
        description: "modifier son numero de telephone",
        required: false
    }, {
        name: "nom",
        type: "string",
        description: "modifier son nom",
        required: false
    }, {
        name: "prenom",
        type: "string",
        description: "modifier son prenom",
        required: false
    }, {
        name: "job",
        type: "string",
        description: "modifier son job",
        required: false
    }, {
        name: "groupe",
        type: "string",
        description: "modifier son groupe",
        required: false
    }],

    async run(client, message, args) {
        const id = args.get("id").value


        const peronne = await client.db.personne.findUnique({
            where: {
                id: id
            }
        })

        if (!peronne) {
            message.reply({ content: `id inconnu`, ephemeral: true })
            return
        }

        const telephone = args.get("telephone")?.value || peronne.phoneNumber
        const nom = args.get("nom")?.value || peronne.lastName
        const prenom = args.get("prenom")?.value || peronne.firstName
        const job = args.get("job")?.value || peronne.job
        const groupe = args.get("groupe")?.value || peronne.groupe

        await client.db.personne.update({
            where: {
                id: id
            },
            data: {
                phoneNumber: telephone,
                lastName: nom,
                firstName: prenom,
                job: job,
                groupe: groupe
            }
        }).then(() => {
            message.reply({ content: `${peronne.lastName} modifié avec succès`, ephemeral: true })
        }).catch((err) => {
            message.reply({ content: `Erreur lors de la midification de la personne : ${err}`, ephemeral: true })
        })
    }
}