const { SlashCommandBuilder } = require('@discordjs/builders');
const { authorizedUsers } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tts')
        .setDescription('Send a text-to-speech message.')
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The message to send')
                .setRequired(true)),
    async execute(interaction) {
        if (!authorizedUsers.includes(interaction.user.id)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const { channel } = interaction.member.voice;
        if (!channel) {
            return interaction.reply({ content: 'You need to be in a voice channel to use this command.', ephemeral: true });
        }

        const message = interaction.options.getString('message');
        channel.sendTTS(message);
        await interaction.reply({ content: 'TTS message sent!', ephemeral: true });
    },
};
