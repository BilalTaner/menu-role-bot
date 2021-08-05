const { Client } = require("discord.js");
const config = require("./config");
class Diana extends Client {

    /** @type {config} */
    config;

    constructor() {
        super({
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_MESSAGES'],
            ws: { properties: { $browser: "Discord iOS" } },
            presence: {
                activities: [{
                    name: 'Giving Roles!',
                    type: 'COMPETING',
                    url: 'https://top.gg/bot/736935878739492875'
                }]
            },
            messageCacheMaxSize: 20,
            messageEditHistoryMaxSize: 5,
            fetchAllMembers: false,
            allowedMentions: { parse: [], repliedUser: false },
            restTimeOffset: 60,
        });
        this.config = config;
    }

}

module.exports = Diana;