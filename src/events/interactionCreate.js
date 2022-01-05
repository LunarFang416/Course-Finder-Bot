const {
  fetchCourseInfo,
  fetchMeetingSection,
  fetchMeetingSectionSS,
} = require("../util");
const {getFullCode} = require("../util")

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await interaction.deferReply({
        ephemeral: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 0000));

      if (command.data.name === "course") {
        let fullCode = getFullCode(interaction)
        const {data} = await fetchCourseInfo(fullCode);
        await command.execute(interaction, data);
      } else if (command.data.name === "timetable") {
        let fullCode = getFullCode(interaction);
        const { data } = await fetchMeetingSection(fullCode);
        await command.execute(interaction, data);
      } else if (command.data.name === "timetable-ss") {
        let fullCode = getFullCode(interaction);
        const { data } = await fetchMeetingSectionSS(fullCode);
        await command.execute(interaction, data);
      } else {
        command.execute(interaction)
      }

    } catch (err) {
      if (err) console.error(err);
      await interaction.reply({
        content:
          "An error Occured while executing that command. Make sure information was inputted correctly.",
        ephemeral: true,
        // Means that only you can see this message
      });
    }
  },
};
