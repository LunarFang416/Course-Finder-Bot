const { Intents, Collection } = require("discord.js");
const DiscordJS = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const token = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const commandFiles = fs
  .readdirSync("src/commands")
  .filter((file) => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const eventFiles = fs
  .readdirSync("src/events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, async (...args) =>
      event.execute(...args, commands)
    );
    client.user.setPresence({
      status: "online",
      activity: {
        name: "Use /helpme for more info",
      },
    });
  } else {
    client.on(event.name, async (...args) => event.execute(...args, commands));
  }
}

client.login(token);
