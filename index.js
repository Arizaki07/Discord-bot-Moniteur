/* Module requis */
const color = require("chalk");
const config = require("./config.js");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./src/handler/eventHandler.js");


/* Check Config */
let Intents = []
if (!Array.isArray(config.intents)) {
    console.log(color.bold.red("Une erreur s'est produite lors du chargement des intents (aucun intent n'est spécifiée dans config.js) !"));
    process.exit();
} else {
    Intents = config.intents
}


/* Client */
const client = new Discord.Client({
    intents: Intents
});
client.commands = new Discord.Collection();
client.data = require("./src/database/db.js");
client.logger = require("./src/helpers/logger.js");
client.base_up = require("./src/helpers/monitoring.js");
client.get_status = require("./src/helpers/get_status.js");


/* l'event de l'handlers */
eventHandler(client)


/* Connexion */
mongoose.connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    client.logger("connecté avec succès à MongoBD.", "succès")
}).catch(err => {
    console.log(color.bold.red(`Erreur de connexion avec MongoBD.\Erreur:${err}`));
})

client.login(config.token).catch(err => {
    console.log(color.bold.red(`Une erreur s'est produite lors de la connexion du bot, veuillez vérifier le token.\nErreur:${err}`));
})