const login = require("facebook-chat-api");
const Scry = require("scryfall-sdk");

login({"email": process.env.CG_USERNAME, "password": process.env.CG_PASSWORD}, (err, api) => {
    if(err) return console.error(err);

    api.listen((err, message) => {
        if (message.body.match("!card")) {

            Scry.Cards.byName(message.body.slice(6)).then(
                result => api.sendMessage(result.name + " | " + result.mana_cost + "\n" +
                result.type_line + '\n' +
                result.oracle_text +
                (result.power ? '\n' + result.power + ' / ' + result.toughness: ""), message.threadID))
        }

        else if (message.body.match("!price")) {
            Scry.Cards.byName(message.body.slice(7)).then(
                result => api.sendMessage(result.name + " | " + result.usd, message.threadID)
            )
        }

        else if (message.body.match("[Bb]ees\\?")) {
            api.sendMessage("bees?", message.threadID)

        }
    });
});