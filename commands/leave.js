const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave the voice channel you are in.'),
    async execute(interaction) {
        const { channel } = interaction.member.voice;
        if (!channel) {
            return interaction.reply({ content: 'You need to be in a voice channel to use this command.', ephemeral: true });
        }

        try {
            channel.leave();
            await interaction.reply('Left your voice channel!');
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while trying to leave the voice channel.', ephemeral: true });
        }
    },
};
