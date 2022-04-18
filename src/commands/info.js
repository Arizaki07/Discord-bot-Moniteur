const { MessageButton, MessageEmbed } = require("discord.js");
const validUrl = require("valid-url");
module.exports = {

    name: "fetch-monitor",
    description: "💻 Obtenez tous les moniteurs",
    category: "Configuration",
    options: [
        {
            name: "utilisateur",
            required: true,
            type: 6,
            description: "indiquez un utilisateur"
        }
    ],
    botPerms: ["SEND_MESSAGES"],
    memberPerms: ["SEND_MESSAGES"],
    enabled: true,
    run: async (client, interaction) => {

        /* Fetch Options */
        let user = interaction.options.getUser("utilisateur")

        /* Get DB */
        let MonitorDB = await client.data.getAllMonitor(user.id);
        /* Check if user is a bot */
        if (user.bot) return interaction.reply({ content: "Les robots ne peuvent pas créer de moniteurs...", ephemeral: true })
        /* Check DB */
        if (MonitorDB.length <= 0) {

            await interaction.reply({
                embeds: [
                    {
                        title: "information moniteurs",
                        description: "Aucun moniteur trouvé!"
                    }
                ]
            })

        } else {
            interaction.reply({ content: `**Information pour ${user.username} !**` })
            await client.base_up(interaction, user, null, null, null, "info");

        }
    },
};
