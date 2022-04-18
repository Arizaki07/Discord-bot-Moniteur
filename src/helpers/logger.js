const color = require("chalk");

module.exports = async (content, type) => {
    /* Check if content is empty */
    if (!content) return console.log(color.bold.red("❌ | " + "Aucun contenu de logs n'a été spécifié."));

    switch (type) {
        case "log":
            console.log(color.bold.blue("🔧 | " + content));
            break;
        case "sucess":
            console.log(color.bold.green("✅ | " + content));
            break;
        case "error":
            console.log(color.bold.red("❌ | " + content));
            break;
        case "default":
            console.log(color.bold.red("❌ | " + "Aucun type de logs n'a été spécifié."));
    }
} 