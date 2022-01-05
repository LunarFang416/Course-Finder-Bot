const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { errorEmbed, createCommand } = require("../util");

const createAttachment = (data) => {
  console.log(data)
  let file = data.image;
  const sfbuff = new Buffer.from(file, "base64");
  const sfattach = new Discord.MessageAttachment(sfbuff, "output.png");
  return sfattach;
};

const createEmbed = (data) => {
  if (data.title === "Error") {
    return errorEmbed;
  } else {
    return new MessageEmbed()
      .setTitle(`Meeting Schedule for ${data.title}`)
      .setURL(data.link)
      .setColor("#00FF00");
  }
};

module.exports = {
  data: createCommand("timetable-ss", "Returns Meeting Schedule of Course"),
  async execute(interaction, data) {
    interaction.editReply({
      ephemeral: true,
      files: [createAttachment(data)],
      embeds: [createEmbed(data)],
    });
  },
};
