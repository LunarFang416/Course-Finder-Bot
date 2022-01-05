const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const token = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;

module.exports = {
  name: "ready",
  once: true,
  execute(client, commands) {
    console.log(`${client.user.username} is logged in`);
    client.user.setPresence({
      status: "online",
      activities: {
        name: "to /helpme for more info",
        type: "LISTENING"
      },
    });

    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: "9" }).setToken(token);

    (async () => {
      try {
        if (process.env.ENV === "production") {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          });
          console.log("Commands registered globally!");
        } else {
          await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
          });
          console.log("Commands registered locally!");
        }
      } catch (err) {
        if (err) console.error(err);
      }
    })();
  },
};
