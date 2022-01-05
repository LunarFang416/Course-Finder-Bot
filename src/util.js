const axios = require("axios");
require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const API = axios.create({
  baseURL: process.env.baseURL,
});

const fetchCourseInfo = async (courseId) => await API.get(`/${courseId}`);

const fetchMeetingSection = async (courseId) =>
  await API.get(`/${courseId}/meetingSections`);

const fetchMeetingSectionSS = async (courseId) =>
  await API.get(`/${courseId}/meetingSectionsSS`);


const getFullCode = (interaction) => {
  let code = interaction.options.getString("course-code");
  let credit = interaction.options.getString("credit");
  let campus = interaction.options.getString("campus");
  let section = interaction.options.getString("section-code");
  let fullCode = (code + credit + campus + section).toUpperCase();
  sect = section.toUpperCase();

  if (sect === "F" || sect === "Y") fullCode += "20219";
  if (sect === "S") fullCode += "20221";
  return fullCode;
}


const createCommand = (commandName, description) => {
  return new SlashCommandBuilder()
    .setName(commandName)
    .setDescription(description)
    .addStringOption((option) =>
      option
        .setName("course-code")
        .setDescription(
          "3 letters denoting the department or college sponsoring the course + 3 numbers denoting the level"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("credit")
        .setDescription(
          "Letter indicating the credit or full-course equivalent (FCE) value (H = 0.5 credit, Y = 1.0 credit)"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("campus")
        .setDescription(
          "1 number indicating the campus (1 = UTSG, 3 = UTSC, 5 = UTM)"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("section-code")
        .setDescription(
          "(F = September to December, S = January to April. and Y = September to April)"
        )
        .setRequired(true)
    );
};

const errorEmbed = new MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Incorrect Course Code")
  .setURL("https://politics.utoronto.ca/undergraduate/courses/codes/")
  .setDescription(
    "**Make sure Course Code is entered according to the requirements below ::** \n\n - 3 letters denoting the department or college sponsoring the course\n - 3 numbers denoting the level\n - 1 letter indicating the credit or full-course equivalent (FCE) value (H = 0.5 credit, Y = 1.0 credit) \n - 1 number indicating the campus (1 = UTSG, 3 = UTSC, 5 = UTM)\n\n F = fall session or first subsession of the summer session \n S = winter session or second subsession of the summer session \n Y = fall and winter sessions or first and second subsessions of the summer session"
  )
  .setTimestamp()
  .setFooter({
    text: "Created by LunarFang_416#2717",
    icon_url:
      "https://ih1.redbubble.net/image.2261910294.0912/flat,128x128,075,t.jpg",
  })
  .setThumbnail(
    "https://www.freeiconspng.com/thumbs/error-icon/error-icon-32.png"
  );

module.exports = {
  fetchMeetingSection,
  fetchCourseInfo,
  fetchMeetingSectionSS,
  errorEmbed,
  createCommand,
  getFullCode,
};
