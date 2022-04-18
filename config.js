const { Intents } = require("discord.js");

const settings = {
    token: "", /* Token de votre bot https://discord.com/developers/applications */
    mongo: "", /* L'url mongo https://www.mongodb.com/ */
    specific_guild: "", /* Dans ce serveur les commandes slash sont instantanément chargées (guild id) */
    color:"", /* couleur de l'embed https://htmlcolorcodes.com/fr/ */
    intents: [
        Intents.FLAGS.GUILDS
    ] /* Les intents que vous souhaitez */
}

module.exports = settings;
