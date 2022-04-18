const Monitor = require("./Schema/Monitor.js");

module.exports.getMonitor = async function (user, url) {
    let DB = await Monitor.findOne({ posted_by: user, url: url });
    return DB;
}
module.exports.createMonitor = async function (user, url) {
    let DB = await Monitor.create({ posted_by: user, url: url });
    return DB;
}
module.exports.deleteMonitor = async function (user, url) {
    let DB = await Monitor.deleteOne({ posted_by: user, url: url });
    return DB;
}
module.exports.getAllMonitor = async function (user) {
    let DB = await Monitor.find({ posted_by: user });
    return DB;
}