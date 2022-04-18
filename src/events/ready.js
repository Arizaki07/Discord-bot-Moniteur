const slash = require("../handler/slashCommand.js");
const config = require("../../config.js");
const fs = require("fs");
const ping = require("node-fetch");

module.exports = {
    name: "ready",
    one: true,
    async execute(client) {

        client.logger(`${client.user.username} a bien commencé.`, "succès")

        /* Get status of website */
        setInterval(async () => {
            await client.get_status(client)
        }, 30000)

        /* Load slash commands */
        try {
            const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));

            let cArr = [];

            commandFiles.forEach((file) => {
                const command = require(`../commands/${file}`);
                client.commands.set(command.name, command);
                cArr.push(command);
            });
            const Array = cArr.map((cmd) => cmd);
            slash(config, client.user.id, Array);

        } catch (err) {
            client.logger(err, "error");
        }

    }
}