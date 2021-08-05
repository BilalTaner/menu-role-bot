const Roles = require("./RoleConfig");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

const client = new (require('./DianaClient'))();

client.on("messageCreate", async message => {

    if (message.content === "d!setmenu") {

        const OptionsArray1 = [];
        const OptionsArray2 = [];

        Roles.gender.roles.forEach((x, i) => {
            OptionsArray1.push({ label: message.guild.roles.cache.get(x).name, value: message.guild.roles.cache.get(x).id });
            if (Roles.gender.emojis[i]) OptionsArray1[i].emoji = Roles.gender.emojis[i];
        });

        Roles.game.roles.forEach((x, i) => {
            OptionsArray2.push({ label: message.guild.roles.cache.get(x).name, value: message.guild.roles.cache.get(x).id });
            if (Roles.game.emojis[i]) OptionsArray2[i].emoji = Roles.game.emojis[i];
        });

        const Row1 = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .addOptions(OptionsArray1)
                .setCustomId("row1")
                .setMinValues(1)
                .setMaxValues(2)
                .setPlaceholder("Gender Roles")
        )

        const Row2 = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .addOptions(OptionsArray2)
                .setCustomId("row2")
                .setMinValues(1)
                .setMaxValues(OptionsArray2.length)
                .setPlaceholder("Game Roles")
        )

        const mainMessage = await message.channel.send({
            content: `Hello dear ${message.guild.name} residents, We have created this menu that you can see so that you can easily take a role.`,
            embeds: [{
                description: "If you don't want a role you have chosen from this menu anymore, it will be enough to leave your choice or make different choices if your selection is not visible.",
                color: "RED"
            }],
            components: [Row1, Row2]
        });

        const collector = mainMessage.createMessageComponentCollector({
            componentType: "SELECT_MENU"
        })

        collector.on("collect", async i => {
            await i.member.roles.add(i.values.filter(x => !i.member._roles.includes(x)), 'Select menu roles.');
            await i.reply({ embeds: [{ description: `${i.values.map(x => message.guild.roles.cache.get(x)).join(", ")} role${i.values.length > 1 ? 's' : ''} successfully taken!`, color: "GREEN" }], ephemeral: true });
        })
    }

})

client.login(client.config["token"]).then(() => console.log('Bot working.')).catch((e) => console.error(e));;