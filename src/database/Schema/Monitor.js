const mongoose = require("mongoose");
const moment = require("moment");

module.exports = mongoose.model("Monitor", new mongoose.Schema({

    posted_by: { type: String },
    channel: { type: String },
    url: { type: String },
    createAt: { type: String, default: moment(new Date()).format("DD/MM/YY") },
    last_status: { type: Boolean, default: null },
    edit_mode: { type: Boolean, default: false },
    edit_message: { type: String, default: null }

},
    {
        versionKey: "count"
    })
); 