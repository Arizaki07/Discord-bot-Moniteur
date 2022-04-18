const fs = require("fs");

module.exports = async (client) => {

    const eventFiles = fs.readdirSync(`./src/events`).filter(file => file.endsWith('.js'));
    let events_count = 0;

    for (const file of eventFiles) {
        events_count++
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
    client.logger(`${events_count} événements ont été facturés !`, "succès");
    
} 