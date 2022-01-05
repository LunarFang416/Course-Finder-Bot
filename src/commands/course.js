const { MessageEmbed } = require("discord.js");
const { errorEmbed, createCommand } = require("../util");

const trim = (str, max) =>
  str.length > max ? `${str.slice(0, max - 3)}...` : str;

const createEmbed = (data) => {
  if (data.title === "Error") {
    return errorEmbed;
  }
  // data = { courseId, code, title, division, description, department, prerequisites, exclusions,level,  campus, term, recommendedPreperation, utscBreadth, utmDistribution, asBreadth, asDistribution }
  
  const placeholders = [
    { name: "**Division**", value: "division" },
    { name: "**Course Description**", value: "description" },
    { name: "**Department**", value: "department" },
    { name: "**Pre-requisites**", value: "prerequisites" },
    { name: "**Exclusions**", value: "exclusions" },
    { name: "**Course Level**", value: "level" },
    { name: "**Campus**", value: "campus" },
    { name: "**Term**", value: "term" },
    { name: "**Recommended Preperation**", value: "recommendedPreperation" },
    { name: "**UTSC Breadth**", value: "utscBreadth" },
    { name: "**UTM Distribution**", value: "utmDistribution" },
    { name: "**Art & Science Breadth**", value: "asBreadth" },
    { name: "**Art & Science Distribution**", value: "asDistribution" },
  ];

  let fields = [];

  for (let i = 0; i < placeholders.length; i++){
    if (data[placeholders[i].value]) {
      fields.push({
        name: placeholders[i].name,
        value: trim(data[placeholders[i].value], 1024),
      });
    }
  }

  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`${data.title}`)
    .setURL(data.link)
    .setThumbnail(
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png"
    )
    .setTimestamp()
    .setFooter({
      text: "Created by LunarFang_416#2717",
      icon_url:
        "https://ih1.redbubble.net/image.2261910294.0912/flat,128x128,075,t.jpg",
    })
    .addFields(
      fields.map((element, index) => {
        return { name: element.name, value: element.value };
      })
    );
};

module.exports = {
  data: createCommand("course", "Returns Relevant Course Information"),
  async execute(interaction, data) {
    interaction.editReply({
      embeds: [createEmbed(data)],
      ephemeral: true,
    });
  },
};
