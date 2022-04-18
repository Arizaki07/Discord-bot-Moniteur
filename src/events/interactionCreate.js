module.exports = {
    name: "interactionCreate",
    one: false,
    async execute(interaction) {

        /* Check Command */
        if (!interaction.isCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;


        /* Permissions (Member & Bot) */
        let BotArray = [];
        command.botPerms.forEach(permissions => {
            if (!interaction.channel.permissionsFor(interaction.guild.me).has(permissions)) {
                BotArray.push(permissions);
            }
        })

        let MemberArray = [];
        command.memberPerms.forEach(permissions => {
            if (!interaction.channel.permissionsFor(interaction.user.id).has(permissions)) {
                MemberArray.push(permissions);
            }
        })

        if (BotArray.length > 0) return interaction.reply({ content: `Je n'ai pas les autorisations suivantes: \`\`${BotArray}\`\`` });

        if (MemberArray.length > 0) return interaction.reply({ content: `Vous ne disposez pas des autorisations suivantes: \`\`${MemberArray}\`\`` });


        /* Run Command */
        if (!command) {
            return console.log(`Ne peut pas charger ${interaction.commandName}`);
        } else {
            await command.run(interaction.client, interaction)
        }
    }
}