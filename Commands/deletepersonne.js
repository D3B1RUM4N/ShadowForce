module.exports = {
    name: "deletepersonne",
    description: "suprime une personne a l'annuaire!",
    permission: "Aucune",
    category: "RP",
    dm: false,
    options: [{
        name: "id",
        type: "number",
        description: "id de la personne",
        required: true
    }],

    async run(client, message, args) {
        const id = args.get("id").value

        client.db.personne.delete({
            where: {
                id: id
            }
        }).then(() => {
            message.reply({content: `Personne supprimé avec succès`, ephemeral: true})
        }).catch((err) => {
            message.reply({content: `Erreur lors de la suppression de la personne : ${err}`, ephemeral: true})
        })
    }
}