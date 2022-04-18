const { MessageButton, MessageEmbed } = require("discord.js");
const validUrl = require("valid-url");
module.exports = {

    name: "delete-monitor",
    description: "💻 supprimer le moniteur",
    category: "Configuration",
    options: [
        {
            name: "url",
            description: "Entrez l'url",
            type: 3,
            required: true
        }
    ],
    botPerms: ["SEND_MESSAGES"],
    memberPerms: ["SEND_MESSAGES", "ADMINISTRATOR"],
    enabled: true,
    run: async (client, interaction) => {
        /* Get Option */
        let url = interaction.options.getString("url")
        let channel = interaction.options.getChannel("channel")

        /* Check URL */
        if (!validUrl.isUri(url)) return interaction.reply({ content: "Veuillez fournir une URL valide.", ephemeral: true });

        /* Get DB */
        let UptimeDB = await client.data.getMonitor(interaction.user.id, url);

        /* Check DB */
        if (!UptimeDB) {

            interaction.reply({
                content: `Vous n'avez pas de moniteur pour ${url} !`,
                ephemeral: true
            })

        } else {

            await client.base_up(interaction, null, null, url, channel, "delete");

        }


    },
};
