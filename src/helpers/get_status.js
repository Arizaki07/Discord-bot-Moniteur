const Database = require("../database/Schema/Monitor.js");
const https = require('https');

module.exports = async (client) => {
    /* Get all DB */
    Database.find({}, function (err, Data) {
        /* Check Error */
        if (err) return;

        Data.forEach(element => {
            /* Get status */
            https.get(element.url, function (res) {

                if (element.last_status == true) return;
                if (element.channel === null) return;

                /* Get if edit mode is enable */
                if (element.edit_mode == true && element.edit_message !== null) {

                    client.channels.cache.get(element.channel).messages.fetch(element.edit_message).then(msg => {
                        msg.edit({
                            embeds: [
                                {
                                    fields: [
                                        { name: "URL", value: element.url, inline: false },
                                        { name: "Status", value: "🟢", inline: false }
                                    ],
                                    color: "GREEN"
                                }
                            ]
                        });
                    })

                } else {

                    client.channels.cache.get(element.channel).send({
                        embeds: [
                            {
                                fields: [
                                    { name: "URL", value: element.url, inline: false },
                                    { name: "Status", value: "🟢", inline: false }
                                ],
                                color: "GREEN"
                            }
                        ]
                    }).then(e => {
                        if (element.edit_mode == true) {
                            element.edit_message = e.id
                        }

                        /* Set Status */
                        element.last_status = true
                        element.save();
                    })
                }

            }).on('error', function (e) {

                if (element.last_status == false) return;

                /* Get if edit mode is enable */
                if (element.edit_mode == true && element.edit_message !== null) {
                    client.channels.cache.get(element.channel).messages.fetch(element.edit_message).edit({
                        embeds: [
                            {
                                fields: [
                                    { name: "URL", value: element.url, inline: false },
                                    { name: "Status", value: "🔴", inline: false }
                                ],
                                color: "RED"
                            }
                        ]
                    });

                    /* Set Status */
                    element.last_status = false
                    element.save();

                } else {

                    client.channels.cache.get(element.channel).send({
                        embeds: [
                            {
                                fields: [
                                    { name: "URL", value: element.url, inline: false },
                                    { name: "Status", value: "🔴", inline: false }
                                ],
                                color: "RED"
                            }
                        ]
                    }).then(e => {
                        if (element.edit_mode == true) {
                            element.edit_message = e.id
                        }

                        /* Set Status */
                        element.last_status = false
                        element.save();
                    })

                }
            });
        })
    })

}