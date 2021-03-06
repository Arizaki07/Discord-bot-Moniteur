const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
module.exports = async (interaction, user, edit, url, channel, type) => {
    let edit_option = false;
    switch (edit) {
        case "enable":
            edit = "π’"
            edit_option = true
            break;
        case "disable":
            edit = "π΄"
            break;
    }
    switch (type) {

        case "create":
            /* Send reply */
            await interaction.client.data.createMonitor(interaction.user.id, url).then(async (DB) => {
                interaction.reply({
                    embeds: [
                        {
                            title: "Monitor crΓ©Γ©",
                            fields: [
                                { name: "[π] URL", value: url },
                                { name: "[π] Demander par", value: interaction.user.username },
                                { name: "[π] Channel", value: channel.name },
                                { name: "[π§] Mode Γ©dition", value: edit }
                            ],
                            color: config.color
                        }
                    ],
                    ephemeral: true
                });

                /* Push to DB and save */
                DB.channel = channel.id
                DB.url = url
                DB.edit_mode = edit_option
                await DB.save();
            })
            break;
        case "delete":
            /* Send Reply */
            await interaction.client.data.deleteMonitor(interaction.user.id, url).then(async (DB) => {
                interaction.reply({
                    embeds: [
                        {
                            title: "Moniteur supprimer",
                            fields: [
                                { name: "[π] URL", value: url },
                                { name: "[π] demander par", value: interaction.user.username }
                            ],
                            color: config.color
                        }
                    ],
                    ephemeral: true
                })
            });
            break;
        case "info":
            /* Send Reply */
            await interaction.client.data.getAllMonitor(user.id).then(async (DB) => {
                DB.forEach(element => {
                    let embed = new MessageEmbed()
                    embed.setColor(config.color)
                    embed.addFields([
                        { name: "URL", value: element.url },
                        { name: "Poster par", value: interaction.client.users.cache.get(element.posted_by).username },
                        { name: "Ajouter Γ ", value: element.createAt },
                        { name: "Channel", value: `<#${element.channel}>` }
                    ])
                    interaction.channel.send({ embeds: [embed] })
                })
            });
            break;
        case "default":
            interaction.client.logger(`Une erreur s'est produite, veuillez vΓ©rifier si les donnΓ©es d'un base_up sont correctes!`, "erreur")
    }

}