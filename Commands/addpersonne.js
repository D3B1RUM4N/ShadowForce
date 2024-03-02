module.exports = {
    name: "addpersonne",
    description: "ajoute une personne a l'annuaire!",
    permission: "Aucune",
    category: "RP",
    dm: false,
    options: [{
        name: "telephone",
        type: "string",
        description: "numero de telephone",
        required: true
    }, {
        name: "nom",
        type: "string",
        description: "son nom",
        required: false
    }, {
        name: "prenom",
        type: "string",
        description: "son prenom",
        required: false
    }, {
        name: "job",
        type: "string",
        description: "son job",
        required: false
    }, {
        name: "groupe",
        type: "string",
        description: "son groupe",
        required: false
    }],

    async run(client, message, args) {
        const telephone = args.get("telephone").value
        const nom = args.get("nom")?.value
        const prenom = args.get("prenom")?.value
        const job = args.get("job")?.value || "sans emploi"
        const groupe = args.get("groupe")?.value || "civil"

        const peronne = await client.db.personne.findUnique({
            where: {
                phoneNumber: telephone
            }
        })

        if (peronne) {
            message.reply({ content: `Ce numéro de téléphone est déjà utilisé : /alterpersonne`, ephemeral: true })
            return
        }

        client.db.personne.create({
            data: {
                phoneNumber: telephone,
                lastName: nom,
                firstName: prenom,
                job: job,
                groupe: groupe
            }
        }).then(() => {
            message.reply({ content: `${nom} ${prenom} ajoutée avec succès a l'annuaire`, ephemeral: false })
        }).catch((err) => {
            message.reply({ content: `Erreur lors de l'ajout de la personne : ${err}`, ephemeral: true })
        })
    }
}