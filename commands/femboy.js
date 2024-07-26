const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('femboy')
        .setDescription('Send a random image of an anime femboy.'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://some-random-api.ml/img/femboy');
            const imageUrl = response.data.link;
            await interaction.reply({ files: [imageUrl] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while fetching the image.', ephemeral: true });
        }
    },
};
