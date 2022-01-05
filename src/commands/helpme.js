const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const embed = new MessageEmbed()
  .setTitle("Bot Guide")
  .setThumbnail(
    "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png"
  )
  .setFooter({
    text: "Created by LunarFang_416#2717",
    icon_url:
      "https://ih1.redbubble.net/image.2261910294.0912/flat,128x128,075,t.jpg",
  })
  .setTimestamp()
  .setDescription(
    "Course Finder Bot provides a quick way to access all important information of courses offered at U of T.\n\n ```/course``` will return all relevent and important course information.\n\n ```/timetable``` will give the list of all meeting schedules for a specific course.\n\n ```/timetable-ss``` will give you a full screenshot of the meeting schedules for a specific course for download or quick viewing for reference.\n\n All commands have the same parameters and a detailed description is provided when executing the command. \n\n On incorrect input, a comprehensive guide for correct course code inputs will be returned."
  );

module.exports = {
  data: new SlashCommandBuilder()
    .setName("helpme")
    .setDescription("Information about Course Finder Bot"),
  async execute(interaction) {
    interaction.editReply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
