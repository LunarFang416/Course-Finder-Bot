const { MessageEmbed } = require("discord.js");
const {errorEmbed, createCommand} = require("../util")

const trim = (str, max) =>
  str.length > max ? `${str.slice(0, max - 3)}...` : str;

const createEmbed = ({ timetable, data }) => {
  if (data.title === "Error") {
    return errorEmbed;
  }
  let text = "Meeting Sections \n";
  timetable.map((element, index) => {
    text += `${index + 1}. **Code** : __*${
      element.code ? element.code : "N/A"
    }*__ **Time** : ${element.time ? element.time : "N/A"}  **Instructor** : ${
      element.instructor ? element.instructor : "N/A"
    }  **Location** : ${
      element.location ? element.location : "N/A"
    }  **Delivery Mode** : ${
      element.deliveryMode ? element.deliveryMode : element.deliveryMode
    } \n\n`;
  });


  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`${data.title}`)
    .setURL(data?.link)
    .setTimestamp()
    .setFooter({
      text: "Created by LunarFang_416#2717",
      icon_url:
        "https://ih1.redbubble.net/image.2261910294.0912/flat,128x128,075,t.jpg",
    })
    .setDescription(trim(text ? text : "Not Available", 4096))
    .addField(
      "For More Information regarding Meeting Schedules, Vist ::",
      data?.link
    );
};

module.exports = {
  data: createCommand("timetable", "Returns Meeting Schedule of Course"),
  async execute(interaction, data) {
    interaction.editReply({
      embeds: [createEmbed(data)],
      ephemeral: true,
    });
  },
};
