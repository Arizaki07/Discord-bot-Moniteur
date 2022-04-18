const { MessageButton, MessageEmbed } = require("discord.js");
const validUrl = require("valid-url");
module.exports = {

    name: "create-monitor",
    description: "💻 Mettez en place votre moniteur",
    category: "Configuration",
    options: [
        {
            name: "url",
            description: "Entrez l'url",
            type: 3,
            required: true
        },
        {
            name: "channel",
            description: "Entrez le salon",
            type: 7,
            channel_types: [0],
            required: true
        },
        {
            name: "auto_edit",
            description: "Modifier le message lors du changement du statut.",
            required: true,
            type: 3,
            choices: [
                {
                    name: "🟢",
                    value: "enable"
                },
                {
                    name: "🔴",
                    value: "disable"
                }
            ]
        }
    ],
    botPerms: ["SEND_MESSAGES"],
    memberPerms: ["SEND_MESSAGES", "ADMINISTRATOR"],
    enabled: true,
    run: async (client, interaction) => {
        /* Get Option */
        let url = interaction.options.getString("url")
        let channel = interaction.options.getChannel("channel")
        let edit = interaction.options.getString("auto_edit")

        /* Check URL */
        if (!validUrl.isUri(url)) return interaction.reply({ content: "Veuillez fournir une URL valide.", ephemeral: true });

        /* Get DB */
        let MonitorDB = await client.data.getMonitor(interaction.user.id, url);

        /* Check DB */
        if (!MonitorDB) {

            await client.base_up(interaction, null, edit, url, channel, "create");

        } else if (MonitorDB.url === url && MonitorDB.posted_by === interaction.user.id && MonitorDB.channel === channel.id) {

            interaction.reply({
                content: `Vous suivez déjà ce lien dans <#${MonitorDB.channel}> !`,
                ephemeral: true
            })

        } else {

            await client.base_up(interaction, null, edit, url, channel, "create");

        }


    },
};
